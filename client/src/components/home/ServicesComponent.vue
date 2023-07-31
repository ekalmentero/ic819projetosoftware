<template>
    <div id="services-container">
        <h2>Serviços inclusos em nossas hospedagens</h2>
        <div id="services">
            <div class="card green">
                <img src="@/assets/img/icons/services/dog-food.svg">
                <p>Alimentação</p>
            </div>
            <div class="card brown">
                <img src="@/assets/img/icons/services/backyard.svg">
                <p>Grande espaço</p>
            </div>
            <div class="card green">
                <img src="@/assets/img/icons/services/pet-taxi.svg">
                <p>Taxi dog</p>
            </div>
            <div class="card brown">
                <img src="@/assets/img/icons/services/clinica.svg">
                <p>Clínica 24 horas</p>
            </div>
            <div class="card green">
                <img src="@/assets/img/icons/services/banho-tosa.svg">
                <p>Banho e tosa</p>
            </div>
            <div class="card brown">
                <img src="@/assets/img/icons/services/pet-toy.svg">
                <p>Recreação e piscina</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#services-container {
    padding: 2rem;

    @media screen and (min-width: 779px) {
        padding: 2rem 3rem;
    }

    h2 {
        margin-bottom: 1.5rem;
    }

    #services {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;

        @media screen and (min-width: 779px) {
            gap: 2rem;
        }

        .card {
            display: flex;
            flex-direction: column;
            padding: 1rem;
            border-radius: 5px;
            gap: 1.5rem;
            align-items: center;
            flex-grow: 1;
            flex-basis: 8rem;
            max-height: 135px;
            box-shadow: 1px 1px 5px #000000;
            transition: .2s;

            &:hover {
                transform: scale(1.02);
            }

            @media screen and (max-width: 464px) and (min-width: 328px) {
                &:nth-child(3) {
                    order: 4;
                }

                &:nth-child(6) {
                    order: 7;
                }
            }

            p {
                color: #fff;
            }

            img {
                max-width: 3rem;
            }


            &.green {
                background-color: var(--primary-color);
            }

            &.brown {
                background-color: var(--secondary-color);
            }
        }
    }
}
</style>