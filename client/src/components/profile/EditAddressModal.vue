<template>
    <ModalComponent :is-close-button-active="true" :modal-active="modalActive" @fechaModal="$emit('fechaModal')">
        <div id="form-container">
            <h2>Edição de endereço</h2>
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
                <span class="error">{{ error }}</span>
                <Button text="Atualizar" theme="primary" id="finalizar" @click.prevent="editaEndereco" />
            </form>
        </div>
    </ModalComponent>
</template>

<script setup lang="ts">
import ModalComponent from '@/components/layout/ModalComponent.vue'
import { vMaska } from "maska"
import Button from '../layout/TheButton.vue';
import { onMounted, ref, watch } from 'vue';

import { useAddress } from '@/composables/useAddress';
const { myAddress, updateAddress, data, error } = useAddress();

import { useAddressStore } from '@/stores/AddressStore';
const address = useAddressStore();

import { useUserStore } from '@/stores/UserStore';
import router from '@/router';
const user = useUserStore();

const id = ref(0);
const cep = ref('');
const cidade = ref('');
const logradouro = ref('');
const bairro = ref('');
const uf = ref('');
const numero = ref('');
const complemento = ref('');
const numeroRef = ref(null)

watch(cep, async () => {
    if (cep.value.length === 9 && cep.value != address.address.code) {
        const res = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);
        const r = await res.json();
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

async function editaEndereco() {
    if (cep.value && logradouro.value && numero.value && bairro.value && cidade.value && uf.value && complemento.value) {
        await updateAddress({
            id: id.value,
            code: cep.value,
            street: logradouro.value,
            city: cidade.value,
            state: uf.value,
            neighborhood: bairro.value,
            number: numero.value,
            complement: complemento.value,
        }, user.token)

        if (data.value) {
            router.go(0);
            return
        }
    }
}

onMounted(async () => {
    await myAddress(user.token);
    id.value = address.address.id
    cep.value = address.address.code
    cidade.value = address.address.city
    logradouro.value = address.address.street
    bairro.value = address.address.neighborhood
    uf.value = address.address.state
    numero.value = address.address.number
    complemento.value = address.address.complement
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