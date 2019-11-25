const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const connectDB = require('./config/db');
const routes = require('./api/v1');
const cors = require('cors');

const app = express();

connectDB();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/v1/uploads', express.static('uploads'));

app.use('/api/v1', routes);

const port = process.env.PORT || 8080;

app.listen(port, () => logger.log('debug',`running on port ${port}...`));