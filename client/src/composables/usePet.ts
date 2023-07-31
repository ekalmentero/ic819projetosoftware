import { ref } from 'vue';
import { useFetch } from './useFetch'
import { usePetStore } from '@/stores/PetStore'
const pet = usePetStore();

type Pet = {
  name: string
  age: number
  description: string
  gender: string
  breed: string
  species: string

}

export function usePet() {
  const { get, post, put, data, error} = useFetch()

  const myPets = async (token: string) => {
    const api = process.env.BASE_API
    await get(`${api}/user/pets`, token)
    
    pet.pets = data.value;
  }

  const createPet = async (pet: Pet, token: string) => {
    const api = process.env.BASE_API
    await post(`${api}/pet`, {
      name: pet.name,
      age: pet.age,
      description: pet.description,
      gender: pet.gender,
      breed: pet.breed,
      species: pet.species
    }, token)
  }

  const updatePet = async (pet: any, token: string) => {
    const api = process.env.BASE_API
    await put(`${api}/pet/${pet.id}`, {
      name: pet.name,
      age: pet.age,
      description: pet.description,
      breed: pet.breed,
    }, token)
  }

  return {
    myPets,
    createPet,
    updatePet,
    data,
    error,
  }
}
