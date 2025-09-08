import request from "supertest";
import { expect, test } from "vitest";
import { server } from "../app.ts";
import { makeUser } from "../tests/factories/make-user.ts";

test("user can login", async () => {
  await server.ready();

  const { user, passwordBeforeHash } = await makeUser();
  const response = await request(server.server)
    .post("/sessions")
    .set("Content-Type", "application/json")
    .send({
      email: user.email,
      password: passwordBeforeHash,
    });

  expect(response.status).toBe(201);
  expect(response.body).toEqual({
    message: "User logged in",
    token: expect.any(String),
  });
});
