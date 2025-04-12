import { User } from '../user/user'

export interface Request {
  _id: string
  patient: User
  doctor: User
  assignedAt: Date
}
