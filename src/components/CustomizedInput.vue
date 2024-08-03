<template>
    <div class="customized-input d-flex flex-column" >
        <!-- <span class="fw-bold ">{{ props.text }} <span v-if="!props.optionalText" class="text-danger">*</span></span> -->
        
        <div class="w-100 d-flex flex-column gap align-items-center" style="position: relative;" >
            <label class="w-100 mb-1 epilogue-regular" v-if="props.type=='number'">
                {{ props.text }}<label class="text-danger" v-if="!props.optionalText">*</label>
            </label>
            <div class="w-100 d-flex flex-row gap align-items-center">
                <span v-if="props.showActions" class="input-actions epilogue-regular"
                @click="() => inputValue>1?inputValue--:inputValue=1">-</span>

            <input
            :class="props.type=='number'?'input-actions':''"
            :type="props.type" class="customized-input__input epilogue-regular" :key="props.keyRender"
                :placeholder="getPlaceHolder(props)" v-model="inputValue" @input="emitInput"
                :style="props.options?'border-radius:0px':''" />
            <span v-if="props.showActions" class="input-actions "
            @click="()=>inputValue++
            "> +</span>
            </div>

            <!-- if prepend is object props.prepend.icon -->
            <div v-if="props.options" class="selector">
                
            <span v-for="(option,index) in props.options" :style="option.value==selected||option.selected==true?'background-color:red;color:white':''" class="options" @click="selectOption(option.value)">{{ option.text}} 

            </span>
        </div>
            <i v-if="props.prepend" :class="props.prepend.icon" id="prepend-icon"
                @click="() => props.prepend.action(inputValue)"></i>
        </div>
        <small v-if="props.isError" class="text-danger epilogue-light">{{props.errorText?props.errorText:'Este campo es obligatorio'}}</small>
    </div>
</template>

<script setup>
import { ref, watch,computed } from 'vue'

const props = defineProps(['text', 'optionalText', 'type', 'value', 'validate', 'isError', 'prepend', 'keyRender', 'options','errorText','showActions'])
const emit = defineEmits(['input','select'])
const inputValue = ref(props.value)
//watch keyRender to update inputValue
watch(() => props.keyRender, () => {
    inputValue.value = props.value
    
})

const isError = ref(false)
const selected=ref(null)
const getPlaceHolder=(props)=>{

    if (props.type == 'number') {
        return ''
    }
    if(props.optionalText){
        return `${props.text} (Opcional)`
    }
    return props.text+'*'
}
const emitInput = () => {

    emit('input', inputValue.value)

}
const selectOption=(value)=>{
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
    margin-bottom: 1em;
    margin-top: 1em;
}

.customized-input__input {
    padding: 0.5rem;
    border-radius: 5px;
    background-color: transparent;
    width: 100%;
    border: none;
    border-bottom: 1px solid #ccc;
    position: relative;
}.input-actions{
    border: 1px solid #ccc!important;
} span{
    padding: 0.5em 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
span:hover{
    background-color: #ccc;
}
#prepend-icon{
    position: absolute;
    right: 1em;
    top:0.5em
}
#prepend-icon:hover {
    cursor: pointer;
    color: #007bff;
    
}span,label,input{
    color:#7E7E7E;
}
</style>
