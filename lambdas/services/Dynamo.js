import { DynamoDB } from 'aws-sdk';

const ddb = new DynamoDB.DocumentClient();

export default {
    async get (ID, TableName) {
        const params = { 
            TableName,
            Key: { ID }
        }

        const { Item: item } = await ddb.get(params).promise();

        if (!item) throw new Error('Error fetching data');

        console.log(item);

        return item;
    },

    async set (data, TableName) {
        const params = { 
            TableName,
            Item: data
        }
        
        const res = await ddb.put(params).promise();

        console.log('dynamo response', res);

        if (!res) throw new Error('Error adding data');

        return data;
    }
}