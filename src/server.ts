import { server } from "./app.ts";

server.listen({ port: 3333 }).then(() => {
  console.log("Server is listening on port 3333");
});
