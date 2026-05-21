import { type Context } from "../../lib/ctx";
import Diesel from "../../lib/main";

export const app = new Diesel({newPipelineArchitecture:false});

app.get("/", (c: Context) => {
  return c.json({ message: "Hi there!", framework: "diesel" });
});

app.get("/user/:id", (c: Context) => {
  return c.text("from id " + c.params.id);
});

app.get("/users/:name", (c: Context) => {
  return c.text("from name " + c.params.name);
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
