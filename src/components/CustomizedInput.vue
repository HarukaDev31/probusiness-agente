<template>
    <div class="customized-input d-flex flex-column">
        <span class="fw-bold">{{ props.text }} <span v-if="!props.optionalText">*</span></span>
        <input :type="props.type" class="customized-input__input" :placeholder="props.optionalText?'Opcional':'Ingresar'" v-model="inputValue" @input="emitInput" />
    </div>
</template>

<script setup>
import {  ref  } from 'vue'

const props = defineProps(['text', 'optionalText', 'type', 'value',])
const emit = defineEmits(['input'])

const inputValue = ref(props.value)

const emitInput = () => {
    emit('input', inputValue.value)
}
</script>

<style scoped>
.customized-input {
    width: 95%;
    display: flex;
    flex-direction: column;
    padding: 0.5em 0;
}
.customized-input__input {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: transparent;
}
</style>
