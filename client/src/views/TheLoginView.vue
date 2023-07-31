<template>
    <div class="container">
        <BannerComponent :etapa-atual="etapaAtual" @changeToSignup="etapaAtual = 1" @changeToLogin="etapaAtual = 0"
            text="Seja bem-vindo(a)(e)!<br> A magia do nosso resort começa aqui." />
        <LoginFormComponent v-if="etapaAtual == 0" @changeToSignup="etapaAtual = 1" @changeToAddress="etapaAtual = 2" id="login" />
        <CadastroFormComponent v-if="etapaAtual == 1" @changeToLogin="etapaAtual = 0" @changeToAddress="etapaAtual = 2" id="cadastro" />
        <EnderecoFormComponent v-if="etapaAtual == 2" @changeToLogin="etapaAtual = 0" id="endereco"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BannerComponent from '@/components/login/BannerComponent.vue';
import CadastroFormComponent from '@/components/login/CadastroFormComponent.vue';
import LoginFormComponent from '@/components/login/LoginFormComponent.vue';
import EnderecoFormComponent from '@/components/login/EnderecoFormComponent.vue';

enum opcoesForm {
    LOGIN,
    CADASTRO,
    ENDERECO
}

const etapaAtual = ref(opcoesForm.LOGIN)

</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: row;
    margin: 2rem 3rem 20rem;
    justify-content: center;

    @media screen and (min-width: 998px) {
        justify-content: space-around;
        margin: 2rem 3rem;
    }

    #login,
    #cadastro,
    #endereco {
        flex: 3;
    }
}
</style>