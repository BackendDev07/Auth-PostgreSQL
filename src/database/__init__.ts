import { db } from './db'

// const createUsersTable =
  // 'CREATE TABLE IF NOT EXISTS users (id SERIAL, name VARCHAR(50), surname VARCHAR(50), username VARCHAR(50), password TEXT, PRIMARY KEY (id), UNIQUE (username));'

const createNotesTable =
  'CREATE TABLE IF NOT EXISTS notes (id SERIAL, title VARCHAR(250), description TEXT, userId INT NOT NULL, FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE, PRIMARY KEY (id))'

// db.query(createUsersTable, (err, result) => {
  // if (err instanceof Error) {
    // throw console.error('Create Users Table: ', err.message)
  // }
  // console.log('CRATED', result.rows)
// })

db.query(createNotesTable, (err, result) => {
  if (err instanceof Error) {
    throw console.error('Create Notes Table: ', err.message)
  }
  console.log('CRATED', result.rows)
})
