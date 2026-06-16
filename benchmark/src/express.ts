import express from 'express'

const PORT = parseInt(process.env.PORT || "3000");
const app = express()

app.get('/', (_req, res) => res.json({ message: "Hello Express!", framework: "express" }))
app.get('/user/:id', (req, res) => res.send("from id " + req.params.id))
app.get('/users/:name', (req, res) => res.send("from name " + req.params.name))
app.get('/user/:id/post/:postId', (req, res) =>
  res.json({ userId: req.params.id, postId: req.params.postId })
)

app.listen(PORT, () => console.log(`express running on ${PORT}`))
