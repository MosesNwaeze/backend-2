/* eslint-disable semi */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import express, { json, urlencoded } from "express";
import request from "supertest";
import updateAccout from "../controllers/updateAccout.js";
import { expect } from "@jest/globals";

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use("/localhost:5000/account", updateAccout);
app.set("port", 5000);

it(`should return a status code of 200 and message: 'deleted successfully'`, async () => {
  const res = await request(app)
    .put("/localhost:3000/account")
    .type("application/json")
    .set(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjFhM2RmNDkxZDFjNGYxNTg5ZmMyYjkzNGFkYTY4YmYyIiwiaWF0IjoxNjY2MzAxMDA1LCJleHAiOjE2Njc1MTA2MDV9._fiLGAWiXuAip8Jkd4eFUtxG9LIOHSV53NioTqKBRLY"
    )
    .send({ city: "Test", state: "Test too" });
  expect(res.statusCode).toBe(201);
  expect(res.type).toBe("application/json");
  expect(res.body).not.toBeNull();
});
