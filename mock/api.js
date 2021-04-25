import { createServer, Model } from "miragejs";

const jwt = require("jsonwebtoken");
const secret = "dT$djfd23(==";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,
    models: {
      user: Model,
    },
    seeds(server) {
      server.create("user", { username: "user", password: "mipass" });
      server.create("user", { username: "admin", password: "admin" });
      server.create("user", { username: "user2", password: "mipass2" });
    },
    routes() {
      this.urlPrefix = "http://localhost:3000";
      this.namespace = "/api";

      this.post("/auth/login/", (schema, request) => {
        const { username, password } = JSON.parse(request.requestBody);
        const user = schema.users.findBy({ username });
        if (!user) {
          return new Error("Username does not exist");
        }
        if (user.password !== password) {
          return new Error("Invalid password");
        }
        const token = jwt.sign({ user: "hey" }, secret);
        return { status: 200, user, token };
      });
      this.passthrough("https://demo.api-platform.com/**");
    },
  });
}
