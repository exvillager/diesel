import { Elysia } from "elysia";
import { Hono } from "hono";

const app = new Elysia();

// middleware
app.onBeforeHandle(({ set }) => {
  set.headers["x-powered-by"] = "elysia";
});

const hono = new Hono();

hono.get("/", async (c) => {
  // read incoming headers from Elysia request
  const poweredBy = c.req.header("x-powered-by");

  console.log(poweredBy);

  return c.text("jelll")
});

hono.get("/h", (c) => c.text("/h"))

app
  .mount("/hono", hono.fetch)
  .listen(3002);

console.log("Server running");