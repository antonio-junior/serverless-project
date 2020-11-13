import Response from "./common/response";

exports.handler = async event => {
  console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        return Response._400(JSON.stringify({ message: 'missing ID' }));
    }

    return Response._200(JSON.stringify({user: { Name: 'John', Score: 20 }}));
};
