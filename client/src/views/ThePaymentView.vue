<template>
    <div id="container">
        <TheLoading v-if="loading"></TheLoading>
        <div class="box" id="pix-box" v-if="!estaPago && !loading">
            <span>Copie o código ou escaneie o QR CODE abaixo.</span>
            <p>Ao copiar o código, abra o seu aplicativo de preferência cadastrado no PIX e realize o pagamento.</p>
            <span class="codigo">{{ codigoAleatorioPIX }}</span>
            <img id="qrimg" src="@/assets/img/qrcode.svg">
            <div class="text-center ma-2 snackbar">
                <v-snackbar v-model="snackbar" :timeout="3000">
                    Código copiado!
                </v-snackbar>
            </div>
            <Button text="Copiar código" theme="primary" id="copiar" @click="copiaCodigoPIX"></Button>
        </div>
        <div class="box" id="confirm-box" v-if="estaPago && !loading">
            <span>Obrigado!</span>
            <p>O seu pagamento foi confirmado com sucesso. Lhe desejamos uma ótima experiência conosco.</p>
            <img src="@/assets/img/pgtrealizado.png" id="confirma">
            <Button text="Consultar minhas reservas" theme="primary" id="reservas" @click="router.push('reservas')"></Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/layout/TheButton.vue';
import TheLoading from '@/components/layout/TheLoading.vue';
import router from '@/router';
import { onMounted, ref } from 'vue';
import { uuid } from 'vue-uuid';

const codigoAleatorioPIX = ref('');
const snackbar = ref(false);
const estaPago = ref(false);
const loading = ref(false)

onMounted(() => {
    codigoAleatorioPIX.value = 'puppy_resort_'.concat(uuid.v4().toString());
    setTimeout(() => {
        loading.value = true;
        setTimeout(() => {
            loading.value = false;
            estaPago.value = true;
        }, 1000)
    }, 5000)
});

const copiaCodigoPIX = () => {
    navigator.clipboard.writeText(codigoAleatorioPIX.value).then(() => {
        snackbar.value = true;
    }).catch(() => {
        alert('Não foi possível copiar o código.');
    })
}

</script>

<style scoped lang="scss">
#container {
    align-items: center;
    display: flex;
    min-height: 90vh;
    justify-content: center;
    padding: 1rem 2rem 8rem;

    .box {
        flex: 0 1;
        display: flex;
        flex-direction: column;
        gap: .5rem;
        border-radius: 5px;
        padding: 2rem;
        box-shadow: -10px 10px 20px rgba(0, 0, 0, .3);
        background-color: #fff;
        box-sizing: border-box;
        min-width: 100%;
        align-items: center;
        justify-content: center;

        .codigo {
            margin: 1em 0 0;
            word-break: break-all;
        }

        span {
            font-size: 20px;
            font-weight: bold;
        }

        p {
            font-size: 15px;
        }

        img {
            max-width: 300px;
        }

        #confirma {
            margin-top: 2rem;
            margin-bottom: 2rem;
            max-width: 100%;
            width: 10rem;
        }

        button {
            width: 100%;
        }

        @media screen and (min-width: 998px) {
            min-width: 40%;
            max-width: 40%;
        }
    }
}
</style>