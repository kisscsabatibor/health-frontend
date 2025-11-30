import { User } from '../user/user'

export const BACKEND_URL = 'https://health-backend-4wto.onrender.com'

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
