<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <button :class="theme">{{ text }}</button>
</template>

<script setup lang="ts">
defineProps({
    text: String,
    theme: String,
})
</script>

<style scoped lang="scss">
button {
    padding: .5rem 1rem;
    font-size: 1rem;
    box-shadow: 1px 1px 5px #000000;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .2s linear;
    border: none;
    outline: none;

    &:hover {
        transform: scale(1.02);
    }

    &.primary {
        background-color: var(--primary-color);
        color: #ffffff;
    }

    &.secondary {
        background: #ffffff;
        box-shadow: 2px 2px 10px rgba($color: #000000, $alpha: .8);
        color: #222222;
    }
}
</style>