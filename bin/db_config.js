/* eslint-disable semi */
/* eslint-disable no-use-before-define */

import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export default mongoClient;
