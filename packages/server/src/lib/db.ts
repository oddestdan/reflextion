import * as mongoose from 'mongoose';
import logger from '../middleware/logger';

require('dotenv').config();

const login = process.env.DB_LOGIN;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;
const dbname = process.env.DB_NAME;
const dbURI = `mongodb+srv://${login}:${password}@${cluster}/${dbname}?retryWrites=true&w=majority`;

export default (): void => {
  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => logger.info('MongoDB connected'))
    .catch((err) => logger.error(err));
};
