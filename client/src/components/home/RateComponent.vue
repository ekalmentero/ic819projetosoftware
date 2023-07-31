<template>
    <div id="rate">
        <h2>Depoimentos de nossos clientes</h2>
        <div id="rate-container">
            <div class="rate-card">
                <div class="paws">
                    <img v-for="i in 5" src="@/assets/img/icons/paws-marked.png" :key="i">
                </div>
                <img class="foto-tutor" src="@/assets/img/icons/user.svg">
                <p class="nome-tutor">Wesley</p>
                <p class="depoimento">O atendimento é excelente e os funcionários são muito prestativos.
                    Fiquei muito satisfeito com a hospedagem do Mike no hotel haha.</p>
            </div>
            <div class="rate-card">
                <div class="paws">
                    <img v-for="i in 5" src="@/assets/img/icons/paws-marked.png" :key="i">
                </div>
                <img class="foto-tutor" src="@/assets/img/icons/user.svg">
                <p class="nome-tutor">Gabriele</p>
                <p class="depoimento">A hospedagem da minha gata foi excelente!
                    Ela ficou super à vontade e eu pude viajar tranquila sabendo que ela estava sendo muito bem cuidada. Recomendo!</p>
            </div>
            <div class="rate-card">
                <div class="paws">
                    <img v-for="i in 5" src="@/assets/img/icons/paws-marked.png" :key="i">
                </div>
                <img class="foto-tutor" src="@/assets/img/icons/user.svg">
                <p class="nome-tutor">Maria Eduarda</p>
                <p class="depoimento">A equipe é muito dedicada e cuidadosa com os animais.
                    Os animais ficam em espaços amplos e bem cuidados. Agradeço pelo carinho com a minha filha.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#rate {
    background-color: var(--primary-color);
    padding: 2rem;

    @media screen and (min-width: 779px) {
        padding: 2rem 3rem;
    }

    h2 {
        color: #fff;
        margin-bottom: 1.5rem;
    }

    #rate-container {
        background-color: var(--primary-color);
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;

        @media screen and (min-width: 779px) {
            gap: 2rem;
        }

        .rate-card {
            display: flex;
            flex-direction: column;
            background-color: #fff;
            border-radius: 5px;
            gap: 0.5rem;
            padding: 1rem;
            flex: 1 1 11rem;
            box-shadow: 1px 1px 5px #000000;

            .paws {
                display: flex;
                gap: 0.3rem;

                img {
                    max-width: 1.5rem;
                }
            }

            .foto-tutor {
                max-width: 4rem;
                margin: auto;
                display: block;
            }

            p {
                color: #222;
                text-align: center;
            }
        }
    }
}
</style>