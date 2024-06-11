require('dotenv').config();
const AWS = require('aws-sdk');
const path = require('path');
const logger = require('./logger');

AWS.config.apiVersions = { s3: '2012-10-17' };

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
});

const s3 = new AWS.S3();

exports.putObject = async (file) => {
    try {
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `${process.env.FOLDER_NAME}/__${Date.now()}${path.extname(file.originalname)}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        return await s3.upload(params).promise();
    } catch (error) {
        logger.error(error);
        return null;
    }
};
