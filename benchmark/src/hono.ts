import { Hono } from 'hono'

const hono_app = new Hono()

hono_app.get('/', (c) => {
  return c.json({ message: "Hello Hono!", framework: "hono" });
});

hono_app.get("/user/:id", (c) => {
  return c.text("from id "+c.req.param("id"))
})

hono_app.get("/users/:name", (c) => {
  return c.text("from name "+c.req.param("name"))
})

for (let i = 1; i <= 1000; i++) {
  hono_app.get(`/route/${i}`, (c) => {
    return c.json({ route: i });
 });
}

hono_app.get('/user/:id/post/:postId', (c) => {
  return c.json({ userId: c.req.param('id'), postId: c.req.param('postId') });
});

console.log('hono is running on port 3001')
Bun.serve({
  fetch: hono_app.fetch,
  port: 3001,
})
