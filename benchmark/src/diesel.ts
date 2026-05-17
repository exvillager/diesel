import { type Context } from "../../lib/ctx";
import Diesel from "../../lib/main";

export const app = new Diesel();

// Listen for a custom event
app.on("user:created", (userId: string) => {
  console.log("User created:", userId);
});

// Emit it from inside a route handler
app.get("/user", (ctx: Context) => {
  // ... create user logic
  app.emit("user:created", "123");
  return ctx.json({ message: "created" });
});

app.get("/", (c: Context) => {
  return c.json({ message: "Hi there!", framework: "diesel" });
});

for (let i = 1; i <= 1000; i++) {
  app.get(`/route/${i}`, (c: Context) => {
    return c.json({ route: i });
  });
}

app.get("/user/:id/post/:postId", (c: Context) => {
  return c.json({ userId: c.params.id, postId: c.params.postId });
});

app.listen(3000);
