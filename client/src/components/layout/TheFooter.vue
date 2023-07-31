<template>
    <footer>
        <span id="direitos">Todos os direitos reservados &copy; {{ year }}</span>
    </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<style scoped lang="scss">
footer {
    background: var(--primary-color);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80px;
    padding: 0 2rem;

    @media screen and (min-width: 779px) {
        padding: 0 5rem;
    }

    span#direitos {
        color: #ffffff;
    }
}
</style>