import { ref } from 'vue'
import { useFetch } from './useFetch'
import { useAddressStore } from '@/stores/AddressStore'
const address = useAddressStore()

type Address = {
  code: string
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  complement: string
}

export function useAddress() {
  const { get, post, put, data, error } = useFetch()

  const myAddress = async (token: string) => {
    const api = process.env.BASE_API
    await get(`${api}/user/address`, token)
    address.address = data.value
  }

  const createAddress = async (address: Address, token: string) => {
    const api = process.env.BASE_API
    await post(`${api}/address`, {
      code: address.code,
      street: address.street,
      city: address.city,
      neighborhood: address.neighborhood,
      number: address.number,
      state: address.state,
      complement: address.complement
    }, token)
  }

  const updateAddress = async (address: any, token: string) => {
    const api = process.env.BASE_API
    await put(`${api}/address/${address.id}`, {
        code: address.code,
        street: address.street,
        number: address.number,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        complement: address.complement,
    }, token)
  }

  return {
    myAddress,
    createAddress,
    updateAddress,
    data,
    error,
  }
}
