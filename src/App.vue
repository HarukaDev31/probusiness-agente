<template>
  <!--<file-selector />-->
  <!-- <customized-input :text="'waos'" :optionalText="true" :type="'text'"/> -->
  <div>
    <navbar />
    <main class="main-container">
      <div id="first-row" class="d-flex flex-column flex-md-row gap-4">
        <div id="card-cliente">
          <h1 class="fw-bold">Cliente</h1>
          <card class="card">
            <template #body>
              <!--Customized input with index pair-->
              <customized-input
                v-for="(input, index) in formValuesComputedPair"
                :key="index"
                :text="input.text"
                :optionalText="input.optionalText"
                :type="input.type"
                @input="(e) => (input.value = e)"
                :validation="input.validate"
                :is-error="input.error"
              />
            </template>
          </card>
        </div>
        <div id="card-empresa">
          <h1 class="fw-bold">Empresa</h1>
          <card class="card">
            <template #body>
              <customized-input
                v-for="(input, index) in formValuesComputedOdd"
                :key="index"
                :text="input.text"
                :optionalText="input.optionalText"
                :type="input.type"
                @input="(e) => (input.value = e)"
                :validation="input.validate"
                :is-error="input.error"
              />
            </template>
          </card>
        </div>
      </div>
      <div id="second-row">
        <div
          class="proveedores-container d-flex flex-column mt-3 align-items-center"
        >
          <h1>Proveedores</h1>
          <customized-button
            @click="addNewSupplier()"
            v-if="suppliers.length == 0"
          >
            <template #text>Agregar Proveedor</template>
          </customized-button>
          <div id="suppliers-list" class="mt-3" v-if="suppliers.length != 0">
            <card
              v-for="(supplier, supplierIndex) in suppliers"
              :key="supplierIndex"
              class="my-3"
              :background="
                currentSupplier.value != supplierIndex + 1 ? '#21618C' : 'white'
              "
            >
              <template #header>
                <div
                  class="supplier-header d-flex flex-column flex-lg-row align-items-center"
                  @click="changeCurrentSupplier(supplierIndex + 1)"
                >
                  <h2
                    class="w-100"
                    :style="
                      currentSupplier.value != supplierIndex + 1
                        ? 'color:white '
                        : ''
                    "
                  >
                    <strong class="">PROVEEDOR {{ supplierIndex + 1 }}</strong>
                    <div
                      class="btn btn-outline-danger"
                      v-if="currentSupplier.value == supplierIndex + 1"
                      @click.stop="deleteSupplier(supplierIndex)"
                    >
                      Eliminar Proveedor
                    </div>
                  </h2>

                  <div
                    class="supplier-indicators d-flex flex-column flex-md-row gap-4 align-items-center"
                    v-if="currentSupplier.value == supplierIndex + 1"
                  >
                    <div
                      class="supplier-indicator d-flex"
                      v-for="(indicator, index) in supplier.indicators"
                      :style="
                        index == supplierIndicators.length - 1 &&
                        indicator.value
                          ? 'height: 200px;'
                          : 'height: 100%;'
                      "
                      :key="`${supplierIndex}-${indicator.key}`"
                    >
                      <customized-input
                        :value="indicator.value"
                        :text="indicator.name"
                        :type="indicator.type"
                        :optionalText="indicator.optionalText"
                        @input="(e) => (indicator.value = e)"
                        v-if="index != supplierIndicators.length - 1"
                        :is-error="indicator.error"
                      />

                      <file-selector
                        v-else
                        :not-show-drop="indicator.value ? true : false"
                        :multiple="true"
                        :value="indicator.value"
                        @file-change="
                          (files) => handleMultipleFiles(files, indicator)
                        "
                      >
                        <template #text> Subir Proforma y/o packing</template>
                      </file-selector>
                    </div>
                  </div>
                </div>
              </template>
              <template
                #body
                v-if="
                  currentSupplier.value == supplierIndex + 1 &&
                  supplier.products != 0
                "
              >
                <div
                  v-for="(productList, productListIndex) in supplier.products"
                  class="product-list row"
                  :key="productListIndex"
                >
                  <div class="col-12 col-md-4">
                    <div
                      v-for="(product, productItemIndex) in productList.filter(
                        (item) => item.type == 'file'
                      )"
                      :key="`fileSelector-${productItemIndex}`"
                      style="height: 100%"
                    >
                      <label class="fw-bold">Imagen</label>
                      <file-selector
                        :not-show-drop="true"
                        :multiple="false"
                        :value="product.value"
                        @fileChange="(files) => handleFile(files, product)"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-8">
                    <customized-input
                      v-for="(product, productItemIndex) in productList.filter(
                        (item) => item.type != 'file'
                      )"
                      :key="`${productListIndex}-${productItemIndex}`"
                      :text="product.text"
                      :optionalText="product.optionalText"
                      :type="product.type"
                      :value="product.value"
                      @input="(e) => (product.value = e)"
                      :is-error="product.error"
                    />

                    <div
                      class="btn btn-outline-danger w-100"
                      @click="deleteProduct(productListIndex, supplierIndex)"
                    >
                      Quitar
                    </div>
                  </div>
                </div>
              </template>
            </card>
          </div>
          <div class="d-flex flex-column w-100 gap-2">
            <div
              class="btn btn-outline-danger"
              @click="addNewProductToSupplier(currentSupplier.value)"
              v-if="suppliers.length != 0"
            >
              Agregar Producto
            </div>
            <customized-button
              @click="addNewSupplier()"
              v-if="suppliers.length != 0"
            >
              <template #text>Agregar Proveedor</template>
            </customized-button>
          </div>
          <!-- <supplier-card v-for="supplier in suppliers" :key="supplier.id" :supplier="supplier" /> -->
        </div>
      </div>
    </main>
    <floatting-button />

    <footer-cuz />
    <send-button @sendCotizacion="sendCotizacion" />
  </div>
