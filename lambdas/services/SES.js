import { SES } from 'aws-sdk';

const sesClient = new SES();

export default {
    async send(from, to, subject, content) {
        const params = {
            Source: from,
            Destination: {
                ToAddresses: [to]
            },
            Message: {
                Subject: {
                    Data: subject
                },
                Body: {
                    Text: {
                        Data: content
                    }
                }
            }
        };

        const { MessageId: messageId } = await sesClient.sendEmail(params).promise();

        if (!messageId) throw new Error('Error sendind email');

        return messageId;
    }
}