export interface User {
  email: string
  name: string
  birthDay: string
  role: 'patient' | 'doctor'
  city: string | null
  phoneNumber: string | null
}
