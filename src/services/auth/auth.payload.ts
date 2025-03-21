import { User } from '../user/user'

export interface RegistrationPayload extends User {
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}
