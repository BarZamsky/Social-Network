const mongoose = require('mongoose');
const config = require('config');
const dbConfig  = config.get('MONGO_URL');
const logger = require('../middleware/logger');

const connectDB = async () => {
    try {
        await mongoose.connect(dbConfig , {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        logger.info('Connected to mongodb')
    } catch (err) {
        logger.error(`failed to connect to db, ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;