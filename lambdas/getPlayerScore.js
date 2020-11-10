import Dynamo from './services/Dynamo';
import Response from "./common/response";

exports.handler = async event => {
    console.log('event', event);

    const tableName = process.env.tableName;
  
      if (!event.pathParameters || !event.pathParameters.ID) {
          return Response._400(JSON.stringify({ message: 'missing ID' }));
      }
  
      const ID = event.pathParameters.ID;

      let player = null;

      try {
        player = await Dynamo.get(ID, tableName);
      } catch {
        if (!player) {
            return Response._400(JSON.stringify({ message: 'Failed to get player' }));
          }
      }

      return Response._200(JSON.stringify({ player }));
  };
  