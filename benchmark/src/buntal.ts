import { Http } from '@buntal/http'
import { cors, logger } from '@buntal/http/middlewares'

// initialize the HTTP server
const app = new Http({
  port: 3002,
})

// define a simple GET endpoint with a type-safe params
app.get('/hello', (req, res) => {
  return res.json({
    hello: "Hello buntal"
  })
})

// start the server!
app.start((server) => {
  console.log(`Server running at http://localhost:${server.port}`)
})
