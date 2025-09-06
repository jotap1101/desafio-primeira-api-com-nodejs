import { expect, test } from "vitest";
import request from "supertest";
import { server } from "../app.ts";

test("create course", async () => {
  await server.ready();

  const uniqueTitle = `Curso de Go ${Date.now()}`;
  const response = await request(server.server)
    .post("/courses")
    .set("Content-Type", "application/json")
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
