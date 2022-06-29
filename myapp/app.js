import express from 'express'
const app = express()

//app.use(express.static(__dirname + '/recursos'))

import studentRouter from './routes/students.js'
import userRouter from './routes/users.js'

app.use(studentRouter)
app.use(userRouter)

app.get('/', (req, res) => {
  res.send('app iniciado')
})

app.listen(3000, function() {
    console.log("MYAPP : INICIADO");
})