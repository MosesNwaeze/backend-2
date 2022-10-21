/* eslint-disable semi */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

import decodedToken from './decodeToken.js';
import mongoClient from '../bin/db_config.js';

const auth = async (req, res, next) => {
  try {
    const username = await decodedToken(req);
    if (username) {
      try {
        const client = await mongoClient.connect();
        const sellersCollection = await client.db('e_platform').collection('sellers');
        await sellersCollection.createIndex({ seller_id: 1 });
        const seller = await sellersCollection.findOne({ seller_id: username });
        if (seller) {
          return next();
        }
      } catch (error) {
        console.log(`E-auth-${error.message}`);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.log(`E-auth-${error.message}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default auth;
