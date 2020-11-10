import { S3 } from 'aws-sdk';

const s3Client = new S3();

export default {
    async write (data, fileName, bucket) {
        const params = { 
            Bucket: bucket,
            Body: JSON.stringify(data),
            Key: fileName,
            GrantRead: true
        }

        const newData = await s3Client.putObject(params).promise();

        if (!newData) throw new Error('Error adding data to S3');

        const fileAdded = `https://${bucket}.s3.${process.env.region}.amazonaws.com/${fileName}`

        return fileAdded;
    }
}