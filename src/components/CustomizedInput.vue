<template>
    <div class="customized-input d-flex flex-column">
        <span class="fw-bold ">{{ props.text }} <span v-if="!props.optionalText" class="text-danger">*</span></span>
        
        <div class="w-100 d-flex flex-row gap align-items-center" >
            <input :type="props.type" class="customized-input__input" :key="props.keyRender"
                :placeholder="props.optionalText ? 'Opcional' : 'Ingresar'" v-model="inputValue" @input="emitInput"
                :style="props.options?'border-radius:0px':''" />
            <!-- if prepend is object props.prepend.icon -->
            <div v-if="props.options" class="selector">
                
            <span v-for="(option,index) in props.options" :style="option.value==selected||option.selected==true?'background-color:red;color:white':''" class="options" @click="selectOption(option.value)">{{ option.text}} 

            </span>
        </div>
            <i v-if="props.prepend" :class="props.prepend.icon" id="prepend-icon"
                @click="() => props.prepend.action(inputValue)"></i>
        </div>
        <small v-if="props.isError" class="text-danger">{{props.errorMessage?props.errorMessage:'Este campo es obligatorio'}}</small>
    </div>
</template>

<script setup>
import { ref, watch,computed } from 'vue'

const props = defineProps(['text', 'optionalText', 'type', 'value', 'validate', 'isError', 'prepend', 'keyRender', 'options','errorMessage'])
const emit = defineEmits(['input','select'])
const inputValue = ref(props.value)
//watch keyRender to update inputValue
watch(() => props.keyRender, () => {
    inputValue.value = props.value
    
})
const isError = ref(false)
const selected=ref(null)
const emitInput = () => {

    emit('input', inputValue.value)

}
const selectOption=(value)=>{
    console.log(value)
    if(selected.value==value){
        selected.value=null

    }else{
        selected.value=value

    }
    emit('select',value)

}
</script>

<style scoped>
.options{
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-left: 0;
    background-color: transparent;
    display: flex;
}.selector{
    display: flex;
    flex-direction: row;
}
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
}

#prepend-icon:hover {
    cursor: pointer;
    color: #007bff;
}
</style>
