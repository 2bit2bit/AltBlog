const request = require("supertest");
const app = require("../../index");

const { connect } = require("../database");
const UserModel = require("../../models/user");
const ArticleModel = require("../../models/article");

describe("user Route", () => {
  let conn;
  let token;

  beforeAll(async () => {
    conn = await connect();

    const user = await UserModel.create({
      email: "doe@example.com",
      first_name: "jon",
      last_name: "doe",
      password: "Password1",
    });

    const response = await request(app)
      .post("/login")
      .set("content-type", "application/json")
      .send({
        email: "doe@example.com",
        password: "Password1",
      });

    token = response.body.token;
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it("should create an Article", async () => {
    const response = await request(app)
      .post("/user/create-article")
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Classes of Food",
        description: "Different types of food nutrients",
        tags: "food, health, nutrients",
        body: "ea molestias quasi exercitationem repellat qui ipsa sit autea molestias quasi exercitationem repellat qui ipsa",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("tags");
    expect(response.body).toHaveProperty("body");
    expect(response.body.title).toEqual("Classes of Food");
    expect(response.body.description).toEqual(
      "Different types of food nutrients"
    );
    expect(response.body.tags).toEqual(["food", "health", "nutrients"]);
  });
});
