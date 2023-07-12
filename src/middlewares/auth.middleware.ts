import { NextFunction, Request, Response } from 'express'
import authModel from '../models/auth.model'
import jwt from 'jsonwebtoken'

const register = (req: Request, res: Response, next: NextFunction) => {
  const { name, surname, username, password } = req.body
  const valid = authModel.registerScheme.validate(
    {
      name,
      surname,
      username,
      password,
    },
    {
      abortEarly: false,
    }
  )

  if (valid.error) {
    res.status(403).send({
      message: valid.error.details.map((d) => d.message).join(', '),
    })
    return
  }
  next()
}

const login = (req: Request, res: Response, next: NextFunction) => {
  const valid = authModel.loginScheme.validate(req.body)

  if (valid.error) {
    res.status(403).send({
      message: valid.error.details.map((d) => d.message).join(', '),
    })
    return
  }
  next()
}

const verify = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      res.status(401).send('Token not found')
      return
    }

    const isValid = jwt.verify(token, 'SECRET')

    res.locals = {
      user: isValid,
    }

    next()
  } catch (e) {
    if (e instanceof Error) {
      res.status(401).send({ message: e.message })
    }
  }
}

export default {
  register,
  login,
  verify,
}
