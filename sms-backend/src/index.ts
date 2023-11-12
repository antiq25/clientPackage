import express from 'express'
import bodyParser from 'body-parser'
import authRouter from './routes/auth.route'
import profileRouter from './routes/profile.route'
import recoveryRouter from './routes/recovery.route'
import dashboardRouter from './routes/dashboard.route'
import pixelRouter from './routes/pixel.route'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const prefix = '/api/v1'

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send({ message: 'SMS API' })
})

app.use(`${prefix}/auth`, authRouter)
app.use(`${prefix}/profile`, profileRouter)
app.use(`${prefix}/pixel`, pixelRouter)
app.use(`${prefix}/recovery`, recoveryRouter)
app.use(`${prefix}/dashboard`, dashboardRouter)

app.listen(Number(process.env.PORT!), '0.0.0.0', () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})
