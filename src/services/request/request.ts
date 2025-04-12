import { User } from '../user/user'

export interface RequestPayload {
  _id: string
  patient: User
  doctor: User
  assignedAt: Date
}
