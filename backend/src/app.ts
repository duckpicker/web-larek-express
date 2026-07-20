import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { errors } from 'celebrate';
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
import Logger from '../utils/logger';
import { requestLogger, errorLogger } from './middlewares/logger';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import errorHandler from './middlewares/error';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_ADDRESS = process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek';

const logger = new Logger(app.name);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

mongoose.connect(DB_ADDRESS)
  .then(() => logger.log('database connected successfully'))
  .catch((err) => logger.log(`database connection error: ${err}`));

app.listen(PORT, () => {
  logger.log(`server is running on port ${PORT}`);
});