</template>
<script setup>
import FileSelector from "./components/FileSelector.vue";
import CustomizedInput from "./components/CustomizedInput.vue";
import CustomizedButton from "./components/CustomizedButton.vue";
import Card from "./components/Card.vue";
import Navbar from "./components/Navbar.vue";
import FooterCuz from "./components/FooterCuz.vue";
import SendButton from "./components/SendButton.vue";
import FloattingButton from "./components/FloattingButton.vue";
import { ref, computed, nextTick, watchEffect, reactive } from "vue";
import { sendCotization } from "./services/send-cotization";
import { i } from "vite/dist/node/types.d-aGj9QkWt";

const validateNotEmpy = (value) => {
  return value != "";
};
const validateNumber = (value) => {
  //validate if is a number and is more than 0 and less than 100
  return !isNaN(value) && value > 0 && value < 10000;
};

const formValues = ref([
  {
    text: "Nombres",
    key: "nombres",
    optionalText: false,
    type: "text",
    value: "",
    validate: validateNotEmpy,
    error: false,
  },
  {
    text: "Whatsapp",
    key: "whatsapp",
    optionalText: false,
    type: "text",
    value: "",
    validate: validateNumber,
    error: false,
  },
  {
    text: "Apellidos",
    key: "apellidos",
    optionalText: false,
    type: "text",
    value: "",
    validate: validateNotEmpy,
    error: false,
  },
  {
    text: "Nombre de la empresa",
    key: "empresa",
    optionalText: true,
    type: "text",
    value: "",
    error: false,
  },
  {
    text: "DNI/ID",
    key: "dni",
    optionalText: false,
    type: "number",
    value: "",
    validate: validateNumber,
    error: false,
  },

  {
    text: "RUC",
    key: "ruc",
    optionalText: true,
    type: "text",
    value: "",
    error: false,
  },
  {
    text: "Email",
    key: "email",
    optionalText: false,
    type: "email",
    value: "",
    validate: validateNotEmpy,
    error: false,
  },
]);
const formValuesComputedPair = computed(() => {
  return formValues.value.filter((input, index) => index % 2 == 0);
});
const formValuesComputedOdd = computed(() => {
  return formValues.value.filter((input, index) => index % 2 != 0);
});

const currentSupplier = reactive({
  value: 0,
});
const changeCurrentSupplier = (index) => {
  console.log("Current Supplier before change:", currentSupplier.value);
  if (index !== currentSupplier.value) {
    currentSupplier.value = index;
  }
};
const handleFile = (file, product) => {
  product.value = file;
};
const handleMultipleFiles = (files, product) => {
  if (files.length > 0) {
    if (product.value != null) {
      product.value = [...product.value, ...files];
    } else {
      product.value = files;
    }
  }
};
const deleteProduct = (productIndex, supplierIndex) => {
  suppliers.value[supplierIndex].products.splice(productIndex, 1);
};
const addNewSupplier = () => {
  const newSupplierIndicators = supplierIndicators.value.map((param) => ({
    ...param,
  }));
  //const newSupplierIndicators = supplierIndicators.value.map(indicator => ({ ...indicator }));

  // suppliersIndicators.value.push(newSupplierIndicators);
  suppliers.value.push({
    id: suppliers.value.length + 1,
    indicators: newSupplierIndicators,
    products: [],
  });
  const newProductParams = productParams.value.map((param) => ({ ...param }));
  if (suppliers.value.length == 1) {
    suppliers.value[0].products.push(newProductParams);
  } else {
    suppliers.value[suppliers.value.length - 1].products.push(newProductParams);
  }
  currentSupplier.value++;
};
const addNewProductToSupplier = (supplierIndex) => {
  console.log("Supplier Index:", supplierIndex - 1, suppliers.value);
  const newProductParams = productParams.value.map((param) => ({ ...param }));
  suppliers.value[supplierIndex - 1].products.push(newProductParams);
};
const productParams = ref([
  {
    text: "Nombre Comercial",
    optionalText: false,
    key: "nombre",
    type: "text",
    value: "",
    error: false,
  },
  {
    text: "Uso",
    optionalText: false,
    type: "text",
    key: "uso",
    value: "",
    error: false,
  },
  {
    text: "Cantidad",
    optionalText: false,
    type: "number",
    key: "cantidad",
    value: "",
    error: false,
  },
  {
    text: "Valor Unitario",
    optionalText: false,
    type: "number",
    key: "valor",
    value: "",
    error: false,
  },
  {
    text: "Agregar Foto",
    optionalText: false,
    type: "file",
    key: "foto",
    value: null,
    error: false,
  },
  {
    text: "Link",
    optionalText: true,
    key: "link",
    type: "link",
    value: "",
    error: false,
  },
]);
const supplierIndicators = ref([
  {
    name: "CBM TOTAL ",
    key: "cbm",
    type: "number",
    value: "",
    error: false,
    optionalText: false,
  },
  {
    name: "PESO TOTAL",
    type: "number",
    key: "peso",
    value: "",
    error: false,
    optionalText: true,
  },
  {
    name: "Proforma y Packing",
    key: "proforma",
    value: null,
    error: false,
  },
]);
const suppliers = ref([]);

