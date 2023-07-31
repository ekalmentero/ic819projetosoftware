import { defineStore } from "pinia";

export const usePetStore = defineStore('pet', {
    state() {
        return {
            pets: [{
                id: 0,
                name: '',
                age: 0,
                description: '',
                gender: '',
                breed: '',
                species: '',
            }]
        }
    },

    actions() {}
})