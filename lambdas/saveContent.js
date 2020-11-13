import Dynamo from './services/Dynamo';
import util from 'util';

exports.handler = async event => {
    // Read options from the event parameter.
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));

    const { queueName, tableName } = process.env;

    const [{ body }] = event.Records;

    try {
        await Dynamo.set(JSON.parse(body), tableName);    
    } catch (error) {
        console.log(error);
        return;
    }

    console.log (`Data read from ${queueName} and added to Dynamo table ${tableName}.`);

};