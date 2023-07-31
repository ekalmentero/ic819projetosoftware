<template>
  <div id="services-container">
    <h1>Minhas reservas</h1>
    <div id="services" v-if="service?.services?.length">
      <div class="card" :class="{finished: svc.finished}" v-for="svc in service.services" :key="svc.id">
        <div id="number">
          {{ svc.finished ? 'Finalizada' : 'Atual' }}
        </div>
        <div id="flex-info">
          <div class="info">
            <img v-if="svc.pet.species === 'cat'" src="@/assets/img/icons/cat.svg">
            <img v-else src="@/assets/img/icons/dog.svg">
            <p>
              {{ svc.pet.name }}
            </p>
          </div>
          <div class="info">
            <img src="@/assets/img/icons/schedule.svg">
            <p>
              {{ new Date(svc.startDate).toLocaleDateString('pt-br') }} - {{ new Date(svc.endDate).toLocaleDateString('pt-br') }}
            </p>
          </div>
          <div class="info">
            <img src="@/assets/img/icons/dinheiro.svg">
            <p>R$ {{ svc.value }}</p>
          </div>
          <!-- <Button text="Fazer avaliação" theme="primary" id="avaliar"></Button> -->
        </div>
      </div>
    </div>
    <div v-else class="nao-possui">
      <h3>Você ainda não possui nenhuma reserva</h3>
      <Button text="Quero fazer uma reserva" theme="primary" @click="$router.push('/agendamento')"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from '@/components/layout/TheButton.vue';
import { useService } from '@/composables/useService';
import { useUserStore } from '@/stores/UserStore';
import { useServiceStore } from '@/stores/ServiceStore';
const service = useServiceStore()
const user = useUserStore();
const { getMyServices } = useService();

onMounted(async () => {
  try {
    await getMyServices(user.token);
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped lang="scss">
#services-container {
  padding: 2rem;
  margin-bottom: 450px;
  text-align: center;
  h1 {
    margin-bottom: 2rem;
  }

  @media screen and (min-width: 779px) {
    padding: 2rem 3rem;
  }

  #services {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;

    @media screen and (min-width: 779px) {
      gap: 2rem;
      justify-content: flex-start;
    }

    .card {
      display: flex;
      flex-direction: column;
      border-radius: 5px;
      gap: 1.5rem;
      margin-bottom: 1rem;
      align-items: center;
      flex: 0 1 100px;
      box-shadow: 1px 1px 5px #000000;
      transition: .2s;
      background-color: rgba(232, 106, 51, 0.2);

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

      img {
        max-width: 1.5rem;
      }
      #number {
        width: 100%;
        text-align: center;
        padding: 0.5rem;
        border-radius: 5px 5px 0 0;
        color: #fff;
        font-weight: bold;
        overflow: hidden;
        background: var(--primary-color);
      }

      &.finished {
        #number {
          background-color: #E86A33;
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
    }
  }

  .nao-possui {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    button {
      width: 100%;
      max-width: 400px;
    }
  }
}
</style>