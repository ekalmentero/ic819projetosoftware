<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';

import { useUserStore } from '@/stores/UserStore';
const user = useUserStore();

import useLocalStorage from '@/composables/useLocalStorage';
const {getFromLocalStorage} = useLocalStorage();

import { storeToRefs } from 'pinia';
const {isAuthenticated} = storeToRefs(user);

user.loadToken();
user.loadUser();

</script>

<template>
  <TheHeader class="header" :isAuthenticated="isAuthenticated"/>
  <RouterView/>
  <TheFooter />
</template>

<style scoped lang="scss">
</style>
