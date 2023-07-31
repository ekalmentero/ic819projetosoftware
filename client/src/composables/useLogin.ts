import { useFetch } from './useFetch'

type Auth = {
  identifier: string
  password: string
}

export function useLogin() {
  const { data, error, post, get, put } = useFetch()

  const login = async (user: Auth) => {
    const api = process.env.BASE_API
    await post(`${api}/user/login`, {
      identifier: user.identifier,
      password: user.password
    });
  }
  
  const getMe = async (token: string) => {
    const api = process.env.BASE_API
    await get(`${api}/user/me`, token)
  }

  const isComplete = async (token: string) => {
    const api = process.env.BASE_API
    await get(`${api}/user/iscomplete`, token)
  }

  const updateUser = async (user: any, token: string) => {
    const api = process.env.BASE_API
    await put(`${api}/user/${user.id}`, {
      name: user.name,
      phone: user.phone,
      password: user.password
    }, token)
  }
  

  return {
    data,
    error,
    login,
    isComplete,
    getMe,
    updateUser,
  }
}
