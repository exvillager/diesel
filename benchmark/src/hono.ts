import { Hono } from 'hono'

const PORT = parseInt(process.env.PORT || "3000");

const hono_app = new Hono()

hono_app.get('/', (c) => {
  return c.json({ message: "Hello Hono!", framework: "hono" });
});

hono_app.get("/user/:id", (c) => {
  return c.text("from id " + c.req.param("id"))
})

hono_app.get("/users/:name", (c) => {
  return c.text("from name " + c.req.param("name"))
})

hono_app.get('/user/:id/post/:postId', (c) => {
  return c.json({ userId: c.req.param('id'), postId: c.req.param('postId') });
});

console.log(`hono is running on port ${PORT}`)
Bun.serve({
  fetch: hono_app.fetch,
  port: PORT,
})
