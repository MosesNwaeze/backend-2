/* eslint-disable semi */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

import mongoClient from "../bin/db_config.js";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";

const login = async (req, res) => {
  dotEnv.config();
  try {
    const { username, password } = req.body;
    const client = await mongoClient.connect();
    const sellersCollection = await client
      .db("e_platform")
      .collection("sellers");
    await sellersCollection.createIndex({ seller_id: 1 });
    const seller = await sellersCollection.findOne({
      seller_id: username,
      seller_zip_code_prefix: password,
    });
    if (seller) {
      const token = await jwt.sign(
        { username: seller.seller_id },
        process.env.JWT_SECRETE,
        { expiresIn: "336h" }
      );

      return res
        .status(200)
        .json({
          message: "success",
          token,
          id: seller._id,
          seller_id: seller.seller_id,
          seller_city: seller.seller_city,
          seller_state: seller.seller_state,
        });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(`E-login-${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await mongoClient.close();
  }
};
export default login;
