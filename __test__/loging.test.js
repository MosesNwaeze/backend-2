/* eslint-disable semi */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import express, { json, urlencoded } from "express";
import request from "supertest";
import updateAccout from "../controllers/login";
import { expect } from "@jest/globals";

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use("/localhost:3000/login", updateAccout);
app.set("port", 5000);

it(`should return a status code of 200 and json data after login in'`, async () => {
  const res = await request(app)
    .post("/localhost:3000/login")
    .type("application/json")
    .send({ username: "3442f8959a84dea7ee197c632cb2df15", password: "13023" });
  expect(res.statusCode).toBe(200);
  expect(res.type).toBe("application/json");
  expect(res.body).not.toBeNull();
});
