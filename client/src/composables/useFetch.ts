import { ref } from 'vue'

export function useFetch() {
  const data = ref(null) as any
  const error = ref('')

  const get = async (url: string, token: string = '') => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: [
          ['Content-Type', 'application/json'],
          ['Authorization', token ? `Bearer ${token}` : '']
        ]
      })
      const result = await response.json()
      if (result.error) {
        error.value = result.error
        return
      }

      data.value = result.data
    } catch (e) {
      console.log(e)
    }
  }

  const post = async (url: string, body: any, token: string = '') => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: [['Content-Type', 'application/json'], ['Authorization', token ? `Bearer ${token}` : '']],
        body: JSON.stringify({ ...body }),
      })
      const result = await response.json()
      if (result.error) {
        error.value = result.error
        return
      }
      data.value = result.data
    } catch (e) {
      console.log(e)
    }
  }

  const put = async (url: string, body: any, token: string = '') => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: [['Content-Type', 'application/json'], ['Authorization', token ? `Bearer ${token}` : '']],
        body: JSON.stringify({ ...body }),
      })
      const result = await response.json()
      if (result.error) {
        error.value = result.error
        return
      }
      data.value = result.data
    } catch (e) {
      console.log(e)
    }
  }

  return {
    get,
    post,
    put,
    data,
    error,
  }
}
