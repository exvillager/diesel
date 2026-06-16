const PORT = parseInt(process.env.PORT || "3000");

Bun.serve({
  port: PORT,
  routes: {
    "/": () => Response.json({ message: "Hello Bun!", framework: "bun" }),
    "/user/:id": (req) => new Response("from id " + req.params.id),
    "/users/:name": (req) => new Response("from name " + req.params.name),
    "/user/:id/post/:postId": (req) =>
      Response.json({ userId: req.params.id, postId: req.params.postId }),
  },
});

console.log(`bun http running on port ${PORT}`);
