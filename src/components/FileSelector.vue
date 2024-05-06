<template>
    <div class="file-selector_container">
        <customized-button @click="openFileExplorer">
            <template #text>Seleccionar archivo</template>
        </customized-button>
        <input type="file" class="d-none" @change="onFileChange" accept="image/*" />

        <div class="file-selector_drop d-flex align-items-center" @dragover.prevent @drop="handleDrop"
            v-if="props.notshowDrop">
            <div class="file-selector_drop_container d-flex  flex-column ">
                <div v-if="!file" class="d-flex flex-column ">
                    <label for="file" class="file-selector__label">Arrastre y suelte una imagen aquí</label>
                    <img src="/src/assets/upload-items.svg" alt="upload" class="file-selector__icon" />
                </div>
                <img v-if="file" :src="getImgUrl(file)" alt="preview" class="file-view" />


            </div>
        </div>
    </div>
</template>
<script setup>
import CustomizedButton from './CustomizedButton.vue'
import { ref } from 'vue'
const props = defineProps(['notShowDrop'])
console.log(props)
const file = ref(null)
const onFileChange = (e) => {
    const files = e.target.files || e.dataTransfer.files
    if (!isImage(files[0])) return
    if (!files.length) return
    file.value = files[0]
}
const openFileExplorer = () => {
    const input = document.querySelector('input[type="file"]')
    input.click()

}
const getImgUrl = (file) => {
    return URL.createObjectURL(file)
}
const handleDrop = (e) => {
    e.preventDefault()
    onFileChange(e)

}
const isImage = (file) => {
    const fileType = file.type.split('/')[0];
    return fileType === 'image';
}
</script>
<style scoped>
.file-selector_container {
    gap: 1rem;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    row-gap: 1em;
}

.file-selector_drop {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    min-height: 400px;
    border: 2px dashed #ccc;
    border-radius: 10px;
}

.file-selector__icon {
    width: 100px;
    height: 100px;
    margin: 0 auto;
}

.file-view {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;

}
</style>