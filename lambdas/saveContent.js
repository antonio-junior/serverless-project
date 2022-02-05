import Dynamo from './services/Dynamo';
import util from 'util';
import Joi from 'joi';

const validator = async data => {
    const schema = Joi.object({
        ID: Joi.string(),
        name: Joi.string().max(10).min(4).required(),
        score: Joi.number().integer().min(0).required(),
        email: Joi.string().email().required()
    });

    return schema.validateAsync(data);
}

exports.handler = async event => {
    // Read options from the event parameter.
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));

    const { queueName, tableName } = process.env;

    const [{ body }] = event.Records;

    try {
        const data = JSON.parse(body);
        await validator(data);
        await Dynamo.set(data, tableName);    
    } catch (error) {
        console.log(error);
        return;
    }

    console.log (`Data read from ${queueName} and added to Dynamo table ${tableName}.`);

};