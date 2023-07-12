import { NextFunction, Request, Response } from 'express'
import noteModel from '../models/note.model'

const noteMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const valid = noteModel.noteScheme.validate(req.body, { abortEarly: false })

  if (valid.error) {
    res
      .status(400)
      .send({ message: valid.error.details.map((d) => d.message).join(',') })
    return
  }

  next()
}

export default {
  noteMiddleware,
}
