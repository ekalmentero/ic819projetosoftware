<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="loading-container">
        <v-progress-circular model-value="40" color="#38d386" size="50" width="5" indeterminate></v-progress-circular>
    </div>
</template>

<style scoped>
.loading-container {
    display: flex;
    justify-content: center;
}
</style>
