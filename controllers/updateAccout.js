/* eslint-disable semi */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

import mongoClient from "../bin/db_config.js";
import decodedToken from "../auth/decodeToken.js";

const updateAccount = async (req, res) => {
  try {
    const { city, state } = req.body;
    const sellerId = await decodedToken(req);

    const client = await mongoClient.connect();
    const sellersCollection = client.db("e_platform").collection("sellers");
    const _oldSeller = await sellersCollection.findOneAndUpdate(
      { seller_id: sellerId },
      { $set: { seller_city: city, seller_state: state } }
    );
    const seller = await sellersCollection.findOne({ seller_id: sellerId });

    if (seller) {
      return res.status(201).json({
        id: seller._id,
        seller_id: seller.seller_id,
        seller_city: seller.seller_city,
        seller_state: seller.seller_state,
      });
    } else {
      const oldSeller = _oldSeller.value;
      return res.status(200).json({
        id: oldSeller._id,
        seller_id: oldSeller.seller_id,
        seller_city: oldSeller.seller_city,
        seller_state: oldSeller.seller_state,
      });
    }
  } catch (error) {
    console.log(`E-updateAccountController-${error.message}`);
  } finally {
    mongoClient.close();
  }
};

export default updateAccount;
