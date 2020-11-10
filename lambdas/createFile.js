import S3 from './services/S3';
import Response from './common/Response';

exports.handler = async event => {
    console.log('event', event);

    const bucketName = process.env.bucketName;
  
      if (!event.body || !event.pathParameters.fileName) {
          return Response._400(JSON.stringify({ message: 'missing body or file name' }));
      }
  
      const fileName = event.pathParameters.fileName;

      let fileAdded = null;
      
      try {
        fileAdded = await S3.write(JSON.stringify(event.body), fileName, bucketName);
      } catch {
        if (!fileAdded) {
            return Response._400(JSON.stringify({ message: 'Failed to write file' }));
        }
      }

      return Response._200(JSON.stringify({ fileAdded }));
  };
  