<template>
    <div class="customized-input d-flex flex-column">
        <span class="fw-bold ">{{ props.text }} <span v-if="!props.optionalText" class="text-danger">*</span></span>
        <div class="w-100 d-flex flex-row gap-1 align-items-center">
            <input :type="props.type" class="customized-input__input" :key="props.keyRender"
                :placeholder="props.optionalText ? 'Opcional' : 'Ingresar'" v-model="inputValue" @input="emitInput" />
            <!-- if prepend is object props.prepend.icon -->
                <i v-if="props.prepend" :class="props.prepend.icon" id="prepend-icon" @click="()=>props.prepend.action(inputValue)"></i>
        </div>
        <span v-if="props.isError" class="text-danger">Este campo es obligatorio</span>
    </div>
</template>

<script setup>
import { ref,watch } from 'vue'

const props = defineProps(['text', 'optionalText', 'type', 'value', 'validate', 'isError', 'prepend','keyRender'])
const emit = defineEmits(['input'])
const inputValue = ref("")
//watch keyRender to update inputValue
watch(() => props.keyRender, () => {
    inputValue.value = props.value
})
const isError = ref(false)
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
    width: 100%;
}#prepend-icon:hover {
    cursor: pointer;
    color: #007bff;
}
</style>
