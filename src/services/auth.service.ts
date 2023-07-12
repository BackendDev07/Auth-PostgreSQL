import { db } from '../database/db'
import { User } from '../types'
import bcrypt from 'bcrypt'

type Register = (user: Omit<User, 'id'>) => Promise<User | undefined>
type Login = (username: string, password: string) => Promise<User>

const register: Register = async (user) => {
  const query =
    'INSERT INTO users (name, surname, username, password) VALUES ($1, $2, $3, $4) RETURNING *;'
  const hashPassword = await bcrypt.hash(user.password, 10)

  const result = await db.query<User>(query, [
    user.name,
    user.surname,
    user.username,
    hashPassword,
  ])
  return result.rows[0]
}

const login: Login = async (username, password) => {
  const query = `SELECT * from users WHERE username='${username}';` // [{}]
  const result = await db.query<User>(query)

  if (!result.rows.length) {
    throw new Error('Username not exists')
  }

  const compare = await bcrypt.compare(password, result.rows[0].password)

  if (!compare) {
    throw new Error('Password not valid')
  }

  return result.rows[0]
}

export default {
  register,
  login,
}
