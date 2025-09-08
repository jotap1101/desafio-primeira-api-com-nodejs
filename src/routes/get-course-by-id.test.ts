import { randomUUID } from "node:crypto";
import request from "supertest";
import { expect, test } from "vitest";
import { server } from "../app.ts";
import { makeCourse } from "../tests/factories/make-course.ts";
import { makeAuthenticatedUser } from "../tests/factories/make-user.ts";

test("get course by id", async () => {
  await server.ready();

  const { token } = await makeAuthenticatedUser("student");
  const course = await makeCourse();
  const response = await request(server.server)
    .get(`/courses/${course.id}`)
    .set("Authorization", token);

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: expect.anything(), // string or null
    },
  });
});

test("get course by id - not found", async () => {
  await server.ready();

  const { token } = await makeAuthenticatedUser("student");
  const response = await request(server.server)
    .get(`/courses/${randomUUID()}`)
    .set("Authorization", token);

  expect(response.status).toBe(404);
  expect(response.body).toEqual({
    message: "Course not found",
  });
});
