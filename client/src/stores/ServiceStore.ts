import { defineStore } from 'pinia'

export const useServiceStore = defineStore('service', {
  state() {
    return {
      services: [
        {
          id: 0,
          startDate: '',
          endDate: '',
          roomNumber: '',
          finished: false,
          value: 0,
          pet: {
            name: '',
            species: '',
            user: {
              cpf: ''
            }
          },
          room: {
            available: false,
          }
        }
      ]
    }
  },

  actions: {
    setService(services: any) {
      this.services = services
    }
  }
})
