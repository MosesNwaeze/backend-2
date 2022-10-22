/* eslint-disable semi */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import express from "express";
import request from "supertest";
import deleteOrder from "../controllers/deleteOrder.js";
import { expect } from "@jest/globals";

const app = express();
app.use("/localhost:5000/order_items/:id", deleteOrder);
app.set("port", 5000);

it(`should return a status code of 200 and "message: deleted successfully"`, async () => {
  const res = await request(app)
    .delete("/localhost:3000/order_items/ad9a7a5732e10876e711ca49c3f0c11f")
    .set(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjFhM2RmNDkxZDFjNGYxNTg5ZmMyYjkzNGFkYTY4YmYyIiwiaWF0IjoxNjY2MzAxMDA1LCJleHAiOjE2Njc1MTA2MDV9._fiLGAWiXuAip8Jkd4eFUtxG9LIOHSV53NioTqKBRLY"
    );
  expect(res.statusCode).toBe(200);
  expect(res.type).toBe("application/json");
  expect(res.body).toBe(`{ "message": "deleted successfully" }`);
});
