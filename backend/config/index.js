const { config: loadConfig } = require("dotenv");

loadConfig({
    path: ".env"
});

const config = {
    PORT: parseInt(process.env.PORT, 100) || 3100,
    AWS: {
        ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        BUCKET_NAME: process.env.AWS_BUCKET_NAME,
        REGION: process.env.AWS_REGION,
    }
};

module.exports = config;