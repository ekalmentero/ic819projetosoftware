<template>
    <ModalComponent :is-close-button-active="!!pet?.pets?.length" :modal-active="modalActive"
        @fechaModal="$emit('fechaModal')">
        <div id="form-container">
            <h2>Antes de tudo, vamos cadastrar seu pet</h2>
            <form>
                <label for="namepet">
                    <span>Nome do Pet</span>
                    <input required type="text" name="namepet" id="namepet" v-model="name" autofocus>
                </label>
                <div class="especie-genero">
                    <label for="especie">
                        <span>Espécie</span>
                        <select name="especie" id="especie" v-model="species">
                            <option value="dog">Cão</option>
                            <option value="cat">Gato</option>
                        </select>
                    </label>
                    <label for="genero">
                        <span>Gênero</span>
                        <select name="genero" id="genero" v-model="gender">
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                    </label>
                </div>
                <label for="raca">
                    <span>Raça</span>
                    <input required type="text" name="raca" id="raca" v-model="breed">
                </label>
                <label for="idade">
                    <span>Idade</span>
                    <input required type="number" min="0" name="idade" id="idade" v-model="age" v-maska data-maska="##">
                </label>
                <label for="descricao">
                    <span>Breve descrição do seu pet</span>
                    <textarea required rows="5" name="descricao" id="descricao" v-model="description"></textarea>
                </label>
                <span class="error">{{ error }}</span>
                <!-- faz um @click.prevent=funcao e essa funcao chama um composable pra cadastrar o pet, qualquer duvida me avisa -->
                <Button @click.prevent=cadastraPet text="Finalizar" theme="primary" id="finalizar" />
            </form>
        </div>
    </ModalComponent>
</template>

<script setup lang="ts">
import ModalComponent from '@/components/layout/ModalComponent.vue'
import { vMaska } from "maska"
import Button from '../layout/TheButton.vue';
import { ref } from 'vue';
import { usePet } from '@/composables/usePet'
import { useUserStore } from '@/stores/UserStore';
const user = useUserStore()
const { createPet, data, error } = usePet();
import router from '@/router';
import { usePetStore } from '@/stores/PetStore'
const pet = usePetStore();

const name = ref('');
const species = ref('dog');
const gender = ref('M');
const breed = ref('');
const age = ref('');
const description = ref('');

async function cadastraPet() {
    await createPet({
        name: name.value,
        species: species.value,
        gender: gender.value,
        breed: breed.value,
        age: Number(age.value),
        description: description.value
    }, user.token)

    if (data.value) {
        router.go(0);
        return
    }
}

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