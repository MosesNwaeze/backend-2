/* eslint-disable semi */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import mongoClient from "../bin/db_config.js";
import decodedToken from "../auth/decodeToken.js";

const fetchOrders = async (req, res) => {
  try {
    const { pages, limit, sorting, prev } = await req.query;
    const collectionSort =
      typeof sorting === "undefined" ? "shipping_limit_date" : sorting;
    const isPrev = Number(prev) === 1 ? true : false;
    const collectionLimit = Number(limit) > 20 ? Number(limit) : 5;
    const sellerId = await decodedToken(req);
    const page = typeof pages === "undefined" ? 1 : Number(pages);
    const client = await mongoClient.connect();
    const ordersCollection = client.db("e_platform").collection("orders");
    const count = await ordersCollection.countDocuments({
      seller_id: sellerId,
    });
    const orders = await ordersCollection
      .find({ seller_id: sellerId })
      .skip(page > 0 && !prev ? (page - 1) * collectionLimit : 0)
      .limit(collectionLimit)
      .toArray();
    orders.sort((a, b) => a[collectionSort] - b[collectionSort]);
    const orderResult = await Promise.all(
      orders.map(async (order) => {
        const productCollection = client
          .db("e_platform")
          .collection("products");
        const product = await productCollection.findOne({
          product_id: order.product_id,
        });

        return {
          data: [
            {
              id: order.order_id,
              product_id: order.product_id,
              product_category: product.product_category_name,
              price: order.price,
              date: order.shipping_limit_date,
            },
          ],
          total: count,
          limit: collectionLimit,
          offset: page * collectionLimit,
        };
      })
    );

    return res.status(200).json(orderResult);
  } catch (error) {
    console.log(`E-fetchOrdersController-${error.message}`);
    return res.status(500).json({ message: "Server Error" });
  } finally {
    // await mongoClient.close();
  }
};
export default fetchOrders;
