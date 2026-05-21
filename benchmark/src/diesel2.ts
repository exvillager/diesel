import { Diesel} from 'diesel-core'
import type {ContextType} from 'diesel-core'


const app = new Diesel({})
app.get("/", (c: ContextType) => {
  return c.json({ message: "Hi there!", framework: "diesel" });
});

// app.get('/path/:name', (ctx) => {
//     return ctx.text(`hello ${ctx.params.name} with query: ${ctx.query.name}`)
// })



app.listen(3000)
