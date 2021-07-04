import express = require('express');
import http = require('http');
import runScheduler from './schedule';
import runSocketIO from './socket';

const app = express();
const server = http.createServer(app);
const PORT = 8080;

const basicLogger = (
  request: express.Request,
  response: express.Response,
  next
) => {
  console.log(`${request.method} ${request.path}`);
  next();
};

app.use(basicLogger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes/api/achievement'));
app.use('/api', require('./routes/api/challenge'));
app.use('/api', require('./routes/api/task'));

runSocketIO(server);
runScheduler();

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
