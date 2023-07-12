import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import noteRoutes from './routes/note.routes'
import authMiddleware from './middlewares/auth.middleware'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/auth', authRoutes)
app.use('/note', authMiddleware.verify, noteRoutes)

app.listen(3000, () =>
  console.log('Server running, host: http://localhost:3000')
)
