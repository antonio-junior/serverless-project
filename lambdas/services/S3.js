import { S3 } from 'aws-sdk';

const s3Client = new S3();

export default {
    async read(fileName, bucket) {
        const params = {
            Bucket: bucket,
            Key: fileName
        };

        const file = await s3Client.getObject(params).promise();

        if (!file) throw new Error('Error retrieving object from S3');

        return file;
    },

    async write (data, fileName, bucket) {
        const params = { 
            Bucket: bucket,
            Body: JSON.stringify(data),
            Key: fileName
        }

        const newData = await s3Client.putObject(params).promise();

        if (!newData) throw new Error('Error adding data to S3');

        const fileAdded = `https://${bucket}.s3.${process.env.region}.amazonaws.com/${fileName}`

        return fileAdded;
    }
}