import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import authService from '../services/auth.service'

const register = async (req: Request, res: Response) => {
  try {
    const { name, surname, username, password } = req.body
    const user = await authService.register({
      name,
      surname,
      username,
      password,
    })
    if (!user) throw 'User not created'
    const { password: pass, ...rest } = user

    const token = jwt.sign(rest, 'SECRET', {
      expiresIn: '5m',
    })

    res.send({
      message: 'User created',
      user: rest,
      token,
    })
  } catch (e) {
    if (e instanceof Error) {
      res.status(401).send({
        message: e.message,
      })
    }
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { password, username } = req.body

    const user = await authService.login(username, password)

    const { password: pass, ...rest } = user

    const token = jwt.sign(rest, 'SECRET', {
      expiresIn: '1h',
    })

    res.send({
      message: 'Login successful',
      user: rest,
      token,
    })
  } catch (e) {
    if (e instanceof Error) {
      res.status(401).send({ message: e.message })
    }
  }
}

export default {
  register,
  login,
}
