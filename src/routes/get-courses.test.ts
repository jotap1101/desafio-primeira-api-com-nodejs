import { randomUUID } from "node:crypto";
import request from "supertest";
import { expect, test } from "vitest";
import { server } from "../app.ts";
import { makeCourse } from "../tests/factories/make-course.ts";
import { makeAuthenticatedUser } from "../tests/factories/make-user.ts";

test("get courses", async () => {
  await server.ready();

  const { token } = await makeAuthenticatedUser("manager");
  const title = randomUUID();
  const course = await makeCourse(`Curso Teste ${title}`);
  const response = await request(server.server)
    .get(`/courses?search=Curso Teste ${title}`)
    .set("Authorization", token);

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    total: expect.any(Number),
    courses: [
      {
        id: expect.any(String),
        title: course.title,
        description: course.description,
        enrollments: expect.any(Number),
      },
    ],
  });
});
