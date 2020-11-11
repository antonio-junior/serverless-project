import { SQS } from 'aws-sdk';

const sqsClient = new SQS();

export default {
    async send (data, queueName) {
        const { QueueUrl } = await sqsClient.getQueueUrl({ QueueName: queueName }).promise();
        
        if (!QueueUrl) throw new Error(`Queue Not Found: ${queueName}`);

        const params = {
            DelaySeconds: 30,
            MessageBody: data,
            QueueUrl
        };
         
        const {MessageId} = await sqsClient.sendMessage(params).promise();

        if (!MessageId) throw new Error('Error sending message to SQS');

        return MessageId;
    }
}