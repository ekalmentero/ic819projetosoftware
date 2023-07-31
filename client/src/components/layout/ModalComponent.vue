<template>
    <div id="modal-container" @click="$emit('fechaModal')" v-if="modalActive"></div>
    <Transition name="fade">
        <div id="modal" v-if="modalActive">
            <button id="closeModal" @click="$emit('fechaModal')" v-if="isCloseButtonActive">+</button>
            <slot></slot>
        </div>
    </Transition>
</template>

<script setup lang="ts">

defineEmits(['fechaModal'])

defineProps({
    modalActive: Boolean,
    isCloseButtonActive: Boolean,
})
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-100px);
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    transform: translateX(0);
}

#modal-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    background: rgba($color: #000000, $alpha: 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    overflow: hidden;
}

#closeModal {
    z-index: 102;
    position: absolute;
    top: 0;
    right: 15px;
    font-size: 30px;
    color: #000000;
    background: transparent;
    transform: rotate(45deg);
}

#modal {
    position: absolute;
    box-shadow: 1px 1px 5px #000;
    z-index: 101;
    border-radius: 5px;
    top: -50px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    width: 90%;

    @media screen and (min-width: 998px) {
        width: 50%;
    }
}
</style>