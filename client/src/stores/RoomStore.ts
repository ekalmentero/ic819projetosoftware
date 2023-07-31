import { defineStore } from 'pinia'

export const useRoomStore = defineStore('room', {
  state() {
    return {
      rooms: [
        {
          notAvailableAt: [] as Date[],
          room: 0,
          number: 0,
          available: false,
          services: [
            {
              pet: {
                name: '',
                species: '',
                user: {
                  name: '',
                  phone: ''
                }
              },
              endDate: '',
              startDate: ''
            }
          ]
        }
      ]
    }
  },

  // verificar se o quarto está disponível aqui
  getters: {

  },

  actions() {}
})
