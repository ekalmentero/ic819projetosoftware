<template>
    <div id="home">
        <TheLoading v-if="loading"></TheLoading>
        <div v-else>
            <BannerComponent></BannerComponent>
            <ServicesComponent></ServicesComponent>
            <RateComponent></RateComponent>
            <InfoComponent></InfoComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import BannerComponent from '@/components/home/BannerComponent.vue';
import ServicesComponent from '@/components/home/ServicesComponent.vue';
import RateComponent from '@/components/home/RateComponent.vue';
import InfoComponent from '@/components/home/InfoComponent.vue';
import TheLoading from '@/components/layout/TheLoading.vue';
import { onMounted, ref } from 'vue';

const loading = ref(false);
onMounted(() => {
    loading.value = true;
    setTimeout(()=> {
        loading.value = false;
    }, 500)
})
</script>

<style scoped lang="scss">
#home {
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>