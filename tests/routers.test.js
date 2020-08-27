const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

const userInfo = { username: "test", password: "test", phonenumber: "111-222-1234" };

describe("POST /register user", () => {
  let res = {};
  beforeAll(async () => {
    await db("users").truncate();
    await db("plants").truncate();
    res = await request(server).post("/api/auth/register").send(userInfo);
  });

  test("should return 201 status", async () => {
    expect(res.status).toBe(201);
  });
  test("should return registered user", async () => {
    expect(res.body.username).toBe("test");
    expect(res.body.phonenumber).toBe("111-222-1234");
  });
});

describe("POST /login user", () => {
  let res = {};
  beforeAll(async () => {
    res = await request(server).post("/api/auth/login").send(userInfo);
  });

  test("should return 200 status", async () => {
    expect(res.status).toBe(200);
  });
  test("should have a welcome message", async () => {
    expect(res.body.message).toContain("logged in");
  });
  test("should return a JWT", async () => {
    expect(res.body.jwt).toBeDefined();
  });
  test("should return user info", async () => {
    expect(res.body.user.username).toBe(userInfo.username);
    expect(res.body.user.phonenumber).toBe(userInfo.phonenumber);
  });
});
