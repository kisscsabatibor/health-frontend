import { User } from '../user/user'
import { environment } from '../../environments/environment'

export const BACKEND_URL = environment.backendUrl

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
