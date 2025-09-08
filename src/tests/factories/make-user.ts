import { faker } from "@faker-js/faker";
import { hash } from "argon2";
import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { db } from "../../db/index.ts";
import { usersTable } from "../../db/schema.ts";

export async function makeUser(role?: "student" | "manager") {
  const passwordBeforeHash = randomUUID();
  const result = await db
    .insert(usersTable)
    .values({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: await hash(passwordBeforeHash),
      role: role,
    })
    .returning();

  return {
    user: result[0],
    passwordBeforeHash,
  };
}

export async function makeAuthenticatedUser(role: "student" | "manager") {
  const { user } = await makeUser(role);
  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET!
  );

  return {
    user,
    token,
  };
}
