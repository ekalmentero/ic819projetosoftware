<template>
   <div id="container">
      <TheLoading v-if="loading"></TheLoading>
      <form v-else-if="room.rooms && pet?.pets && user.user">
         <span class="hotel">Puppy Resort - <span class="cidade">Rio de Janeiro</span></span>
         <br>
         <br>
         <div class="quarto">
            <p><span>{{ precoFormatter(valorDiario) }}</span> / diária</p>
            <select name="room" id="room" v-model="roomNumber">
               <option :value="r.room" v-for="r in room.rooms" :key="r.room">Quarto {{ r.room }}</option>
            </select>
         </div>
         <div class="quantidade">
            <label>Qual pet?
               <select name="qtd" id="qtd" v-model="petId">
                  <option :value="p.id" v-for="p in pet?.pets" :key="p.id">{{ p.name }}</option>
               </select>
            </label>
         </div>
         <div class="check-in-out">
            <label>Check-in
               <select name="" id="" v-model="checkIn">
                  <option :value="dia" v-for="dia in datasHabilitadasParaCheckIn" :key="dia.getTime()"> {{
                     dataFormatter(dia) }}</option>
               </select>
            </label>
            <label>Check-out
               <select name="" id="" v-model="checkOut">
                  <option :value="dia" v-for="dia in datasHabilitadasParaCheckOut" :key="dia.getTime()"> {{
                     dataFormatter(dia) }}</option>
               </select>
            </label>
         </div>
         <small>* As datas que não aparecem já estão reservadas para este quarto. Nossos check-in e check-out são
            realizados às 09h da manhã.</small>
         <hr>
         <div class="valores">
            <p v-if="checkIn && checkOut"> {{ precoFormatter(valorDiario) }} x {{ quantidadeDeDias }} diárias</p>
            <p v-if="checkIn && checkOut" class="valor-total">Total: <span>{{ precoFormatter(total) }}</span></p>
         </div>
         <span v-if="error" class="error">{{ error }}</span>
         <Button text="Agendar" theme="primary" id="agendar" @click.prevent="handleAgendar"></Button>
      </form>
      <CadastroPetModal :modalActive="modalActive" @fechaModal="fechaModal"></CadastroPetModal>
   </div>
</template>

<script setup lang="ts">
import Button from '@/components/layout/TheButton.vue';
import { computed, onMounted, ref, watch } from 'vue'
import CadastroPetModal from '@/components/schedule/CadastroPetModal.vue';
import TheLoading from '@/components/layout/TheLoading.vue';

// Pets
import { usePetStore } from '@/stores/PetStore'
import { usePet } from '@/composables/usePet';
const pet = usePetStore();
const { myPets } = usePet();

// Quartos e serviços
import { useRoomStore } from '@/stores/RoomStore';
import { useService } from '@/composables/useService';
import { useRoom } from '@/composables/useRoom';
import router from '@/router';
const room = useRoomStore()
const { schedule, error, serviceLoading } = useService()
const { getAvailableRooms } = useRoom()

import { useUserStore } from '@/stores/UserStore';
const user = useUserStore();

const valorDiario = ref(70);
const checkIn = ref('');
const checkOut = ref('');
const petId = ref(0);
const roomNumber = ref(0);
const loading = ref(false);

watch(checkIn, () => {
   checkOut.value = '';
   error.value = '';
})

watch(checkOut, () => {
   error.value = '';
})

watch(roomNumber, () => {
   checkIn.value = '';
   checkOut.value = '';
   error.value = ''; 
})

const fechaModal = () => {
   if (pet?.pets?.length) {
      modalActive.value = false;
   }
}

const abreModal = () => {
   modalActive.value = true;
}

const handleAgendar = async () => {
   if (!pet?.pets?.length) {
      abreModal()
      return;
   }

   if (!petId.value) {
      error.value = 'Selecione o pet que será hospedado.'
      return;
   }

   if (!checkIn.value || !checkOut.value) {
      error.value = 'Selecione as datas de check-in e check-out para prosseguir.'
      return;
   }

   loading.value = true;

   await schedule(checkIn.value, checkOut.value, petId.value, roomNumber.value, user.token);

   loading.value = false;

   if (!error.value) {
      router.push('pagamento')
   }
}

const modalActive = ref(false)

const quantidadeDeDias = computed(() => {
   const umDiaEmMilissegundos = 24 * 60 * 60 * 1000;
   const data1SemHora = new Date(checkOut.value);
   data1SemHora.setUTCHours(9, 0, 0, 0);
   const data2SemHora = new Date(checkIn.value);
   data2SemHora.setUTCHours(9, 0, 0, 0);
   const diferencaEmMilissegundos = Math.abs(data1SemHora.getTime() - data2SemHora.getTime());
   const diferencaEmDias = Math.round(diferencaEmMilissegundos / umDiaEmMilissegundos);
   return diferencaEmDias;
})

const total = computed(() => {
   return quantidadeDeDias.value * 70;
})

