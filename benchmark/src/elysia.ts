import { Elysia } from "elysia";

const PORT = parseInt(process.env.PORT || "3000");

const app = new Elysia();

app.get("/", () => ({ message: "Hello Elysia!", framework: "elysia" }));

app.get("/user/:id", ({ params }) => "from id " + params.id);

app.get("/users/:name", ({ params }) => "from name " + params.name);

app.get("/user/:id/post/:postId", ({ params }) => ({
  userId: params.id,
  postId: params.postId,
}));

app.listen(PORT);
console.log(`elysia running on port ${PORT}`);