const sendCotizacion = async () => {
  //send all in formdata format
  const formData = new FormData();
  let isValid = true;
  formValues.value.forEach((input) => {
    console.log(input);
    if (
      (input.type == "text" || input.type == "email") &&
      input.optionalText == false
    ) {
      if (validateNotEmpy(input.value)) {
        formData.append(input.key, input.value);
      } else {
        input.error = true;
        isValid = false;
      }
    }
    if (input.type == "number") {
      if (validateNumber(input.value)) {
        formData.append(input.key, input.value);
      } else {
        input.error = true;
        isValid = false;
      }
    }
  });
  if (suppliers.value.length == 0) return;
  let supplierIndex = 0;
  suppliers.value.forEach((supplier) => {
    supplier.indicators.forEach((indicator) => {
      //if key is proforma, then it is a filearray
      if (indicator.key == "proforma") {
        if (indicator.value instanceof Array) {
          // Iterar sobre el arreglo de archivos
          let proformaIndex = 0;
          indicator.value.forEach((file) => {
            // Agregar cada archivo al FormData con una clave que incluye el índice de la proforma
            formData.append(
              `proveedor-${supplierIndex}-proforma-${proformaIndex}`,
              file
            );
            proformaIndex++;
          });
        } else if (indicator.value instanceof File) {
          // Si es un solo archivo, agregarlo al FormData con la misma clave
          formData.append(
            `proveedor-${supplierIndex}-proforma-0`,
            indicator.value
          );
        } else {
        }
      } else {
        if (indicator.key == "cbm") {
          if (validateNumber(indicator.value)) {
            formData.append(
              `proveedor-${supplierIndex}-${indicator.key}`,
              indicator.value
            );
          } else {
            indicator.error = true;
            isValid = false;
          }
        } else {
          formData.append(
            `proveedor-${supplierIndex}-${indicator.key}`,
            indicator.value
          );
        }
      }
    });
    let productIndex = 0;
    if (supplier.products.length == 0) {
      isValid = false;
      return;
    }
    supplier.products.forEach((productList) => {
      productList.forEach((product) => {
        if (product.type == "file") {
          if (product.value != null && product.value instanceof File) {
            formData.append(
              `proveedor-${supplierIndex}-producto-${productIndex}-${product.key}`,
              product.value,
              product.value.name
            );
          } else {
            // Si no es un archivo, puedes manejarlo de otra manera o mostrar un mensaje de error
            console.error("El valor no es un archivo.");
          }
        } else {
          if (validateNotEmpy(product.value) || product.optionalText) {
            formData.append(
              `proveedor-${supplierIndex}-producto-${productIndex}-${product.key}`,
              product.value
            );
          } else {
            product.error = true;
            isValid = false;
          }
        }
      });

      productIndex++;
    });
    supplierIndex++;
  });
  if (!isValid) return;

  const response = await sendCotization(formData);
  if (response.status == 201) {
    alert("Cotización enviada con éxito");
  } else {
    alert("Error al enviar la cotización");
  }
};
const deleteSupplier = (index) => {
  console.log("Deleting supplier:", index);
  suppliers.value.splice(index, 1);
  if (suppliers.value.length == 0) {
    currentSupplier.value = 0;
  } else {
    currentSupplier.value = index > 0 ? index : 0;
  }
};
</script>
<style>
body {
  font-family: "Nunito", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f2f3f4;
}

.main-container {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  min-width: 280px;
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

.product-list,
.card {
  display: flex;
  row-gap: 1rem;
  background: white !important;
  margin-bottom: 1em;
  border-radius: 1em;
  padding: 1em;
  width: 100%;
  margin: 1em auto;
}

main {
  display: flex;
  flex-direction: column;
  gap: 1em;
  position: relative;
}
</style>