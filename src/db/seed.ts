import { fakerPT_BR as faker } from "@faker-js/faker";
import { db } from "./index.ts";
import { coursesTable, enrollmentsTable, usersTable } from "./schema.ts";

async function seed() {
  const usersInsert = await db
    .insert(usersTable)
    .values([
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
    ])
    .returning();

  console.log(usersInsert.map((user) => user.id));

  const coursesInsert = await db
    .insert(coursesTable)
    .values([
      {
        title: "Curso de Node.js",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      {
        title: "Curso de React.js",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      {
        title: "Curso de Angular",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      {
        title: "Curso de Vue.js",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      {
        title: "Curso de Svelte",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
    ])
    .returning();

  console.log(coursesInsert.map((course) => course.id));

  const enrollmentsInsert = await db
    .insert(enrollmentsTable)
    .values([
      {
        userId: usersInsert[0].id,
        courseId: coursesInsert[0].id,
      },
      {
        userId: usersInsert[1].id,
        courseId: coursesInsert[0].id,
      },
      {
        userId: usersInsert[2].id,
        courseId: coursesInsert[1].id,
      },
      {
        userId: usersInsert[3].id,
        courseId: coursesInsert[1].id,
      },
      {
        userId: usersInsert[4].id,
        courseId: coursesInsert[2].id,
      },
      {
        userId: usersInsert[5].id,
        courseId: coursesInsert[2].id,
      },
      {
        userId: usersInsert[6].id,
        courseId: coursesInsert[3].id,
      },
      {
        userId: usersInsert[7].id,
        courseId: coursesInsert[3].id,
      },
      {
        userId: usersInsert[8].id,
        courseId: coursesInsert[4].id,
      },
      {
        userId: usersInsert[9].id,
        courseId: coursesInsert[4].id,
      },
    ])
    .returning();

  console.log(enrollmentsInsert.map((enrollment) => enrollment.id));
}

seed();
