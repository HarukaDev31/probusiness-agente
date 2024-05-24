<template>
    <div class="file-selector_container">

        <div @click="openFileExplorer" class="w-100">
            <slot name="button">
                <div class="btn  btn-outline-secondary w-100">
                    <slot name="text">Seleccionar archivo</slot>
                </div>
            </slot>
        </div>

        <input type="file" class="d-none" ref="fileInput" :multiple="props.multiple"
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" @change="handleInputChange" />

        <div class="file-selector_drop d-flex align-items-center" @dragover.prevent @drop="handleDrop"
            v-if="props.notShowDrop">
            <div class="file-selector_drop_container d-flex  flex-column ">
                <div v-if="!files.length" class="d-flex flex-column ">
                </div>
                <div class="file-list" v-if="files.length > 0" :style="{
                    gridTemplateColumns: `repeat(${Math.min(2, files.length)}, 1fr)`,
                    gridTemplateRows: `repeat(${Math.ceil(files.length / 2)}, 1fr)`

                }">
                    <img v-for="(file, index) in files" :key="index" :src="file.iconUrl" alt="preview"
                        class="file-item" />

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, defineEmits } from 'vue'

const props = defineProps(['notShowDrop', 'value', 'multiple'])
const emit = defineEmits(['fileChange'])
const files = ref([])
const fileInput = ref(null)
const openFileExplorer = () => {
    const input = fileInput.value
    input.click()
}

const getImgUrl = (file) => URL.createObjectURL(file)

const handleDrop = (e) => {
    e.preventDefault()
    handleInputChange(e)
}

const handleInputChange = (e) => {
    const fileList = e.target.files || e.dataTransfer.files
    //check size and type of file if size is greater than 5mb or file type is not supported then return
    if (fileList.length && !validSize(fileList[0])) {
        return
    }
    if (fileList.length) {
        const validFiles = Array.from(fileList).filter(file => isValidFile(file))
        if (props.multiple) {
            //if
            validFiles.forEach(file => {

                if (isImage(file)) {

                    file.iconUrl = getImgUrl(file)
                } else {
                    file.iconUrl = getIconUrl(file.name)
                }
            })
            files.value.push(...validFiles)
            emit('fileChange', files.value)
        } else if (validFiles.length > 0) {
            const file = validFiles[0]

            if (isImage(file)) {
                file.iconUrl = getImgUrl(file)
            } else {
                file.iconUrl = getIconUrl(file.name)
            }
            files.value = [file]
            emit('fileChange', files.value[0])
        }
    }
}

const isValidFile = (file) => (isImage(file) && file.type !== 'image/svg+xml') || isSupportedFileType(file)

const isImage = (file) => file.type.split('/')[0] === 'image'

const isSupportedFileType = (file) => {
    const extension = file.name.split('.').pop().toLowerCase()
    const supportedExtensions = ["xlsx", "xls", "doc", "docx", "pdf"]
    return supportedExtensions.includes(extension)
}

const getIconUrl = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase()

    if (fileIconsUrl.hasOwnProperty(extension)) {
        return fileIconsUrl[extension]
    } else {
        return "/src/assets/defaultIcon.svg" // Icono predeterminado para tipos de archivo desconocidos
    }
}
const fileIconsUrl = {
    "xlsx": "/assets/xlsIcon.svg",
    "xls": "/assets/xlsIcon.svg",
    "doc": "/assets/docIcon.svg",
    "docx": "/assets/docIcon.svg",
    "pdf": "/assets/pdfIcon.svg",
}
const validSize = (file) => file.size <= 5 * 1024 * 1024


if (props.value) {
    files.value = Array.isArray(props.value) ? props.value : [props.value]
}
</script>
<style scoped>
.file-selector_container {
    gap: 1rem;
    width: 100%;
    max-width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 1em;
}

.file-selector_drop {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    min-height: 100px;
    height: 100%;
    border-radius: 10px;
}

.file-selector_drop_container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.file-selector__icon {
    width: 100px;
    height: 100px;
    margin: 0 auto;
}

.file-list {
    display: grid;
    gap: 1rem;
    width: 95%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    align-items: center;
}

.file-item {
    flex: 1;
    /* Cada imagen ocupará una fracción igual del contenedor */
    margin: 5px;
    /* Ajusta el margen según sea necesario */
    max-width: 100%;
    /* Cada imagen no superará el ancho del contenedor */
    object-fit: contain;
    /* La imagen se ajustará manteniendo su relación de aspecto */
}

.file-selector__label {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
}
</style>
