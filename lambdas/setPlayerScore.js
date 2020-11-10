import Dynamo from './services/Dynamo';
import Response from './common/response'

exports.handler = async event => {
    console.log('event', event);

    const tableName = process.env.tableName;
  
      if (!event.body) {
        return Response._400(JSON.stringify({ message: 'missing body' }))
      }

      let userAdded = null;
      
      try {
        userAdded = await Dynamo.set(JSON.parse(event.body), tableName);
      } catch (error) {
        if (!userAdded) {
            return Response._400(JSON.stringify({ message: 'Failed to set user', error }));
          }
      }

      return Response._200(JSON.stringify({ userAdded }));
  };
  