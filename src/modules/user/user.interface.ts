export interface IUser {
  name: {
    frist: string
    last: string
  }
  age: number
  email: string
  photo?: string | null
  role: 'user' | 'admin'
  userStatus: 'active' | 'inactive'
}
