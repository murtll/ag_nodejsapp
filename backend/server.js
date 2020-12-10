import express from 'express'
import dotenv from 'dotenv'

import connectToDB from './config/db.js'
import primesRouter from './routes/primes.js'
import usersRouter from './routes/users.js'

let startTime = new Date()

dotenv.config()
const PORT = process.env.PORT

connectToDB()

const app = express()
app.use(express.json())

app.get('/', (request, response) => {
    response.send('Server is runnig')
})

app.use('/api/primes', primesRouter)
app.use('/api/users', usersRouter)


// starting the server app
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT} in ${(new Date - startTime)}ms`)
})