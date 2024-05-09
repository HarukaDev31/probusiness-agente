<template>
    <div class="card-container">    
        <div v-if="$slots.header" :class="{ 'header': $slots.header, }" :style='{
            background: props.background
        }'>
      <!-- Aquí se insertará el contenido del slot "header" -->
      <slot name="header" ></slot>
    </div>
        <div :class="{ 'body': $slots.body }" >
            <slot name="body"></slot>
        </div>
    </div>   
</template>
<script setup>
const props = defineProps(['background'])
</script>
<style scoped>
.card-container{
    display:flex;
    flex-direction: column;
    gap: 1rem;
}
.header{
    padding: 1rem;
    border-radius: 1em;    
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    height: 100%;
}
</style>