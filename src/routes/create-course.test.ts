import request from "supertest";
import { expect, test } from "vitest";
import { server } from "../app.ts";
import { makeAuthenticatedUser } from "../tests/factories/make-user.ts";

test("create course", async () => {
  await server.ready();

  const { token } = await makeAuthenticatedUser("manager");
  const uniqueTitle = `Curso Teste ${Date.now()}`;
  const response = await request(server.server)
    .post("/courses")
    .set("Content-Type", "application/json")
    .set("Authorization", token)
    .send({
      title: uniqueTitle,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non orci nibh. Fusce quis posuere turpis, nec imperdiet nunc. Aenean non ex sem. Ut aliquam elementum dui, consectetur euismod diam.",
    });

  expect(response.status).toBe(201);
  expect(response.body).toEqual({
    id: expect.any(String),
    title: uniqueTitle,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non orci nibh. Fusce quis posuere turpis, nec imperdiet nunc. Aenean non ex sem. Ut aliquam elementum dui, consectetur euismod diam.",
  });
});
