<template>
  <TheLoading v-if="serviceLoading" />
  <v-table fixed-header height="90vh" id="services-table" v-else>
    <thead>
      <tr>
        <th class="text-center">
          Código da Reserva
        </th>
        <th class="text-center">
          CPF do cliente
        </th>
        <th class="text-center">
          Quarto
        </th>
        <th class="text-center">
          Check-in
        </th>
        <th class="text-center">
          Check-out
        </th>
        <th class="text-center">
          Confirmar
        </th>
        <th class="text-center">
          Finalizar
        </th>
      </tr>
    </thead>
    <tbody v-if="service.services">
      <tr v-for="item in service.services" :key="item.id">
        <td>#{{ item.id }}</td>
        <td>{{ item?.pet?.user?.cpf }}</td>
        <td>{{ item.roomNumber }}</td>
        <td>{{ new Date(item.startDate).toLocaleDateString('pt-br') }}</td>
        <td>{{ new Date(item.endDate).toLocaleDateString('pt-br') }}</td>
        <td v-if="item?.room?.available && !item?.finished"><Button @click="confirm(item.id)" text="Confirmar check-in" theme="primary" id="confirmar"/></td>
        <td v-else-if="!item?.room?.available && !item?.finished"><span>Quarto indisponível</span></td>
        <td v-else-if="item?.finished"><span>Serviço finalizado</span></td>
        <td v-if="!item?.finished"><Button @click="finish(item.id)" text="Finalizar serviço" theme="primary" id="finalizar" /></td>
        <td v-else><span>Serviço finalizado</span></td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useService } from '../../composables/useService';
import { useServiceStore } from '../../stores/ServiceStore';
import TheLoading from '../../components/layout/TheLoading.vue';
import Button from '../layout/TheButton.vue';
const service = useServiceStore();
const { getAllServices, confirmCheckIn, finishService, serviceLoading } = useService();

import { useUserStore } from '@/stores/UserStore';
const user = useUserStore();

const confirm = async (serviceId: number) => {
  await confirmCheckIn(serviceId, user.token);
}

const finish = async (serviceId: number) => {
  await finishService(serviceId, user.token);
}

onMounted(async () => {
  await getAllServices(user.token);
});
</script>

<style scoped lang="scss">
#services-table {
  border-radius: 5px;
}

label {
  display: flex;
  gap: .5rem;
  border-radius: 5px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);

  input {
    border: none;
    height: 2.5rem;
    padding: 0 1rem;
    color: #222;
    font-size: 1rem;
    outline: none;

    &:focus {
      border: 2px solid var(--primary-color);
    }
  }

  button {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    border-left: 1px solid #000;

    img {
      max-width: 1.5rem;
    }
  }
}


thead,
th {
  background-color: #E86A33 !important;
  color: #fff !important;
}

tr:nth-child(even) {
  background-color: rgba(232, 106, 51, 0.5);
}

td {
  #finalizar {
    background-color: var(--error-color);
  }
}

@media screen and (min-width: 779px) {

  thead,
  th,
  tr {
    margin: 0 auto;
    width: 12.5rem;
    text-align: center;
  }
}
</style>