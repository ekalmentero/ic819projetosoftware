import { defineStore } from "pinia";

export const useAddressStore = defineStore('address', {
    state() {
        return {
            address: {
                id: 0,
                code: 'string',
                street: 'string',
                number: 'string',
                neighborhood: 'string',
                city: 'string',
                state: 'string',
                complement: 'string',
                userId: 0,
            }
        }
    }
})