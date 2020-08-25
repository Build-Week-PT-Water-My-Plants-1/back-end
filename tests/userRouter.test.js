// const { token } = require("../auth/authRouter.test");
// import token from "./authRouter.test";
const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

const userInfo = { username: "test", password: "test" };
let token;

describe.skip("POST /login user", () => {
  let res = {};
  beforeAll(async () => {
    res = await request(server).post("/api/auth/login").send(userInfo);
  });

  test("should return 200 status", async () => {
    expect(res.status).toBe(200);
  });
});
