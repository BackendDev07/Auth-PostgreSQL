import { db } from '../database/db'
import { Note } from '../types'

const create = async (title: string, description: string, userId: number) => {
  const query = `INSERT INTO notes (title, description, userId) VALUES ($1, $2, $3) RETURNING *`
  const result = await db.query<Note>(query, [title, description, userId])
  return result.rows[0]
}

const getAll = async (userId: number) => {
  const query = `SELECT * FROM notes WHERE userId=$1`
  const result = await db.query<Note>(query, [userId])
  return result.rows
}

const getById = async (userId: number, noteId: number) => {
  const query = `SELECT * FROM notes WHERE userId=$1 AND id=$2`
  const result = await db.query<Note>(query, [userId, noteId])
  return result.rows[0]
}

const remove = async (userId: number, noteId: number) => {
  const query = `DELETE FROM notes WHERE userId=$1 AND id=$2 RETURNING *;`
  const result = await db.query(query, [userId, noteId])
  return result.rows[0]
}

const update = async (
  title: string,
  description: string,
  userId: number,
  noteId: number
) => {
  try {
    const query =
      'UPDATE notes SET title=$1, description=$2 WHERE userId=$3 AND id=$4 RETURNING *; '
    const result = await db.query(query, [title, description, userId, noteId])
    return result.rows[0]
  } catch (e) {
    console.log(e)
  }
}

export default {
  create,
  getAll,
  getById,
  remove,
  update,
}
