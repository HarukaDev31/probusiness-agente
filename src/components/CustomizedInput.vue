<template>
  <div class="customized-input d-flex flex-column">
    <!-- <span class="fw-bold ">{{ props.text }} <span v-if="!props.optionalText" class="text-danger">*</span></span> -->
    <select
      v-if="props.options && props.type == 'select'"
      class="customized-select"
      @change="selectOption($event.target.value)"
    >
      <option
        v-for="(option, index) in props.options"
        :key="index"
        :value="option.value"
        :selected="option.selected"
        @change="selectOption(option.value)"
      >
        {{ option.text }}
      </option>
    </select>
    <div
      v-else
      class="w-100 d-flex flex-column gap align-items-center"
      style="position: relative"
    >
      <label class="w-100 mb-1 epilogue-regular" v-if="props.type == 'number'">
        {{ props.text
        }}<label class="text-danger" v-if="!props.optionalText">*</label>
      </label>
      <div class="w-100 d-flex flex-row gap align-items-center">
        <span
          v-if="props.showActions"
          class="input-actions epilogue-regular"
          @click="() => (inputValue > 1 ? inputValue-- : (inputValue = 1))"
          >-</span
        >
        <div class="text-area w-100" v-if="props.type == 'textarea'">
          <div class="info-tooltip epilogue-regular" style="display: none">
            <p>Ingresa información específica del uso de producto, ejemplo:</p>
            <ul>
              <li>Medidas alto 23 cm x 55 m de ancho</li>
              <li>Uso para viajes</li>
              <li>Protección etc.</li>
            </ul>
          </div>
          <textarea
            :placeholder="getPlaceHolder(props)"
            v-model="inputValue"
            @input="emitInput"
            class="customized-input__input epilogue-regular"
            :style="props.isError ? 'border-color:red' : ''"
          ></textarea>
          <svg
            class="info-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="8"
              cy="8"
              r="7.71429"
              fill="white"
              stroke="#FF500B"
              stroke-width="0.571429"
            />
            <path
              d="M6.65756 12.5714V11.9857L7.8147 11.7857V6.69998L6.67185 6.49998V5.91427L8.64328 5.51427L8.98613 5.64284V11.7857L10.1004 11.9857V12.5714H6.65756ZM8.24328 4.45713C8.00518 4.45713 7.80994 4.37617 7.65756 4.21427C7.5147 4.04284 7.44328 3.82855 7.44328 3.57141C7.44328 3.32379 7.52423 3.10474 7.68613 2.91427C7.84804 2.72379 8.05756 2.62855 8.3147 2.62855C8.5528 2.62855 8.74328 2.70474 8.88613 2.85713C9.03851 2.99998 9.1147 3.20951 9.1147 3.4857C9.1147 3.74284 9.03851 3.97141 8.88613 4.17141C8.73375 4.36189 8.51947 4.45713 8.24328 4.45713Z"
              fill="#FF500B"
            />
          </svg>
        </div>
        <input
          v-else
          :class="props.type == 'number' ? 'input-actions' : ''"
          :type="props.type"
          class="customized-input__input epilogue-regular"
          :key="props.keyRender"
          :placeholder="getPlaceHolder(props)"
          v-model="inputValue"
          @input="emitInput"
          :style="props.options ? 'border-radius:0px' : ''"
        />
        <span
          v-if="props.showActions && props.type != 'textarea'"
          class="input-actions"
          @click="() => inputValue++"
        >
          +</span
        >
      </div>

      <div v-if="props.options" class="selector">
        {{ props.options }}
        <span
          v-for="(option, index) in props.options"
          :key="index"
          :style="
            option.value == selected || option.selected == true
              ? 'background-color:red;color:white'
              : ''
          "
          class="options"
          @click="selectOption(option.value)"
          >{{ option.text }}
        </span>
      </div>
      <i
        v-if="props.prepend"
        :class="props.prepend.icon"
        id="prepend-icon"
        @click="() => props.prepend.action(inputValue)"
      ></i>
    </div>
    <small v-if="props.isError" class="text-danger epilogue-light">{{
      props.errorText ? props.errorText : "Este campo es obligatorio"
    }}</small>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
const showInfo = ref(false);
const props = defineProps([
  "text",
  "optionalText",
  "type",
  "value",
  "validate",
  "isError",
  "prepend",
  "keyRender",
  "options",
  "errorText",
  "showActions",
]);
const emit = defineEmits(["input", "select"]);
const inputValue = ref(props.value);
//watch keyRender to update inputValue
watch(
  () => props.keyRender,
  () => {
    inputValue.value = props.value;
  }
);

const isError = ref(false);
const selected = ref(null);
const getPlaceHolder = (props) => {
  if (props.type == "number") {
    return "";
  }
  if (props.optionalText) {
    return `${props.text} (Opcional)`;
  }
  return props.text + "*";
};
const emitInput = () => {
  console.log(inputValue.value);
  emit("input", inputValue.value);
};
const selectOption = (value) => {
    console.log(value,"selected");
  if (selected.value == value) {
    selected.value = null;
  } else {
    selected.value = value;
  }
  emit("select", value);
};
onMounted(() => {
  const inputTooltip = document.querySelector(".info-tooltip");
  const infoIcon = document.querySelector(".info-icon");
  if (infoIcon) {
    infoIcon.addEventListener("mouseover", () => {
      inputTooltip.style.display = "block";
    });
    infoIcon.addEventListener("mouseout", () => {
      inputTooltip.style.display = "none";
    });
  }
});
</script>

<style scoped>
.options {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-left: 0;
  background-color: transparent;
  display: flex;
}

.selector {
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
}

.input-actions {
  border: 1px solid #ccc !important;
  text-align: center;
}

span {
  padding: 0.5em 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

span:hover {
  background-color: #ccc;
}

#prepend-icon {
  position: absolute;
  right: 1em;
  top: 0.5em;
}

#prepend-icon:hover {
  cursor: pointer;
  color: #007bff;
}

span,
label,
input {
  color: #7e7e7e;
}

.text-area {
  position: relative;
}

.text-area svg {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
}
.text-area svg:hover {
  cursor: pointer;
}
.info-tooltip {
  position: absolute;
  top: calc(100% - 280px);
  right: 0;
  background-color: white;
  height: 200px;
  width: 300px;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  z-index: 100;
  color: #7e7e7e;
}

.info-tooltip::before,
.info-tooltip::after {
  content: "";
  position: absolute;
  bottom: -25px;
  right: 0;
  border-style: solid;
}

.info-tooltip::before {
  border-width: 25px 0 0 39px;
  border-color: #ccc transparent transparent transparent;
}

.info-tooltip::after {
  bottom: -24px;
  right: 1px;
  border-width: 24px 0 0 34px;
  border-color: white transparent transparent transparent;
}.customized-select{
    padding: 0.5rem;
    border-radius: 5px;
    background-color: transparent;
    width: 100%;
    border: none;
    border-bottom: 1px solid #ccc;
    position: relative;
    color: #7e7e7e;
}
</style>
