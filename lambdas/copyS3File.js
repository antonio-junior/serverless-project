import S3 from './services/S3';
import util from 'util';

exports.handler = async event => {
    // Read options from the event parameter.
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));

    const bucket = event.Records[0].s3.bucket.name;
    const origiKeyName = event.Records[0].s3.object.key;
    const fileName = origiKeyName.split('/')[1];

    // Download from S3 source bucket. 
    let origiFile = null;
    try {
        origiFile = await S3.read(origiKeyName, bucket);
    } catch (error) {
        console.log(error);
        return;
    }
   
    // Upload a new file
    let putResult = null;
    const destKeyName = `copies/${fileName}`;
    try {
        putResult = await S3.write(origiFile.Body, destKeyName, bucket);
    } catch (error) {
        console.log(error);
        return;
    } 
        
    console.log(`File copied from ${origiKeyName} to ${destKeyName} at bucket ${bucket}`);
};