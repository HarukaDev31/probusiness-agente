<template>
  <!--<file-selector />-->
  <!-- <customized-input :text="'waos'" :optionalText="true" :type="'text'"/> -->
  <div class="main-container">
    <div id="first-row" class="d-flex flex-column flex-md-row gap-4">
      <div id="card-cliente">
        <h1>Cliente</h1>
        <card>
          <template #body>
            <!--Customized input with index pair-->
            <customized-input v-for="(input, index) in formValuesComputedPair" :key="index" :text="input.text"
              :optionalText="input.optionalText" :type="input.type" @input="(e) => input.value = e" />
          </template>
        </card>
      </div>
      <div id="card-empresa">
        <h1>Empresa</h1>
        <card>
          <template #body>
            <customized-input v-for="(input, index) in formValuesComputedOdd" :key="index" :text="input.text"
              :optionalText="input.optionalText" :type="input.type" @input="(e) => input.value = e" />
          </template>
        </card>
      </div>
    </div>
    <div id="second-row">
      <div class="proveedores-container d-flex flex-column mt-3 align-items-center">
        <h1>Proveedores</h1>
        <customized-button @click="addNewSupplier">
          <template #text>Agregar Proveedor</template>
        </customized-button>
        <div id="suppliers-list" class="mt-3"v-if="suppliers.length!=0">
          <card v-for="(supplier,supplierIndex) in suppliers" :key="supplierIndex" class="my-3" :background="currentSupplier!=supplierIndex+1?'#21618C':'white'">
            <template #header>
              <div class="supplier-header d-flex flex-column flex-lg-row" @click="currentSupplier!=supplierIndex+1?changeCurrentSupplier(supplierIndex+1):''">
                <h2 class="w-100">Proveedor {{supplierIndex+1}}</h2>
                <div class="supplier-indicators d-flex flex-column flex-md-row gap-4">
                  <div class="supplier-indicator " v-for="(indicator,index) in indicators" :key="indicator.key" v-if="currentSupplier==supplierIndex+1">
                    <customized-input :text="indicator.name" :type="indicator.key" @input="(e) => indicator.value = e"
                      v-if="index!=indicators.length-1" />
                    <file-selector v-else :not-show-drop="true" />
                  </div>
                </div>
              </div>
            </template>
            
            <template #body v-if="currentSupplier==supplierIndex+1">
            {{ supplier }}
            {{ supplierIndex }}
                <transition v-for="(input, supplierParamsIndex) in supplier">
                  <customized-input  :key="supplierParamsIndex" :text="input.text"
                  :optionalText="input.optionalText" :type="input.type" @input="(e) => input.value = e" />
                </transition>
              </template>
          </card>
        </div>
        <!-- <supplier-card v-for="supplier in suppliers" :key="supplier.id" :supplier="supplier" /> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import FileSelector from './components/FileSelector.vue';
import CustomizedInput from './components/CustomizedInput.vue';
import CustomizedButton from './components/CustomizedButton.vue';
import Card from './components/Card.vue';
import { ref, onMounted, computed } from 'vue';
const formValues = ref([
  {
    text: 'Nombres y Apellidos',
    optionalText: false,
    type: 'text',
    value: ''
  },
  {
    text: 'Whatsapp',
    optionalText: false,
    type: 'text',
    value: ''

  },
  {
    text: 'DNI/ID',
    optionalText: false,
    type: 'text',
    value: ''
  },
  {
    text: 'Nombre de la empresa',
    optionalText: true,
    type: 'text',
    value: ''
  },
  {
    text: 'Email',
    optionalText: false,
    type: 'email',
    value: ''
  },
  {
    text: 'RUC',
    optionalText: true,
    type: 'text',
    value: ''
  },
]);
const formValuesComputedPair = computed(() => {
  return formValues.value.filter((input, index) => index % 2 == 0);
});
const formValuesComputedOdd = computed(() => {
  return formValues.value.filter((input, index) => index % 2 != 0)
});
const currentSuplierItem=computed(()=>{
  return suppliers.value.filter((supplier,index)=>index==currentSupplier.value-1)
})

const currentSupplier = ref(0);
const changeCurrentSupplier=(index)=>{
  currentSupplier.value=index
}
const indicators = ref([
  {
    name: "CBM TOTAL",
    key: "cbm",
    value: ""
  },
  {
    name: "PESO TOTAL",
    key: "peso",
    value: ""
  },
  {
    name: "Proforma y Packing",
    key: "proforma",
    value: null
  }
]);
const printValues = () => {
  console.log(formValues.value);
}
const addNewSupplier = () => {
  suppliers.value.push(suppliersParams.value);
  currentSupplier.value++

}
const suppliers = ref([]);
const suppliersParams = ref([
  {
    text: 'Nombre Comercial',
    optionalText: false,
    type: 'text',
    value: ''
  },
  {
    text: "Uso",
    optionalText: false,
    type: 'text',
    value: ''
  },
  {
    text: "Cantidad",
    optionalText: false,
    type: 'text',
    value: ''
  },
  {
    "text": "Agregar Foto",
    "optionalText": false,
    "type": "file",
    "value": null
  },
  {
    "text": "Link",
    "optionalText": true,
    "type": "text",
    "value": ""
  }

]);
</script>
<style>
body {
  font-family: 'Nunito', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #F2F3F4;
}

.main-container {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  min-width: 320px;
}

#card-cliente,
#card-empresa,
#suppliers-list {
  width: 100%;
  height: 100%;
}

.supplier-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.supplier-indicators {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  width: 100%;
}
.supplier-indicator {
  width: 100%;
}
.supplier-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.slide-enter-active, .slide-leave-active {
  transition: all 0.5s;
}
/* Clase de CSS para el estado inicial */
.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>