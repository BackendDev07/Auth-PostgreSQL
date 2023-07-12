import { Request, Response } from 'express'
import noteService from '../services/note.service'

const create = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body
    const user = res.locals.user
    const note = await noteService.create(title, description, user.id)

    res.status(201).send({
      message: 'Note Created',
      note: note,
    })
  } catch (e) {
    if (e instanceof Error) {
      res.status(403).send({
        message: e.message,
      })
    }
  }
}

const getAll = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user
    const notes = await noteService.getAll(user.id)
    res.send({
      message: 'All Notes',
      notes,
    })
  } catch (e) {
    if (e instanceof Error) {
      res.status(403).send({
        message: e.message,
      })
    }
  }
}

const getById = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user
    const { noteId } = req.params

    const note = await noteService.getById(user.id, +noteId)

    res.send({
      message: 'Note',
      note,
    })
  } catch (e) {
    if (e instanceof Error) {
      res.status(403).send({
        message: e.message,
      })
    }
  }
}

const remove = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user
    const { noteId } = req.params

    const note = await noteService.remove(user.id, +noteId)
    res.send({
      message: 'Deleted',
      note,
    })
  } catch (e) {
    if (e instanceof Error) {
      res.status(403).send({
        message: e.message,
      })
    }
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user
    const { noteId } = req.params
    const { title, description } = req.body

    const note = await noteService.update(title, description, user.id, +noteId)
    res.send({
      message: 'Updated',
      note,
    })
  } catch (e) {
    if (e instanceof Error) {
      res.status(403).send({
        message: e.message,
      })
    }
  }
}

export default {
  create,
  getAll,
  getById,
  remove,
  update,
}
