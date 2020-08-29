const request = require("supertest");
const server = require("../api/server");

describe("server.js", () => {
  test("should be in testing mode", async () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("make sure api is up", () => {
  test("should return 200 status ", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });
  test("should return {api:up}", async () => {
    const res = await request(server).get("/");
    expect(res.body).toEqual({ api: "up" });
  });
});
