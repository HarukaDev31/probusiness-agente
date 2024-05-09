<template>
  <!--<file-selector />-->
  <!-- <customized-input :text="'waos'" :optionalText="true" :type="'text'"/> --><div>
  <navbar />  
  <main class="main-container">
    
    <div id="first-row" class="d-flex flex-column flex-md-row gap-4">
      <div id="card-cliente">
        <h1>Cliente</h1>
        <card class="card">
          <template #body>
            <!--Customized input with index pair-->
            <customized-input v-for="(input, index) in formValuesComputedPair" :key="index" :text="input.text"
              :optionalText="input.optionalText" :type="input.type" @input="(e) => input.value = e" />
          </template>
        </card>
      </div>
      <div id="card-empresa" >
        <h1>Empresa</h1>
        <card class="card">
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
        <div id="suppliers-list" class="mt-3" v-if="suppliers.length != 0">
          <card v-for="(supplier, supplierIndex) in suppliers" :key="supplierIndex" class="my-3"
            :background="currentSupplier != supplierIndex + 1 ? '#21618C' : 'white'">
            <template #header>
              <div class="supplier-header d-flex flex-column flex-lg-row"
                @click="currentSupplier != supplierIndex + 1 ? changeCurrentSupplier(supplierIndex + 1) : ''">
                <h2 class="w-100">Proveedor {{ supplierIndex + 1 }}</h2>
                <div class="supplier-indicators d-flex flex-column flex-md-row gap-4">
                  <div class="supplier-indicator " v-for="(indicator, index) in supplier.indicators" :style="index == supplierIndicators.length - 1 && indicator.value?'height: 200px;':'height: 100%;'"
                    :key="`${supplierIndex}-${indicator.key}`" v-if="currentSupplier == supplierIndex + 1">
                    <customized-input :value="indicator.value" :text="indicator.name" :type="indicator.key"
                      @input="(e) => indicator.value = e" v-if="index != supplierIndicators.length - 1" />
                    <file-selector v-else :not-show-drop="indicator.value?true:false
                    "  :multiple="true" :value="indicator.value" @file-change="(files)=>handleMultipleFiles(files,indicator)"/>
                  </div>
                </div>
              </div>
            </template>
            <template #body v-if="currentSupplier == supplierIndex + 1 && supplier.products != 0">
              <div v-for="(productList, productListIndex) in supplier.products" class="product-list row ">
                <div class="col-12 col-md-4">
                  <div v-for="(product, productItemIndex) in productList.filter(item=>item.type=='file')" :key="`fileSelector-${productItemIndex}`" style="height: 100%;">
                    <file-selector :not-show-drop="true" :multiple="false"  :value="product.value" @fileChange="(files)=>handleFile(files,product)"/>

                  </div>
                </div>
                <div class="col-12 col-md-8">
                  <customized-input v-for="(product, productItemIndex) in productList.filter(item=>item.type!='file')"
                  :key="`${productListIndex}-${productItemIndex}`" :text="product.text"
                  :optionalText="product.optionalText" :type="product.type" @fileChange="(e) => product.value = e"
                  :value="product.value" />
                  <customized-button @click="deleteProduct(productListIndex,supplierIndex)" v-fi>
                  <template #text>Eliminar Producto</template>
                </customized-button>
                </div>
                
              </div>
            </template>
          </card>

        </div>
        <customized-button @click="addNewProductToSupplier(currentSupplier)" v-if="suppliers.length!=0">
          <template #text>Agregar Producto</template>
        </customized-button>
        <!-- <supplier-card v-for="supplier in suppliers" :key="supplier.id" :supplier="supplier" /> -->
      </div>
    </div>
  </main>
  <floatting-button />
 
    <footer-cuz />
    <send-button />
</div>
</template>
<script setup lang="ts">
import FileSelector from './components/FileSelector.vue';
import CustomizedInput from './components/CustomizedInput.vue';
import CustomizedButton from './components/CustomizedButton.vue';
import Card from './components/Card.vue';
import Navbar from './components/Navbar.vue';
import FooterCuz from './components/FooterCuz.vue';
import SendButton from './components/SendButton.vue';
import FloattingButton from './components/FloattingButton.vue';
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
const currentSuplierItem = computed(() => {
  return suppliers.value.filter((supplier, index) => index == currentSupplier.value - 1)
})

const currentSupplier = ref(0);
const changeCurrentSupplier = (index) => {
  currentSupplier.value = index
}
const handleFile = (file,product) => {
  console.log("owo")
  product.value = file
  console.log(product)

}
const handleMultipleFiles = (files,product) => {
 if(files.length>0){
  if(product.value!=null){
    product.value=[...product.value,...files] 
  }else{
    product.value = files
  }
 }
}
const deleteProduct = (productIndex,supplierIndex) => {
  suppliers.value[supplierIndex].products.splice(productIndex,1)
} 
const addNewSupplier = () => {
  const newSupplierIndicators = supplierIndicators.value.map(param => ({ ...param }));
  //const newSupplierIndicators = supplierIndicators.value.map(indicator => ({ ...indicator }));

  // suppliersIndicators.value.push(newSupplierIndicators);
  suppliers.value.push(
    {
      id: suppliers.value.length + 1,
      indicators: newSupplierIndicators,
      products: []
    }
    
  );
  if(suppliers.value.length==1){
    suppliers.value[0].products.push(productParams.value)
  }
  currentSupplier.value++

}
const addNewProductToSupplier = (supplierIndex) => {
  const newProductParams = productParams.value.map(param => ({ ...param }));
  suppliers.value[supplierIndex - 1].products.push(newProductParams);
}
const productParams = ref([
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
const supplierIndicators = ref([
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
const suppliers = ref([

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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

/* Clase de CSS para el estado inicial */
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.product-list,.card {
  display: flex;
  row-gap: 1rem;
  background: white !important;
  margin-bottom: 1em;
  border-radius: 1em;
  padding: 1em;
  width: 100%;
  margin: 1em auto;
}main{
  display: flex;
  flex-direction: column;
  gap: 1em;
  position: relative;
}
</style>