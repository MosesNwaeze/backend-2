/* eslint-disable semi */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import mongoClient from '../bin/db_config.js';
import decodedToken from '../auth/decodeToken.js';

const fetchOrders = async (req, res) => {
  try {
    const { pages, limit, sorting } = await req.query;
    const collectionSort =
      typeof sorting === 'undefined' ? 'shipping_limit_date' : sorting;
    const collectionLimit = Number(limit) > 20 ? Number(limit) : 20;
    const sellerId = await decodedToken(req);
    const page = typeof pages === 'undefined' ? 1 : Number(pages);

    const client = await mongoClient.connect();
    const ordersCollection = client.db('e_platform').collection('orders');
    const count = await ordersCollection.countDocuments({
      seller_id: sellerId
    });
    const orders = await ordersCollection
      .find({ seller_id: sellerId })
      .sort({ [collectionSort]: 1 })
      .skip(page > 0 ? (page - 1) * collectionLimit : 0)
      .limit(collectionLimit)
      .toArray();

    const orderResult = await Promise.all(
      orders.map(async (order) => {
        const productCollection = client
          .db('e_platform')
          .collection('products');
        const product = await productCollection.findOne({
          product_id: order.product_id
        });
        return {
          data: [
            {
              id: order.order_id,
              product_id: order.product_id,
              product_category: product.product_category_name,
              price: order.price,
              date: order.shipping_limit_date
            }
          ],
          total: count,
          limit: collectionLimit,
          offset: page * collectionLimit
        };
      })
    );

    if (orderResult.length > 0) {
      return res.status(200).json(orderResult);
    } else {
      return res.status(304).json({ message: 'No records' });
    }
  } catch (error) {
    console.log(`E-fetchOrdersController-${error.message}`);
    return res.status(500).json({ message: 'Server Error' });
  } finally {
    // await mongoClient.close();
  }
};
export default fetchOrders;
