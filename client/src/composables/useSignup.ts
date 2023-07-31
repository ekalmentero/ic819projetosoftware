import { useFetch } from './useFetch'

type User = {
  name: string
  email: string
  phone: string
  cpf: string
  password: string
}

export function useSignup() {
  const { data, error, post } = useFetch()

  const signup = async (user: User) => {
    const api = process.env.BASE_API
    await post(`${api}/user`, {
      name: user.name,
      phone: user.phone,
      email: user.email,
      password: user.password,
      cpf: user.cpf
    })
  }

  return {
    data,
    error,
    signup,
  }
}
