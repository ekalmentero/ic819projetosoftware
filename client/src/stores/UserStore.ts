import { defineStore } from "pinia";
import useLocalStorage from '@/composables/useLocalStorage';
const { saveToLocalStorage } = useLocalStorage();

export const useUserStore = defineStore('user', {
    state() {
        return {
            user: {
                name: '',
                email: '',
                admin: false,
            },
            token: ''
        }
    },

    actions: {
        logout() {
            this.user = {
                name: '',
                email: '',
                admin: false,
            }
            this.token = '';
        },
        setUser(user: any) {
            this.user = user;
            saveToLocalStorage('name', user.name)
            saveToLocalStorage('email', user.email)
            saveToLocalStorage('admin', user.admin)
        },
        setToken(token: string) {
            this.token = token;
            saveToLocalStorage('token', token)
        },
        loadToken() {
            const token = localStorage.getItem('token');
            if (token) {
                this.token = token;
            }
        },
        loadUser() {
            const name = localStorage.getItem('name');
            const email = localStorage.getItem('email');
            const admin = localStorage.getItem('admin');
            if (name && email) {
                this.user.name = name;
                this.user.email = email;
                this.user.admin = admin == 'true';
            }
        }
    },

    getters: {
        isAuthenticated(): boolean {
            return !!this.token;
        }
    }
})