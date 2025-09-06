import { db } from "../../db/index.ts";
import { coursesTable } from "../../db/schema.ts";

export async function makeCourse(title?: string, description?: string) {
  const result = await db
    .insert(coursesTable)
    .values({
      title: title ?? `Curso Teste ${Date.now()}`,
      description:
        description ??
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non orci nibh. Fusce quis posuere turpis, nec imperdiet nunc. Aenean non ex sem. Ut aliquam elementum dui, consectetur euismod diam.",
    })
    .returning();

  return result[0];
}
