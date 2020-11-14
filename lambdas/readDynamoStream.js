import SES from './services/SES';
import util from 'util';

exports.handler = async event => {
    // Read options from the event parameter.
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));

    
    const [{ eventName, dynamodb: { NewImage: { Email: { S: mailTo } } } }] = event.Records;
    const { emailSender } = process.env;
    const subject = 'Register Confirmation';
    const content = 'Thanks for your registration.';

    if (eventName !== 'INSERT' || !mailTo) return; 

    try {
        await SES.send(emailSender, mailTo, subject, content);
    } catch (error) {
        console.log(error);
        return;
    }
    
    console.log(`Email sent successfully to ${mailTo}`);
};