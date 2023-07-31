<template>
    <ModalComponent :is-close-button-active="true" :modal-active="modalActive" @fechaModal="$emit('fechaModal')">
        <div id="form-container">
            <h2>Edição de usuário</h2>
            <form>
                <label for="nome" :class="{ error: nameError }">
                    <span>Nome completo</span>
                    <input required type="text" name="nome" id="nome" v-model="nome" @blur="validateFullName(nome)">
                    <span class="error">{{ nameError }}</span>
                </label>
                <label for="telefone">
                    <span>Telefone</span>
                    <input required type="text" name="telefone" id="telefone" v-model="telefone" v-maska
                        data-maska="(##) #####-####">
                </label>
                <span class="alterar-senha" @click="isAlteraSenha = true" v-if="!isAlteraSenha">Alterar senha <img
                        src="../../assets/img/icons/chevron_down.svg" alt=""></span>
                <span class="alterar-senha" @click="isAlteraSenha = false" v-if="isAlteraSenha">Não alterar senha <img
                        src="../../assets/img/icons/chevron_up.svg" alt=""></span>
                <label for="senha" v-if="isAlteraSenha" :class="{ error: passwordError }">
                    <span>Senha</span>
                    <input required type="password" name="senha" id="senha" v-model="senha" @blur="validatePassword(senha)">
                    <span class="error">{{ passwordError }}</span>
                </label>
                <label for="confirmacaoDeSenha" v-if="isAlteraSenha" :class="{ error: confPasswordError }">
                    <span>Confirmação de senha</span>
                    <input required type="password" name="confirmacaoDeSenha" id="confirmacaoDeSenha"
                        v-model="confirmacaoDeSenha" @blur="validateConfPassword(senha, confirmacaoDeSenha)">
                    <span class="error">{{ confPasswordError }}</span>
                </label>
                <span class="error">{{ error }}</span>
                <Button text="Atualizar" theme="primary" id="finalizar" @click.prevent="editaUsuario" />
            </form>
        </div>
    </ModalComponent>
</template>

<script setup lang="ts">
import ModalComponent from '@/components/layout/ModalComponent.vue'
import Button from '../layout/TheButton.vue';
import { vMaska } from "maska"
import { onMounted, ref } from 'vue';

import { useValidation } from '@/composables/useValidation';
const { validateFullName, validatePassword, validateConfPassword, nameError, passwordError, confPasswordError } = useValidation()

import { useLogin } from '@/composables/useLogin';
const { getMe, updateUser, data, error } = useLogin();
const user = useUserStore();

import { useUserStore } from '@/stores/UserStore';
import router from '@/router';

const id = ref(0);
const nome = ref('');
const telefone = ref('');
const senha = ref('');
const confirmacaoDeSenha = ref('');

const isAlteraSenha = ref(false);

async function editaUsuario() {

    if (nome.value && telefone.value) {
        if (isAlteraSenha.value && senha.value && confirmacaoDeSenha.value && senha.value !== confirmacaoDeSenha.value) {
            error.value = 'As senhas não coincidem'
            return;
        }
        await updateUser({
            id: id.value,
            name: nome.value,
            phone: telefone.value,
            password: isAlteraSenha.value ? senha.value : null,
        }, user.token)
        if (data.value) {
            router.go(0);
            return
        }
    }
}

onMounted(async () => {
    await getMe(user.token)
    id.value = data.value.id
    nome.value = data.value.name
    telefone.value = data.value.phone
    senha.value = '';
    confirmacaoDeSenha.value = '';
});

defineProps({
    modalActive: Boolean,
})
</script>

<style scoped lang="scss">
#form-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-size: 1rem;
    padding: 2rem;
    gap: 2rem;

    @media screen and (min-width: 998px) {
        min-width: 100%;
    }

    h2 {
        color: var(--primary-color);
    }

    form {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 1.5rem;

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

        .especie-genero {
            display: flex;
            gap: 1rem;
        }

        label {
            display: flex;
            flex-direction: column;
            gap: .5rem;
            width: 100%;
        }

        .alterar-senha {
            color: var(--primary-color);
            display: flex;
            align-items: center;
            cursor: pointer;
        }

        input,
        select,
        textarea {
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

        textarea {
            height: initial;
            padding: 10px;
            resize: none;
            font-family: Roboto, sans-serif;
        }

        label.error {
            input {
                border: 2px solid var(--error-color);
            }

            span.error {
                color: var(--error-color);
                ;
            }
        }

        span.error {
            color: #ff4848;
        }

        #finalizar {
            height: 3rem;
            font-size: 20px;
            width: 100%;
        }
    }
}
</style>