import { SQS } from 'aws-sdk';

const sqsClient = new SQS();

const getQueueUrl = async queueName => {
    const { QueueUrl: queueUrl } = await sqsClient.getQueueUrl({ QueueName: queueName }).promise();

    if (!queueUrl) throw new Error(`Queue Not Found: ${queueName}`);

    return queueUrl;
}

export default {
    async read (queueName) {
        const queueUrl = await getQueueUrl(queueName);

        const params = {
            MaxNumberOfMessages: 2,
            QueueUrl: queueUrl
        }
        
        const { Messages: messages } = await sqsClient.receiveMessage(params).promise();

        if (!messages) console.log(`No messages available at queue ${queueName}`)

        return messages;
    },

    async delete (queueName, receiptHandle) {
        const queueUrl = await getQueueUrl(queueName);

        const params = {
            QueueUrl: queueUrl,
            ReceiptHandle: receiptHandle
        }
        
        const data = await sqsClient.deleteMessage(params).promise();

        if (!data) throw new Error('Error deleting message from SQS');

        return data;
    },

    async send (data, queueName) {
        const queueUrl = await getQueueUrl(queueName);

        const params = {
            DelaySeconds: 30,
            MessageBody: data,
            QueueUrl: queueUrl
        };
         
        const { MessageId: messageId } = await sqsClient.sendMessage(params).promise();

        if (!messageId) throw new Error('Error sending message to SQS');

        return messageId;
    }
}