const datasHabilitadasParaCheckIn = computed(() => {
   const quarto = room.rooms.find(r => r.room == roomNumber.value);
   const diasNaoHabilitados = quarto?.notAvailableAt
   const hoje = new Date();
   const diasProximos = [];

   //odeio usar data em js ODEIOOOOOOO
   let i = 1;
   while (diasProximos.length < 30) {
      const data = new Date(hoje.getTime() + i * 24 * 60 * 60 * 1000);
      data.setUTCHours(9, 0, 0, 0);
      if (diasNaoHabilitados?.some(dia => {
         let diaObjeto = new Date(new Date(dia).getTime() + 24 * 60 * 60 * 1000);
         diaObjeto.setUTCHours(9, 0, 0, 0);
         return diaObjeto.getTime() === data.getTime();
      })) {
         i++;
         continue;
      }
      diasProximos.push(data);
      i++;
   }
   return diasProximos;
})

const datasHabilitadasParaCheckOut = computed(() => {
   if (checkIn.value) {
      const diasProximos = []
      const quarto = room.rooms.find(r => r.room == roomNumber.value);
      const diasNaoHabilitados = quarto?.notAvailableAt

      //vc tb odeia datas em js? [ X ] SIM QUE INFERNO PREFIRO JAVA   [ ] tranquilo de usar para de graça
      let i = 1;
      while (diasProximos.length < 30) {
         const data = new Date(new Date(checkIn.value).getTime() + i * 24 * 60 * 60 * 1000);
         data.setUTCHours(9, 0, 0, 0);
         if (diasNaoHabilitados?.some(dia => {
            let diaObjeto = new Date(new Date(dia).getTime() + 24 * 60 * 60 * 1000);
            diaObjeto.setUTCHours(9, 0, 0, 0);
            return diaObjeto.getTime() === data.getTime();
         })) {
            i++;
            break;
         }
         diasProximos.push(data);
         i++;
      }
      return diasProximos;
   }
   return null;
});

const dataFormatter = (data: Date) => {
   const dia = data.getDate();
   const mes = data.toLocaleString('pt-br', { month: 'long' });
   const diaDaSemana = data.toLocaleString('pt-br', { weekday: 'short' });
   return `${dia} de ${mes} - ${diaDaSemana}`;
}

const precoFormatter = (preco: number) => {
   return preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).replace(/\s/g, '');
}

onMounted(async () => {
   loading.value = true;
   await myPets(user.token)
   await getAvailableRooms(user.token)
   loading.value = false;

   if (!pet?.pets?.length) {
      abreModal()
      return;
   }
   roomNumber.value = room?.rooms[0].room ?? 0;
   petId.value = pet.pets[0].id ?? 0;
});
</script>

<style scoped lang="scss">
#container {
   align-items: center;
   display: flex;
   min-height: 90vh;
   justify-content: center;
   padding: 3rem 2rem 8rem;
   background-image: url("@/assets/img/paw_print3.svg");
   background-repeat: repeat-x;
   position: relative;

   form {
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

      .hotel {
         font-weight: bold;
         color: #333333;

         .cidade {
            font-weight: bold;
            text-transform: uppercase;
            color: #333333;
         }
      }

      select {
         cursor: pointer;
         background: #fff;
         outline: none;
         padding: 10px;
         border-radius: 5px;
         border: 1px solid #777;
      }

      @media screen and (min-width: 998px) {
         min-width: 40%;
         max-width: 40%;
      }

      .quarto {
         display: flex;
         justify-content: space-between;

         p {
            span {
               color: var(--primary-color);
               font-size: 20px;
               font-weight: bold;
            }
         }
      }

      .quantidade {
         display: flex;
         align-items: flex-start;
         flex-direction: column;
         gap: 1rem;

         label {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: .4rem;
         }
      }

      .check-in-out {
         display: flex;
         flex-direction: column;
         align-items: flex-start;
         justify-content: center;
         margin-bottom: 1rem;
         gap: 1rem;

         @media screen and (min-width: 998px) {
            flex-direction: row;
         }

         label {
            display: flex;
            flex-direction: column;
            gap: .5rem;
            width: 100%;
         }
      }

      .valores {
         display: flex;
         flex-direction: column;
         gap: .5rem;

         .valor-total {
            span {
               font-size: 20px;
               font-weight: bold;
            }
         }
      }

      .space {
         justify-content: space-between;

         #diaria {
            font-weight: 600;
         }
      }

      input {
         background-color: #F8F9F9;
         border: none;
         border-radius: 5px;
         height: 2.5rem;
         padding: 0 1rem;
         color: #222;
         font-size: 1rem;
         outline: none;

         &[type="date"] {
            display: block;
         }

         &:focus {
            border: 2px solid var(--primary-color);
         }
      }

      #agendar {
         margin-top: 1rem;
      }
   }

   span.error {
      color: var(--error-color);;
      margin-bottom: 1rem;
   }

   span.success {
      color: var(--primary-color);
      margin-bottom: 1rem;
   }
}
</style>