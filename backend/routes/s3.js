const express = require('express');
const { createPresignedPost } = require('../utils/s3.js');

const s3Router = express.Router();

s3Router.post('/signed_url', async (req, res) => {
    try {
        let { key, content_type } = req.body;
        const { signedUrl, fileLink } = await createPresignedPost({
            key: 'public/' + key,
            contentType: content_type
        });

        return res.send({
            data: {
                signedUrl,
                fileLink
            }
        });
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            error: 'Internal Server Error'
        });
    }
});

module.exports = s3Router;