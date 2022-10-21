/* eslint-disable semi */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

import jwt from 'jsonwebtoken';

const decodedToken = async (req) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRETE);
  const { username } = decodedToken;
  return username;
};

export default decodedToken;
