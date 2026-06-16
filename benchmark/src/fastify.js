import Fastify from 'fastify'

const PORT = parseInt(process.env.PORT || "3000");
const fastify = Fastify({ logger: false })

fastify.get('/', (_req, reply) => reply.send({ message: "Hello Fastify!", framework: "fastify" }))
fastify.get('/user/:id', (req, reply) => reply.send("from id " + req.params.id))
fastify.get('/users/:name', (req, reply) => reply.send("from name " + req.params.name))
fastify.get('/user/:id/post/:postId', (req, reply) =>
  reply.send({ userId: req.params.id, postId: req.params.postId })
)

fastify.listen({ port: PORT }, (err) => {
  if (err) { fastify.log.error(err); process.exit(1) }
  console.log(`fastify running on ${PORT}`)
})
