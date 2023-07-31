<template>
    <div class="container">
        <form>
            <label for="name" :class="{ error: nameError }">
                <span>Nome completo:</span>
                <input autofocus required type="text" name="name" id="name" v-model="name" @blur="validateFullName(name)">
                <span class="error">{{ nameError }}</span>
            </label>
            <label for="email" :class="{ error: emailError }">
                <span>E-mail:</span>
                <input required type="email" name="email" id="email" v-model="email" @blur="validateEmail(email)">
                <span class="error">{{ emailError }}</span>
            </label>
            <div class="flex">
                <label for="phone">
                    <span>Telefone de emergência:</span>
                    <input required type="tel" name="phone" id="phone" v-model="phone" v-maska data-maska="(##) #####-####">
                </label>
                <label for="cpf" :class="{ error: cpfError }">
                    <span>CPF:</span>
                    <input required type="text" name="cpf" id="cpf" v-model="cpf" @blur="validateCPF(cpf)" v-maska
                        data-maska="###.###.###-##">
                    <span class="error">{{ cpfError }}</span>
                </label>
            </div>
            <label for="password" :class="{ error: passwordError }">
                <span>Senha:</span>
                <input required type="password" name="password" id="password" v-model="password"
                    @blur="validatePassword(password)">
                <span class="error">{{ passwordError }}</span>
            </label>
            <label for="password_2" :class="{ error: confPasswordError }">
                <span>Confirme sua senha:</span>
                <input required type="password" name="password_2" id="password_2" v-model="passwordConfirmation"
                    @blur="validateConfPassword(password, passwordConfirmation)">
                <span class="error">{{ confPasswordError }}</span>
            </label>
            <TheLoading v-if="loading" />
            <Button text="Avançar" theme="primary" id="avancar" @click.prevent="handleSignup"><img
                    src="@/assets/img/backward.svg"></Button>
            <p id="login" @click="changeToLogin">Já possui conta? <span class="green">Fazer login</span></p>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { vMaska } from "maska"
import Button from '../layout/TheButton.vue';
import { useSignup } from '@/composables/useSignup';
import TheLoading from '../layout/TheLoading.vue';
const { data, error, signup } = useSignup();
const loading = ref(false);

import { useUserStore } from '@/stores/UserStore';
const user = useUserStore();

import useLocalStorage from '@/composables/useLocalStorage';
const { saveToLocalStorage } = useLocalStorage();

import { useValidation } from '@/composables/useValidation';
const { validateEmail, validatePassword, validateConfPassword, validateCPF, validateFullName, nameError, emailError, passwordError, cpfError, confPasswordError } = useValidation()

const name = ref('');
const email = ref('');
const phone = ref('');
const cpf = ref('');
const password = ref('');
const passwordConfirmation = ref('');

const handleSignup = async () => {
    error.value = '';
    if (nameError.value || emailError.value || passwordError.value || cpfError.value || confPasswordError.value) {
        return false;
    }
    loading.value = true;
    await signup({
        name: name.value,
        email: email.value,
        phone: phone.value,
        cpf: cpf.value,
        password: password.value
    });
    loading.value = false;
    if (!data.value) {
        return;
    }
    saveToLocalStorage('token', data.value.token)
    saveToLocalStorage('name', data.value.name)
    saveToLocalStorage('email', data.value.email)
    saveToLocalStorage('admin', data.value.admin)
    user.loadToken();
    user.loadUser();
    data.value = null;
    return changeToAddress()
}

const emit = defineEmits(['changeToLogin', 'changeToAddress']);

const changeToLogin = () => {
    emit('changeToLogin');
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
    justify-content: center;
    height: 77vh;
    font-size: 1rem;
    width: 50%;
    margin: 3rem 0;

    @media screen and (min-width: 779px) {
        padding: 0 3rem;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 1rem;
        margin-bottom: 2rem;

        .flex {
            display: flex;
            gap: 1rem;
            flex-direction: column;

            @media screen and (min-width: 779px) {
                flex-direction: row;
                gap: 1.5rem;
            }

            label {
                flex: 1;
            }
        }

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

        #check>label {
            display: flex;
            align-items: center;
            flex-direction: row;
            font-size: 14px;
            gap: 1rem;
        }

        label.error {
            input {
                border: 2px solid var(--error-color);
            }
            span.error {
                color: var(--error-color);
            }
        }

        span.error {
            color: var(--error-color);
            ;
        }

        span.green,
        span.green>* {
            color: var(--primary-color);
            text-decoration: underline;
        }

        #avancar {
            height: 3rem;
            font-size: 20px;
        }

        p#login {
            font-size: 14px;
            color: #222;
            cursor: pointer;
        }
    }
}</style>