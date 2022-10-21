/* eslint-disable semi */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

import mongoClient from '../bin/db_config.js';
import decodedToken from '../auth/decodeToken.js';

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params
    const sellerId = await decodedToken(req);

    const client = await mongoClient.connect();
    const orderCollection = client.db('e_platform').collection('orders');
    const orders = await orderCollection.find({ seller_id: sellerId }).toArray();
    const order = orders.find((item) => item.order_id === id);

    if (typeof order === 'undefined') {
      return res.status(403).json({ message: 'Forbidden operation' });
    }
    const deletedOrder = await orderCollection
      .findOneAndDelete({ order_id: order.order_id });

    return res.status(200).json({ message: 'deleted successfully' });
  } catch (error) {
    console.log(`E-deleteController-${error.message}`);
    return res.status(500).json('Internal Server Error');
  } finally {
    mongoClient.close();
  }
};

export default deleteOrder;
