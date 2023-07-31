<template>
  <div id="rooms-container">
    <div id="rooms" v-if="room.rooms">
      <div class="card brown" v-for="r in room.rooms" :key="r.number">
        <div id="number" :class="{ available: r.available }">
          {{ r.number }}
        </div>
        <div id="flex-info" v-if="!r.available && r.services">
          <div class="info">
            <img src="@/assets/img/icons/cat.svg">
            {{ r.services[0].pet.name }}
          </div>
          <div class="info">
            <img src="@/assets/img/icons/tutor.png">
            {{ r.services[0].pet.user.name }}
          </div>
          <div class="info">
            <img src="@/assets/img/icons/tel.png">
            {{ r.services[0].pet.user.phone }}
          </div>
          <div class="info">
            <img src="@/assets/img/icons/schedule.svg">
            {{ new Date(r.services[0]?.startDate).toLocaleDateString('pt-br') }} - {{ new
              Date(r.services[0]?.endDate).toLocaleDateString('pt-br') }}
          </div>
        </div>
        <p v-else id="quarto-disponivel">Quarto disponível</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoomStore } from '@/stores/RoomStore';
import { useRoom } from '../../composables/useRoom';
const { getAllRooms } = useRoom();
const room = useRoomStore();

import { useUserStore } from '@/stores/UserStore';
const user = useUserStore();

onMounted(async () => {
  await getAllRooms(user.token)
});

</script>

<style scoped lang="scss">
#rooms-container {
  padding: 2rem;

  @media screen and (min-width: 779px) {
    padding: 2rem 3rem;
  }

  #rooms {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    @media screen and (min-width: 779px) {
      gap: 2rem;
    }

    .card {
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      gap: 1.5rem;
      align-items: center;
      flex: 0 1 250px;
      margin-bottom: .5em;
      box-shadow: 1px 1px 5px #000000;
      transition: .2s;

      &:hover {
        transform: scale(1.02);
      }

      @media screen and (max-width: 464px) and (min-width: 328px) {
        flex: 1 1 100px;
        &:nth-child(3) {
          order: 4;
        }

        &:nth-child(6) {
          order: 7;
        }
      }

      img {
        max-width: 1.5rem;
      }

      &.green {
        background-color: rgba(65, 100, 74, 0.2);
      }

      &.brown {
        background-color: rgba(232, 106, 51, 0.2);
      }

      #number {
        background-color: #E86A33;
        width: 100%;
        text-align: center;
        padding: 0.5rem;
        border-radius: 10px 10px 0 0;
        color: #fff;
        font-weight: bold;
        overflow: hidden;

        &.available {
          background: var(--primary-color);
        }
      }

      #flex-info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        justify-content: center;

        .info {
          display: flex;
          align-items: center;
          gap: 1rem;
          white-space: nowrap;
        }
      }

      #quarto-disponivel {
        padding: 1rem;
      }
    }
  }
}
</style>