<template>
    <div class="container">
        <form>
            <label for="cep">
                <span>CEP</span>
                <input autofocus required type="text" name="cep" id="cep" v-model="cep" placeholder="Apenas números" v-maska data-maska="#####-###">
                <small id="login">Não sabe seu cep? <span class="green"><a
                            href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank">Veja
                            aqui</a></span></small>
            </label>
            <label for="logradouro">
                <span>Logradouro</span>
                <input required type="text" name="logradouro" id="logradouro" v-model="logradouro">
            </label>
            <div class="flex">
                <label for="cidade">
                    <span>Cidade</span>
                    <input required type="text" name="cidade" id="cidade" v-model="cidade">
                </label>
                <label for="uf">
                    <span>UF</span>
                    <input required type="text" name="uf" id="uf" v-model="uf">
                </label>
            </div>
            <div class="flex">
                <label for="bairro">
                    <span>Bairro</span>
                    <input required type="text" name="bairro" id="bairro" v-model="bairro">
                </label>
                <label for="numero">
                    <span>Número</span>
                    <input ref="numeroRef" required type="text" name="numero" id="numero" v-model="numero">
                </label>
            </div>
            <label for="complemento">
                <span>Complemento</span>
                <input required type="text" name="complemento" id="complemento" v-model="complemento">
            </label>
            <div id="check">
                <label for="termos">
                    <input required type="checkbox" name="termos" id="termos" v-model="termos">
                    <span>Eu li e concordo com os <router-link to="termos" target="_blank">termos de uso</router-link> da plataforma</span>
                </label>
            </div>
            <span class="error">{{ error }}</span>
            <TheLoading v-if="loading" />
            <Button text="Avançar" theme="primary" id="avancar" @click.prevent="handleSignup"><img
                    src="@/assets/img/backward.svg"></Button>
            <p id="login" @click="changeToLogin">Já possui conta? <span class="green">Fazer login</span></p>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { vMaska } from "maska"
import Button from '../layout/TheButton.vue';
import TheLoading from '../layout/TheLoading.vue';
import router from '@/router';
import { useAddress } from '@/composables/useAddress';
const { createAddress, data, error } = useAddress();
import { useUserStore } from '@/stores/UserStore';
const user = useUserStore();
const loading = ref(false);

const cep = ref('');
const cidade = ref('');
const logradouro = ref('');
const bairro = ref('');
const uf = ref('');
const numero = ref('');
const complemento = ref('');
const termos = ref(false);
const numeroRef = ref(null)

watch(cep, async () => {
    if (cep.value.length === 9) {
        loading.value = true;
        const res = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);
        const r = await res.json();
        loading.value = false;
        if (r.logradouro) {
            logradouro.value = r.logradouro;
            bairro.value = r.bairro;
            cidade.value = r.localidade;
            uf.value = r.uf;
            if (cidade.value && numeroRef.value) {
                (numeroRef.value as HTMLInputElement).focus();
            }
        }
    }
})

const handleSignup = async () => {
    error.value = '';
    if (!termos.value) {
        error.value = 'Aceite os termos de uso para prosseguir.'
        return;
    }
    await createAddress({
        code: cep.value,
        street: logradouro.value,
        city: cidade.value,
        number: numero.value,
        neighborhood: bairro.value,
        state: uf.value,
        complement: complemento.value
    }, user.token);
    if (!data.value) {
        return;
    }
    return router.push('agendamento')
}

const emit = defineEmits(['changeToLogin']);

const changeToLogin = () => {
    emit('changeToLogin');
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

            a {
                color: var(--primary-color);
            }
        }

        span.error {
            color: #ff4848;
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
}
</style>