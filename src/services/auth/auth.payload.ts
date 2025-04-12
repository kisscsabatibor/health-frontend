import { User } from '../user/user'

export const BACKEND_URL = 'http://localhost:3000'

export interface RegistrationPayload extends User {
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponsePayload {
  token: string
  role: string
}
