<template>
    <div id="banner">
        <img id="img-fundo" src="@/assets/img/icons/paw_print2.svg">
        <h1 id="title" v-html="text"></h1>
        <Button text="Cadastre-se" v-if="etapaAtual == 0" @click="changeToSignup" theme="primary"
            id="button-banner"></Button>
        <Button text="Faça login" v-if="etapaAtual == 1" @click="changeToLogin" theme="primary" id="button-banner"></Button>
    </div>
</template>

<script setup lang="ts">
defineProps({
    text: String,
    etapaAtual: Number,
})
import Button from '../layout/TheButton.vue';
const emit = defineEmits(['changeToSignup', 'changeToLogin'])

const changeToSignup = () => {
    emit('changeToSignup');
}
const changeToLogin = () => {
    emit('changeToLogin');
}
</script>

<style scoped lang="scss">
@font-face {
    font-family: Digitalt;
    src: url(@/assets/fonts/Digitalt-04no.ttf)
}

#banner {
    background: #E86A33;
    max-width: 50%;
    height: 77vh;
    display: none;

    @media screen and (min-width: 998px) {
        display: flex;
    }

    align-items: center;
    flex-direction: column;
    padding:5rem;
    border-radius: 5px;
    justify-content: center;
    gap:3rem;

    img {
        max-width: 22rem;
        position: absolute;
        opacity: 0.3;
    }

    h1 {
        font-size: 2.5rem;
        color: #ffffff;
        font-weight: 500;
        font-family: 'Digitalt', sans-serif;
        text-shadow: 1px 2px #000000;
        max-width: 89%;

    }

    #button-banner {
        background-color: #E86A33;
        border: 1px solid #fff;
        min-width: 40%;
        height: 3rem;
        font-size: 20px;
    }
}</style>