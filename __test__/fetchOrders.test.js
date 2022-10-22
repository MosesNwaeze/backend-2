import express from "express";
import request from "supertest";
import fetchOrder from "../controllers/fetchOrders.js";
import {expect} from "@jest/globals";

const app = express();
app.use("/localhost:5000/order_items/", fetchOrder);
app.set("port", 5000);

it("should return a status code of 200 and a json payload", async () => {
  const res = await request(app)
    .get("/localhost:3000/order_items/")
    .set(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjFhM2RmNDkxZDFjNGYxNTg5ZmMyYjkzNGFkYTY4YmYyIiwiaWF0IjoxNjY2MzAxMDA1LCJleHAiOjE2Njc1MTA2MDV9._fiLGAWiXuAip8Jkd4eFUtxG9LIOHSV53NioTqKBRLY"
    );
  expect(res.statusCode).toBe(200);
  expect(res.type).toBe("application/json");
  expect(res.body).not.toBeNull();
});
