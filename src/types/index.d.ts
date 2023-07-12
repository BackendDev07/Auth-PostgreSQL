export interface User {
  id: number
  name: string
  surname: string
  username: string
  password: string
}

// one to many Relation

export interface Note {
  id: number
  title: string
  description: string
  userId: number
}
