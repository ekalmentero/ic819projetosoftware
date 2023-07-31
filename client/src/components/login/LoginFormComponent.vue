<template>
    <div class="container">
        <form>
            <label for="email">
                <span>E-mail ou cpf:</span>
                <input autofocus required type="email" name="email" id="email" v-model="identifier">
            </label>
            <label for="password">
                <span>Senha:</span>
                <input required type="password" name="password" id="password" v-model="password">
            </label>
            <span class="error">{{ error }}</span>
            <TheLoading v-if="loading" />
            <Button text="Entrar" theme="primary" id="entrar" @click.prevent="handleLogin" v-else></Button>
            <p id="create" @click.prevent="changeToSignup">Não possui conta? <span class="green">Cadastre-se</span></p>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '../layout/TheButton.vue';
import router from '@/router';
import TheLoading from '../layout/TheLoading.vue';

import { useLogin } from '@/composables/useLogin';
const { data, error, login, isComplete } = useLogin();
const loading = ref(false);

import { useUserStore } from '@/stores/UserStore';
const user = useUserStore();

const identifier = ref('');
const password = ref('');

const handleLogin = async () => {
    error.value = ''
    if (!identifier.value || !password.value) {
        return;
    }
    loading.value = true;
    await login({
        identifier: identifier.value,
        password: password.value,
    });
    loading.value = false;
    if (!data.value) {
        return;
    }
    user.setToken(data.value.token);
    user.setUser({
        name: data.value.name,
        email: data.value.email,
        admin: data.value.admin,
    });
    data.value = null;
    if (user.isAuthenticated) {
        
        await isComplete(user.token);
        if (data.value) {
            if (user.user.admin) {
                router.push('/admin');
                return;
            }
            router.push('/agendamento');
            return;
        }
        return changeToAddress();
    }
}

const emit = defineEmits(['changeToSignup', 'changeToAddress']);

const changeToSignup = () => {
    emit('changeToSignup');
}

const changeToAddress = () => {
    emit('changeToAddress');
}
</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
    width: 50%;
    padding: 4rem 0 0;

    @media screen and (min-width: 779px) {
        padding: 6rem 6rem 0;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 1.5rem;

        label {
            display: flex;
            flex-direction: column;
            gap: .5rem;

            input {
                background-color: #F8F9F9;
                border: none;
                border-radius: 5px;
                height: 2.5rem;
                padding: 0 1rem;
                color: #222;
                font-size: 1rem;
                outline: none;

                &:focus {
                    border: 2px solid var(--primary-color);
                }
            }
        }

        span.error {
            color: var(--error-color);;
        }

        span.green,
        span.green>* {
            color: var(--primary-color);
            text-decoration: underline;
        }

        #entrar {
            height: 3rem;
            font-size: 20px;
        }

        p#create {
            font-size: 14px;
            color: #222;
            cursor: pointer;
        }
    }
}
</style>