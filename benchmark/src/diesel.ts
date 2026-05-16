import { type Context } from "../../lib/ctx";
import Diesel from "../../lib/main";

export const app = new Diesel();

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
