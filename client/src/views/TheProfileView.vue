<template>
    <div id="container">
        <TheLoading v-if="loading"></TheLoading>
        <div id="personal-data" v-if="me">
            <div class="picture"><img src="@/assets/img/icons/user.svg" alt=""></div>
            <div class="info">
                <p>{{ me.name }}</p>
                <p>{{ me.email }}</p>
                <p>CPF: {{ me.cpf }}</p>
                <img src="../assets/img/icons/pencil.svg" alt="Editar dados pessoais" title="Editar dados pessoais"
                    @click="openProfileEditModal">
            </div>
            <div class="phone-container">
                <h3>Contato de emergência</h3>
                <div class="phone">
                    <p>{{ me.phone }}</p>
                </div>
            </div>
        </div>
        <div id="address-data" v-if="me?.address">
            <h3>Endereço</h3>
            <img src="../assets/img/icons/pencil.svg" alt="Editar endereço" title="Editar endereço"
                @click="openAddressEditModal">
            <article>
                <span>{{ me.address.street }}, {{ me.address.number }}</span>
                <span>{{ me.address.neighborhood }}, {{ me.address.city }} - {{ me.address.state }}</span>
                <span>{{ me.address.code }}</span>
            </article>
        </div>
        <div id="pets-data" v-if="me?.pets?.length">
            <h3>Meus pets</h3>
            <div class="pet" v-for="pet in me.pets" :key="pet.id">
                <article>
                    <div>
                        <img src="@/assets/img/icons/dog.svg" alt="Cão" v-if="pet.species == 'dog'">
                        <img src="@/assets/img/icons/cat.svg" alt="Gato" v-if="pet.species == 'cat'">
                        <span>{{ pet.name }}, {{ pet.age }} {{ pet.age == 1 ? 'ano' : 'anos' }}</span>
                        <img src="../assets/img/icons/pencil.svg" alt="Editar pets" title="Editar pets"
                            @click="openPetsEditModal(pet)">
                    </div>
                    <span>{{ pet.breed }}, {{ pet.gender == 'F' ? 'Fêmea' : 'Macho' }}</span>
                    <span>{{ pet.description }}</span>
                </article>
            </div>
        </div>
        <EditPetModal v-if="isPetsEditModalActive" :pet-to-edit="petToEdit" :modal-active="isPetsEditModalActive"
            @fechaModal="isPetsEditModalActive = false"></EditPetModal>
        <EditAddressModal v-if="isAddressEditModalActive" :modal-active="isAddressEditModalActive"
        @fechaModal="isAddressEditModalActive = false"></EditAddressModal>
        <EditProfileModal v-if="isProfileEditModalActive" :modal-active="isProfileEditModalActive"
        @fechaModal="isProfileEditModalActive = false"></EditProfileModal>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TheLoading from '@/components/layout/TheLoading.vue';
import EditPetModal from '@/components/profile/EditPetModal.vue'
import EditAddressModal from '@/components/profile/EditAddressModal.vue';
import EditProfileModal from '@/components/profile/EditProfileModal.vue';

import { useLogin } from '@/composables/useLogin'
import { useUserStore } from '@/stores/UserStore';
const user = useUserStore();
const { getMe, data, error } = useLogin();

import { usePet } from '@/composables/usePet';
const { myPets } = usePet();

const loading = ref(false);

const me = ref('') as any;

const isProfileEditModalActive = ref(false);
const isAddressEditModalActive = ref(false);
const isPetsEditModalActive = ref(false);
const isPetRegisterModalActive = ref(false);

const openProfileEditModal = () => {
    isProfileEditModalActive.value = true;
}

const openAddressEditModal = () => {
    isAddressEditModalActive.value = true;
}

const petToEdit = ref(null) as any;

const openPetsEditModal = (pet: any) => {
    petToEdit.value = pet;
    isPetsEditModalActive.value = true;
}

const openPetRegisterModal = () => {
    isPetRegisterModalActive.value = true;
}

onMounted(async () => {
    loading.value = true;
    await getMe(user.token)
    await myPets(user.token)
    loading.value = false;

    if (data.value) {
        me.value = data.value
    }
});
</script>

<style scoped lang="scss">
#container {
    display: flex;
    min-height: 90vh;
    flex-direction: column;
    gap: 1.5em;
    padding: 3rem 2rem 8rem;
    background-image: url("@/assets/img/paw_print3.svg");
    background-repeat: repeat-x;
    position: relative;

    @media screen and (min-width: 998px) {
        padding: 3rem 25rem;
    }

    h3,
    h4 {
        margin-bottom: .5em;
    }

    span {
        color: #666;
    }

    #personal-data {
        display: flex;
        flex-direction: column;
        gap: .8em;

        .picture {
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
                height: 75px;
                width: 75px;
            }
        }

        .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;
            padding-bottom: 16px;
            border-bottom: 2px solid #c6c6c6;

            img {
                cursor: pointer;
            }
        }

        .phone-container {
            padding-top: 1em;
            margin: 0 auto;

            @media screen and (min-width: 998px) {
                max-width: 200px;
            }

            .phone {
                background: #38d386;
                padding: .5em 1em;
                border-radius: 3px;

                p {
                    color: #ffffff;
                    text-align: center;
                }
            }
        }
    }

    #address-data {
        position: relative;

        &>img {
            position: absolute;
            top: 0;
            left: 100px;
            cursor: pointer;
        }
    }

    #address-data {
        article {
            display: flex;
            flex-direction: column;
            gap: 3px;
        }
    }

    #pets-data {

        .pet {
            margin-bottom: 10px;

            article {
                display: flex;
                flex-direction: column;
                gap: 3px;

                div {
                    display: flex;
                    align-items: center;
                    gap: 5px;

                    img {
                        max-width: 20px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>