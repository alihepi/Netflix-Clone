const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const config = require("../config/index.js");

const s3 = new S3Client({
    region: config.AWS.REGION,
    credentials: {
        accessKeyId: config.AWS.ACCESS_KEY_ID,
        secretAccessKey: config.AWS.SECRET_ACCESS_KEY
    }
});

const BUCKET_NAME = config.AWS.BUCKET_NAME;

async function createPresignedPost({ key, contentType }) {

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        ContentType: contentType,
    });

    const fileLink = `https://${BUCKET_NAME}.s3.${config.AWS.REGION}.amazonaws.com/${key}`

    const signedUrl = await getSignedUrl(s3, command, { 
        expiresIn: 5 * 60, // 5 minutes - default is 15 mins
    });
    
    return {fileLink, signedUrl};
}

module.exports = { createPresignedPost };