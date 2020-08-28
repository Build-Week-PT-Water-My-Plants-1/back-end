const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

const userInfo = { username: "test", password: "test", phonenumber: "111-222-1234" };
const updatedUser = {
  username: "updatedUser",
};
const plantInfo = { nickname: "testplant", species: "testspecies", h2ofrequency: "daily" };
const updatedPlant = { nickname: "updated", species: "testspecies", h2ofrequency: "daily" };

let token = "";

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
    token = `Bearer ${res.body.jwt}`;
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

describe("POST /plants/1", () => {
  let res = {};
  beforeAll(async () => {
    res = await request(server).post("/api/plants/1").set("Authorization", token).send(plantInfo);
  });

  test("should return a 201 status", async () => {
    expect(res.status).toBe(201);
  });
  test("should return user plant info", async () => {
    expect(res.body).toMatchObject(plantInfo);
  });
});

describe("GET /plants/1", () => {
  let res = {};
  beforeAll(async () => {
    res = await request(server).get("/api/plants/1").set("Authorization", token);
  });

  test("should return a 200 status", async () => {
    expect(res.status).toBe(200);
  });
  test("should return a json object", async () => {
    expect(res.type).toBe("application/json");
  });
});

describe("PUT /plants/1", () => {
  let res = {};
  beforeAll(async () => {
    res = await request(server).put("/api/plants/1").set("Authorization", token).send(updatedPlant);
  });

  test("should return a 200 status", async () => {
    expect(res.status).toBe(200);
  });
  test("should return user plant info", async () => {
    expect(res.body.updated).toMatchObject(updatedPlant);
  });
});

describe("DELETE /plants/1", () => {
  let res = {};
  beforeAll(async () => {
    res = await request(server).delete("/api/plants/1").set("Authorization", token);
  });

  test("should return a 200 status", async () => {
    expect(res.status).toBe(200);
  });
  test("should return the deleted plant", async () => {
    expect(res.body).toMatchObject(updatedPlant);
  });
});

describe("PUT /user/1", () => {
  let res = {};
  beforeAll(async () => {
    res = await request(server).put("/api/user/1").set("Authorization", token).send(updatedUser);
  });

  test("should return a 200 status", async () => {
    expect(res.status).toBe(200);
  });
  test("should return id of updated user", async () => {
    expect(res.body.updated.id).toBe(1);
  });
  test("should return updated username", async () => {
    expect(res.body).toHaveProperty("updated");
  });
});

describe("DELETE /user/1", () => {
  let res = {};
  beforeAll(async () => {
    res = await request(server).delete("/api/user/1").set("Authorization", token);
  });

  test("should return a 200 status", async () => {
    expect(res.status).toBe(200);
  });
  test("should return the deleted user", async () => {
    expect(res.body).toHaveProperty("deleted");
  });
  test("should not be able to login as deleted user", async () => {
    res = await request(server)
      .post("/api/auth/login")
      .send({ ...userInfo, ...updatedUser });
    expect(res.body).toHaveProperty("error");
  });
});
