import Dynamo from './services/Dynamo';
import Response from './common/response'

exports.handler = async event => {
    console.log('event', event);

    const tableName = process.env.tableName;
  
    if (!event.body) {
        return Response._400(JSON.stringify({ message: 'missing body' }))
    }
    
    try {
        await Dynamo.delete(JSON.parse(event.body), tableName);
    } catch (error) {
        return Response._400(JSON.stringify({ message: 'Failed to delete user', error }));
    }

    return Response._200(JSON.stringify({ message: 'Player deleted successfully.'}));
  };
  