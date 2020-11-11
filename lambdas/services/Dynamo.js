import { DynamoDB } from 'aws-sdk';

const documentClient = new DynamoDB.DocumentClient();

export default {
    async get (ID, TableName) {
        const params = { 
            TableName,
            Key: { ID }
        }

        const {Item} = await documentClient.get(params).promise();

        if (!Item) throw new Error('Error fetching data');

        console.log(data);

        return data.Item;
    },

    async set (data, TableName) {
        const params = { 
            TableName,
            Item: data
        }

        const res = await documentClient.put(params).promise();

        if (!res) throw new Error('Error adding data');

        console.log(res);

        return data;
    }
}