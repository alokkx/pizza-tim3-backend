const req = require("supertest");
const server = require("../../server");
const db = require("../../data/dbConfig");

const users = [
  {
    id: 1,
    email: "test@test.com",
    firebase_uid: "258975325235",
    username: "Ralphiu",
    first_name: "Ralph",
    last_name: "Pill"
  },
  {
    id: 2,
    email: "test2@test.com",
    firebase_uid: "258975vnfh325235",
    username: "Trogdor",
    first_name: "reed",
    last_name: "Breet"
  }
];

beforeEach(() => {
  return db("users").truncate();
});

describe("The user Router", () => {
  describe("GET /", () => {
    it("should return an array of users", async () => {
      await db("users").insert(users);
      const res = await req(server).get("/api/users");

      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body.length).toBe(2);
      expect(res.body).toEqual(users);
    });
  });

  describe("GET /:id", () => {
    it("should return a single user with specified id", async () => {
      await db("users").insert(users[0]);
      const res = await req(server).get("/api/users/1");
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual(users[0]);
    });
  });

  describe("POST /", () => {
    it("should return added user", async () => {
      const res = await req(server)
        .post("/api/users")
        .send(users[0]);
      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual(users[0]);
    });
  });
});
