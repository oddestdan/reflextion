import express = require('express');
import http = require('http');
import { authenticate } from 'passport';

import expressPino = require('express-pino-logger');
import logger from './middleware/logger';
import authMiddleware from './middleware/auth';
import runScheduler from './schedule';
import runSocketIO from './socket';
import connectDB from './lib/db';

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT;

app.use(expressPino({ logger }));

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

authMiddleware();

app.use('/auth', require('./routes/auth/auth'));
app.use(
  '/api',
  authenticate('jwt', { session: false }),
  require('./routes/api/achievement')
);
app.use(
  '/api',
  authenticate('jwt', { session: false }),
  require('./routes/api/challenge')
);
app.use(
  '/api',
  authenticate('jwt', { session: false }),
  require('./routes/api/task')
);

runSocketIO(server);
runScheduler();

server.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});
