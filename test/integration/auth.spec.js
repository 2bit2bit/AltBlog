const request = require("supertest");
const app = require("../../index");

const { connect } = require("../database");
const UserModel = require("../../models/user");

describe("Auth: Signup", () => {
  let conn;

  beforeAll(async () => {
    conn = await connect();
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it("should signup a user", async () => {
    const response = await request(app)
      .post("/sign-up")
      .set("content-type", "application/json")
      .send({
        email: "doe@example.com",
        first_name: "jon",
        last_name: "doe",
        password: "Password1",
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("email", "doe@example.com");
    expect(response.body.user).toHaveProperty("first_name", "jon");
    expect(response.body.user).toHaveProperty("last_name", "doe");
  });

  it("should login a user", async () => {
    // create user in out db
    const user = await UserModel.create({
        email: "doe@example.com",
        first_name: "jon",
        last_name: "doe",
        password: "Password1",
      });

    // login user
    const response = await request(app)
      .post("/login")
      .set("content-type", "application/json")
      .send({
        email: "doe@example.com",
        password: "Password1",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
