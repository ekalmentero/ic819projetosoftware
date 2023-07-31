<template>
    <div id="container">
        <div id="view">
            <button @click="activeShowBooking" :class="{ active: showBooking }">Reservas</button>
            <span></span>
            <button @click="unactiveShowBooking" :class="{ active: !showBooking }">Quartos</button>
        </div>
        <BookingComponent v-if="showBooking"></BookingComponent>
        <CurrentRoomComponent v-else></CurrentRoomComponent>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BookingComponent from '@/components/booking/BookingComponent.vue';
import CurrentRoomComponent from '@/components/booking/CurrentRoomComponent.vue';

const showBooking = ref(true);

const activeShowBooking = () => {
    showBooking.value = true;
};

const unactiveShowBooking = () => {
    showBooking.value = false;
}
</script>

<style scoped lang="scss">
#container {
    align-items: center;
    display: flex;
    flex-direction: column;
    min-height: 90vh;
    padding: 2rem 1rem 7rem;
    gap: 1.5rem;
    position: relative;

    #view {
        display: flex;
        align-items: center;

        span {
            display: block;
            background: #222;
            height: 1.5em;
            width: 1px;
            margin: 0 10px;
        }

        button {
            padding: 0.5rem;
            border: none;
            outline: none;
            box-sizing: border-box;
            font-weight: bold;
            color: #666666;
            font-size: 18px;

            &.active {
                color: var(--primary-color);
                text-decoration: underline;
            }
        }
    }

    #filter-container {
        position: absolute;
        top: 2rem;
        right: 1rem;

        @media screen and (min-width: 779px) {
            right: 5rem;
        }

        #filter {
            background-color: #7AA874;
            padding: 0.5rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                max-width: 1.5rem;
            }
        }
    }
}</style>