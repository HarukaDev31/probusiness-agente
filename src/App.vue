<template>
  <!--<file-selector />-->
  <!-- <customized-input :text="'waos'" :optionalText="true" :type="'text'"/> -->
  <div class="app-container">
    <div v-if="isLoading || isInStepByStep" class="backdrop">
      <div class="spinner-border text-primary" v-if="isLoading" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <navbar />
    <main class="main-container" style="position: relative">
      <div class="hero-container" v-if="currentProcessStep < 4">
        <img class="hero-image" src="/src/assets/hero.png" alt="Hero Image" />
      </div>
      <div class="process-steps-container" v-if="currentProcessStep < 4">
        <div
          class="process-step"
          :class="getCurrentStepClass(currentProcessStep, index + 1)"
          v-for="(step, index) in processSteps"
          :key="index"
        >
          <div class="step-number" v-if="processSteps[index].isCompleted">
            <span>
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M4 12.6111L8.92308 17.5L20 6.5"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </span>
          </div>
          <div class="step-number sora-semibold" v-else>
            <span>0{{ index + 1 }}</span>
          </div>

          <div class="step-text">
            <span>{{ step.name }}</span>
          </div>
        </div>
      </div>
      <div class="process-informacion-personal" v-if="currentProcessStep == 1">
        <h1 class="my-4 sora-regular">Mis datos</h1>
        <span class="epilogue-regular"
          >Busca tu DNI o ingresa manualmente tus nombres y apellidos</span
        >
        <div
          v-for="(desc, descIndex) in formValuesComputedPair"
          :key="descIndex"
        >
          <customized-input
            :key="descIndex"
            :text="desc.text"
            :optionalText="desc.optionalText"
            :type="desc.type"
            @input="(e) => (desc.value = e)"
            @select="(e) => (desc.value = e)"
            :value="desc.value"
            :validation="desc.validate"
            :is-error="desc.error"
            :prepend="desc.prepend"
            :keyRender="desc.keyRender"
            :options="desc.options"
            :error-text="desc.errorText"
            :class="`step step-${2 + descIndex}`"
          />
        </div>
        <div class="process-steps-buttons mt-5">
          <div
            class="btn-anterior"
            @click="previousProcessStep"
            v-if="currentProcessStep > 1"
          >
            <span>Anterior</span>
          </div>
          <div
            class="btn-siguiente epilogue-regular"
            @click="nextProcessStep(formValuesComputedPair)"
            v-if="currentProcessStep < processSteps.length"
          >
            <span>Siguiente</span>
          </div>
        </div>
      </div>
      <div class="process-informacion-personal" v-if="currentProcessStep == 2">
        <h2 class="my-4 sora-regular">Datos empresa</h2>
        <span class="epilogue-regular">Ingresa los datos de tu empresa</span>

        <div
          v-for="(desc, descIndex) in formValuesComputedOdd.filter((item) => {
            if (item.hasOwnProperty('notShow')) {
              if (!item.notShow) {
                return item;
              }
              return;
            }
            return item;
          })"
          :key="descIndex"
        >
          <customized-input
            :key="descIndex"
            :text="desc.text"
            :optionalText="desc.optionalText"
            :type="desc.type"
            @input="(e) => (desc.value = e)"
            @select="(e) => (desc.value = e)"
            :value="desc.value"
            :validation="desc.validate"
            :is-error="desc.error"
            :prepend="desc.prepend"
            :keyRender="desc.keyRender"
            :error-text="desc.errorText"
            :options="desc.options"
            :class="`step step-${2 + descIndex}`"
          />
        </div>
        <div class="process-steps-buttons mt-5">
          <div
            class="btn-anterior epilogue-regular"
            @click="previousProcessStep"
            v-if="currentProcessStep > 1"
          >
            <span>Volver</span>
          </div>
          <div
            class="btn-siguiente epilogue-regular"
            @click="
              nextProcessStep(
                formValuesComputedOdd.filter((item) => {
                  if (item.hasOwnProperty('notShow')) {
                    if (!item.notShow) {
                      return item;
                    }
                    return;
                  }
                  return item;
                })
              )
            "
            v-if="currentProcessStep < processSteps.length"
          >
            <span>Siguiente</span>
          </div>
        </div>
      </div>
      <div class="process-proveedores" v-if="currentProcessStep == 3">
        <h2 class="my-4 text-center sora-regular">Productos</h2>
        <card>
          <template #body>
            <!-- {{products}}-->
            <!--STEP 3-->
            <div class="row">
              <div
                v-for="(product, index) in products"
                :key="index"
                :class="[
                  'product-list',
                  {
                    'product-list-collapsed':
                      index + 1 !== currentProduct.value,
                  },
                  { ' py-4': index + 1 !== currentProduct.value },
                ]"
              >
                <!-- Collapsed view remains unchanged -->
                <div
                  v-if="index + 1 !== currentProduct.value || !isPendingToSave"
                  class="row w-100"
                >
                  <div
                    class="col-12 col-md-12"
                    
                  >
                    <div class="py-2 mb-1 d-flex justify-content-between">
                      <h4 class="sora-regular">
                        Producto {{ getFormattedNumber(index + 1) }}
                      </h4>
                      <span class="d-flex gap-2 product-actions">
                        <!--Edit Icon-->
                        <svg 
                        @click="editProduct(index+1)"
                        width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.457 18.5638C6.54491 18.5419 6.6252 18.4964 6.68928 18.4323L18.917 6.20459C19.1561 5.96547 19.3458 5.68159 19.4752 5.36916C19.6046 5.05674 19.6713 4.72188 19.6713 4.38371C19.6713 4.04554 19.6046 3.71068 19.4752 3.39826C19.3458 3.08583 19.1561 2.80195 18.917 2.56283C18.6779 2.32371 18.394 2.13402 18.0816 2.00461C17.7692 1.8752 17.4343 1.80859 17.0961 1.80859C16.4132 1.80859 15.7582 2.0799 15.2753 2.56283L3.04752 14.7906C2.98344 14.8546 2.93798 14.9349 2.916 15.0229L1.93778 18.9357C1.89518 19.1061 1.94511 19.2864 2.0693 19.4105C2.19349 19.5347 2.37373 19.5847 2.54412 19.5421L6.457 18.5638Z" stroke="#7E7E7E" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <!--Delete Icon-->
                        <svg 
                        @click="deleteProductTrading(index+1)"
                        width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5H3H19" stroke="#FF0000" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17 5V19C17 19.5304 16.7893 20.0391 16.4142 20.4142C16.0391 20.7893 15.5304 21 15 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5M6 5V3C6 2.46957 6.21071 1.96086 6.58579 1.58579C6.96086 1.21071 7.46957 1 8 1H12C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V5" stroke="#FF0000" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 10V16" stroke="#FF0000" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 10V16" stroke="#FF0000" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                      </span>
                    </div>
                    <div class="row">
                      <div class="col-4 d-flex flex-column">
                        <div class="img-container">
                          <img
                            :src="
                              getObjectURL(
                                getProductParam(product, 'foto').value
                              )
                            "
                            alt="product image"
                            class="img img-fluid"
                          />
                        </div>
                      </div>
                      <div class="product-info col-12 col-md-8">
                        <span class="mb-2 epilogue-regular">
                          {{ getProductParam(product, "nombre").value }}
                        </span>
                        <span class="epilogue-regular">
                          Cantidad:
                          {{ getProductParam(product, "cantidad").value }}
                        </span>
                        <span class="epilogue-regular">
                          Enlace:
                          {{ getProductParam(product, "link").value }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Expanded view (current product) -->
                <div v-else class="w-100">
                  <div class="product-header">
                    <h4 class="sora-regular text-center py-2">
                      Producto {{ getFormattedNumber(index + 1) }}
                    </h4>
                    <span>X</span>
                  </div>

                  <div class="row py-5">
                    <!-- File selector column -->
                    <div class="col-12 col-md-6">
                      <div
                        v-for="param in product.filter(
                          (p) => p.type === 'file'
                        )"
                        :key="param.name"
                        style="height: 100%"
                      >
                        <file-selector
                          :not-show-drop="true"
                          style="height: 100%"
                          :multiple="false"
                          :value="param.value"
                          @fileChange="(files) => handleFile(files, param)"
                          :accept="'image/*'"
                        >
                          <template #text>
                            Subir Imagen
                            <svg
                              width="23"
                              height="23"
                              viewBox="0 0 23 23"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22.5 12.6924H16.5769C16.1281 12.6924 15.6976 12.8707 15.3803 13.188C15.0629 13.5054 14.8846 13.9359 14.8846 14.3847C14.8846 15.2823 14.528 16.1432 13.8933 16.778C13.2585 17.4127 12.3976 17.7693 11.5 17.7693C10.6023 17.7693 9.74145 17.4127 9.10672 16.778C8.47197 16.1432 8.11538 15.2823 8.11538 14.3847C8.11538 13.9359 7.93708 13.5054 7.61972 13.188C7.30235 12.8707 6.87191 12.6924 6.42308 12.6924H0.5V20.3078C0.5 20.7566 0.678296 21.1871 0.995665 21.5044C1.31304 21.8217 1.74347 22.0001 2.19231 22.0001H20.8077C21.2565 22.0001 21.687 21.8217 22.0043 21.5044C22.3216 21.1871 22.5 20.7566 22.5 20.3078V12.6924Z"
                                stroke="#7E7E7E"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M7.26855 6.23077L11.4993 2L15.7301 6.23077"
                                stroke="#7E7E7E"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M11.5005 12.1538V2"
                                stroke="#7E7E7E"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </template>
                        </file-selector>
                      </div>
                    </div>

                    <!-- Other inputs column -->
                    <div class="col-12 col-md-6">
                      <div
                        v-for="param in product.filter(
                          (p) => p.type !== 'file'
                        )"
                        :key="param.name"
                      >
                        <customized-input
                          :key="param.name"
                          :text="param.text"
                          :optionalText="param.optionalText"
                          :type="param.type"
                          :value="param.value"
                          @input="(e) => (param.value = e)"
                          :is-error="param.isError"
                          :key-render="param.keyRender"
                          :show-actions="param.showActions"
                        />
                      </div>
                      <div
                        class="process-steps-buttons"
                        v-if="index === currentProduct.value - 1"
                      >
                        <div
                          class="btn-siguiente epilogue-regular"
                          @click="savePedido()"
                        >
                          <span>Guardar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="process-steps-buttons w-100 mt-2">
                <div
                  class="btn-siguiente epilogue-regular"
                  @click="addNewProduct()"
                >
                  Agregar producto
                </div>
                <div
                  class="btn-enviar epilogue-regular"
                  @click="showOrderResume()"
                >
                  Enviar Pedido
                </div>
                </div>  
            </div>
            <!-- 
            <div
              class="process-steps-buttons"
              v-if="
                currentSupplier.value == supplierIndex + 1 &&
                !supplier.isCompleted
              "
            >
              <div
                class="btn-anterior"
                @click="addNewProductToSupplier(supplierIndex)"
              >
                Agregar producto
              </div>
              <div
                class="btn-siguiente epilogue-regular"
                @click="showLastSupplierData(supplierIndex)"
              >
                Guardar
              </div>
            </div>
            <div
              class="process-steps-buttons w-100 mt-2"
              v-if="currentSupplier.value > 1"
            >
              <div
                class="btn-siguiente epilogue-regular"
                @click="addNewSupplier()"
              >
                Agregar proveedor
              </div>
              <div class="btn-enviar" @click="showOrderResume()">
                Envíar Pedido
              </div>
            </div> -->
          </template>
        </card>
      </div>
      <!--Order Resume-->
      <div class="order-resume" v-if="currentProcessStep == 4">
        <div class="resume-header">
          <svg
            @click="currentProcessStep = 3"
            class="icon-edit"
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.45602 18.5643C6.54393 18.5424 6.62422 18.4969 6.6883 18.4328L18.916 6.20508C19.1552 5.96596 19.3448 5.68208 19.4743 5.36965C19.6037 5.05722 19.6703 4.72237 19.6703 4.3842C19.6703 4.04603 19.6037 3.71117 19.4743 3.39874C19.3448 3.08631 19.1552 2.80244 18.916 2.56332C18.6769 2.32419 18.393 2.13451 18.0806 2.0051C17.7682 1.87569 17.4333 1.80908 17.0952 1.80908C16.4122 1.80908 15.7572 2.08039 15.2743 2.56332L3.04654 14.7911C2.98246 14.8551 2.937 14.9354 2.91502 15.0233L1.9368 18.9362C1.89421 19.1066 1.94413 19.2868 2.06832 19.411C2.19251 19.5352 2.37276 19.5851 2.54314 19.5426L6.45602 18.5643Z"
              stroke="#7E7E7E"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="informacion-personal resume-section">
          <div class="section-content">
            <h3 class="sora-regular">Información personal</h3>
            <div class="d-flex flex-column">
              <span class="epilogue-regular"
                >{{ getFormParam(formValuesComputedPair, "nombres").value }}
                </span
              >
              <span class="epilogue-regular">{{
                getFormParam(formValuesComputedPair, "email").value
              }}</span>
              <span class="epilogue-regular">{{
                getFormParam(formValuesComputedPair, "dni").value
              }}</span>
            </div>
          </div>
        </div>
        <div class="empresa resume-section">
          <div class="section-content">
            <h3 class="sora-regular">Empresa</h3>

            <div class="d-flex flex-column">
              <span class="epilogue-regular">{{
                getFormParam(formValuesComputedOdd, "empresa").value
              }}</span>
              <span class="epilogue-regular">{{
                getFormParam(formValuesComputedOdd, "ruc").value
              }}</span>
            </div>
          </div>
        </div>
        <div class="productos">
    <div class="section-content">
      <h3 class="sora-regular py-3">Productos</h3>
      
      <div
        v-for="(product, productIndex) in products"
        :key="productIndex"
        class="product-item py-2"
      >

        <h5 class="sora-regular">
          Producto {{ getFormattedNumber(productIndex + 1) }}
        </h5>
        <div class="resume-product-indicators row">
          <div class="col-12 col-md-4 ">
            <img 
              v-if="product.find(item => item.type === 'file')" 
              :src="getObjectURL(product.find(item => item.type === 'file').value)"
              alt="Imagen del producto"
              class="w-100 h-100"
              style="border:1px solid #d1d1d1;padding: 1em;"
            />
          </div>
          <div class="col-12 col-md-8 product-details">
            <span>{{ getFormParam(product, 'nombre').value }}</span>
            <span>Cantidad: {{ getFormParam(product, 'cantidad').value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
      </div>
      <div
        v-if="currentProcessStep == 4"
        class="terms-and-conditions w-50 mx-auto text-center epilogue-regular pt-5 pb-2"
        style="font-size: 0.8em"
      >
        <span>
          Al enviar este formulario confirmo que he leído y acepto la
          <a href="#" class="epilogue-regular">Política de privacidad</a>
        </span>
      </div>
      <div
        class="mx-auto w-50 mt-2 d-flex flex-column"
        style="row-gap: 1em"
        v-if="currentProcessStep == 4"
      >
        <div class="btn-enviar epilogue-regular" @click="setTrading">
          Envíar Pedido
        </div>
        <div
          class="btn-anterior epilogue-regular"
          @click="currentProcessStep = 3"
        >
          Volver
        </div>
      </div>
    </main>
  </div>
  <end-view v-if="currentProcessStep == 5" @back="restartProcess" />

  <footer-cuz />
</template>
<script setup>
//import components
import FileSelector from "./components/FileSelector.vue";
import CustomizedInput from "./components/CustomizedInput.vue";
import CustomizedButton from "./components/CustomizedButton.vue";
import Card from "./components/Card.vue";
import Navbar from "./components/Navbar.vue";
import FooterCuz from "./components/FooterCuz.vue";
import SendButton from "./components/SendButton.vue";
import FloattingButton from "./components/FloattingButton.vue";
import StepByStepButton from "./components/StepByStepButton.vue";
import { ref, computed, reactive, onMounted } from "vue";
import {
  sendCotization,
  getClientDataByDNIID,
  setTradingOrder,
  getPaises,
} from "./services/send-cotization";
import Swal from "sweetalert2";
import EndView from "./components/EndView.vue";
import { faL } from "@fortawesome/free-solid-svg-icons";
//define current step

const currentProcessStep = ref(1);

//validation functions
const validateNotEmpy = (value) => {
  return value != "";
};
const validateEmail = (value) => {
  //validate email
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};
const validateNumber = (value) => {
  //validate if is a number and is more than 0 and less than 100
  return !isNaN(value) && value > 0 && value < 999999999;
};

const isLoading = ref(false);
const isInStepByStep = ref(false);
const productParams = [
  {
    text: "Nombre comercial",
    optionalText: false,
    key: "nombre",
    type: "text",
    value: "",
    keyRender: 0,
    description: "Ingresa el nombre del producto que deseas cotizar.",
    showActions: false,
    validate: validateNotEmpy,
    isError: false,
  },
  {
    text: "Caracteristicas",
    optionalText: false,
    type: "textarea",
    key: "uso",
    value: "",
    keyRender: 0,
    description: "Ingresa el uso del producto que deseas cotizar.",
    showActions: false,
    validate: validateNotEmpy,
    isError: false,
    errorText: "Ingresa el uso del producto que deseas cotizar",
  },
  {
    text: "Enlace",
    optionalText: true,
    key: "link",
    type: "link",
    value: "",
    keyRender: 0,
    description:
      "Ingresa el link del producto que deseas cotizar. Si no tienes un link, déjalo en blanco.",
    showActions: false,
    isError: false,
    validate: validateNotEmpy,
  },
  {
    text: "Cantidad",
    optionalText: false,
    type: "number",
    key: "cantidad",
    value: "",
    keyRender: 0,
    description: "Ingresa la cantidad de productos que deseas cotizar. ",
    showActions: true,
    validate: validateNumber,
    isError: false,
    errorText: "Ingresa una cantidad mayor a 0",
  },

  {
    text: "Agregar Foto",
    optionalText: true,
    type: "file",
    key: "foto",
    value: null,
    keyRender: 0,
    description: "Puedes subir una foto del producto que deseas cotizar.",
    isError: false,
    errorText: "Ingresa una foto del producto que deseas cotizar",
    validate: validateNotEmpy,
  },
];
const supplierIndicators = ref([
  {
    name: "CBM total",
    key: "cbm",
    type: "number",
    value: "",
    error: false,
    optionalText: false,
    keyRender: 0,
    description:
      "Ingresa el CBM total de los productos que deseas cotizar.El CBM es el volumen total que ocupan tus productos en metros cúbicos.",
  },
  {
    name: "Peso total",
    type: "number",
    options: [
      { text: "Kg", value: "Kg", selected: false },
      { text: "Tn", value: "Tn", selected: false },
    ],
    key: "peso",
    value: "",
    error: false,
    optionalText: true,
    keyRender: 0,
    description:
      "Ingresa el peso total de los productos que deseas cotizar y selecciona la unidad de medida.Si no sabes el peso total, déjalo en blanco.",
  },
]);
const restartProcess = () => {
  window.location.reload();
};
const suppliers = ref([]);
const products = ref([]);
//position of description
//get current window width
const windowWidth = ref(window.innerWidth);
window.addEventListener("resize", () => {
  windowWidth.value = window.innerWidth;
});

const getClientData = async (value) => {
  if (!validateNotEmpy(value))
    return showAlert(
      "Error al buscar cliente",
      "Debe ingresar un DNI/ID",
      "error"
    );
  try {
    isLoading.value = true;
    const params = {
      dni: value,
    };
    const response = await getClientDataByDNIID(params);

    formValues.value.forEach((input) => {
      if (response.tipoCliente == 0) {
        showAlert(
          "Cliente no encontrado",
          `No se encontró un cliente con el DNI/ID ingresado`,
          "error"
        );
        return;
      }
      if (response.tipoCliente == 2) {
        //NOTIFY USE COLLABORATOR CODE,GET CONGRATULATIONS
        showAlert(
          "Bienvenido de vuelta!",
          `Al ser un socio, obtienes un descuento especial en tu cotización`,
          "success"
        );
        return;
      }
      try {
        input.keyRender++;

        input.value = response.clientData[0][input.key];
      } catch (e) {
        showAlert(
          "Error al buscar cliente",
          `Hubo un error al buscar el cliente, por favor intente nuevamente`,
          "error"
        );
      }
    });
    isLoading.value = false;
  } catch (e) {
    isLoading.value = false;
    console.error(e);
  }
};
const getProductParam = (paramsList, paramKey) => {
  return paramsList.find((param) => param.key == paramKey);
};
const getFormParam = (paramsList, paramKey) => {
  return paramsList.find((param) => param.key == paramKey);
};
const countryOptions = [

];
const formValues = ref([
  {
    text: "DNI/ID",
    key: "dni",
    optionalText: false,
    type: "text",
    value: "",
    validate: validateNotEmpy,
    error: false,

    keyRender: 0,
    helpText:
      "Ingresa tu DNI/ID para buscar tus datos y dale click al icono de búsqueda para autocompletar tus datos.",
  },

  {
    text: "Nombre de la empresa",
    key: "empresa",
    optionalText: true,
    type: "text",
    value: "",
    errorText: "Ingresa el nombre de la empresa a la que perteneces",
    error: false,
    keyRender: 0,
    helpText:
      "Ingresa el nombre de la empresa a la que perteneces. Si no tienes empresa, déjalo en blanco.",
  },
  {
    text: "Nombres y Apellidos",
    key: "nombres",
    optionalText: false,
    type: "text",
    value: "",
    validate: validateNotEmpy,
    errorText: "Ingresa tus nombres y apellidos completos",
    error: false,
    keyRender: 0,
    helpText: "Ingresa tus nombres y apellidos completos.",
  },

  {
    text: "RUC",
    key: "ruc",
    optionalText: true,
    type: "text",
    value: "",
    errorText: "Ingresa un RUC válido",
    error: false,
    keyRender: 0,
    helpText:
      "Ingresa el RUC de la empresa a la que perteneces. Si no tienes empresa, déjalo en blanco.",
  },
  {
    text: "Correo electrónico",
    key: "email",
    optionalText: false,
    type: "email",
    value: "",
    validate: validateEmail,
    errorText: "Ingresa un correo electrónico válido",
    error: false,
    keyRender: 0,
    helpText: "Ingresa tu correo electrónico.",
  },
  {
    text: "Pais de Origen",
    key: "pais",
    optionalText: false,
    type: "select",
    options: countryOptions,
    value: "1",
    validate: validateNotEmpy,
    errorText: "Ingresa un pais valido",
    error: false,
    keyRender: 0,
    helpText: "Ingresa tu correo electrónico.",
  },
]);
const fillSelectPaises=async()=>{
  try {
    const response = await getPaises();
    formValues.value.find((input) => input.key == "pais").options= response.paises.map((pais) => ({
      value: pais.ID_Pais,
      text: pais.No_Pais,
    }));
  } catch (e) {
    console.error(e);
  }
}
onMounted(() => {
  try {
    fillSelectPaises();
  } catch (e) {
    console.error(e);
  }
});
const formValuesComputedPair = computed(() => {
  return formValues.value.filter((input, index) => index % 2 == 0);
});
const formValuesComputedOdd = computed(() => {
  return formValues.value.filter((input, index) => index % 2 != 0);
});

const currentSupplier = reactive({
  value: 0,
});
const currentProduct = reactive({
  value: 0,
});
const isPendingToSave = ref(true);
const changeCurrentSupplier = (index) => {
  currentSupplier.value = index + 1;
  suppliers.value[index].isCompleted = false;
};
const handleFile = (file, product) => {
  product.value = file;
};
const handleMultipleFiles = (files, product) => {
  if (files.length > 0) {
    if (product.value != null) {
      product.value = [...files];
    } else {
      product.value = files;
    }
  }
};
const deleteProduct = (productIndex, supplierIndex) => {
  suppliers.value[supplierIndex].products.splice(productIndex, 1);
};
const deleteProductTrading = (productIndex) => {
  //if product is not saved 
  if(isPendingToSave.value || products.value.length<=1){
    return;
  }
  products.value.splice(productIndex, 1);
  currentProduct.value--;
};
const savePedido=()=>{
  let isValid=validateProductTrading();
  if(!isValid){
    return;
  }
  isPendingToSave.value = false;
}
const addNewProduct = () => {
  //check current product and validate

  isPendingToSave.value = true;
  let isValid=validateProductTrading();
  if(!isValid){
    return;
  }
  const newProductParams = productParams.map((param) => ({ ...param }));
  products.value.push(newProductParams);
  currentProduct.value++;
};
const addNewSupplier = () => {
  const newSupplierIndicators = supplierIndicators.value.map((indicator) => ({
    ...indicator,
    options: indicator.options
      ? indicator.options.map((option) => ({ ...option }))
      : undefined,
  }));

  suppliers.value.push({
    id: suppliers.value.length + 1,
    indicators: newSupplierIndicators,
    isCompleted: false,
    products: [],
  });
  const newProductParams = productParams.map((param) => ({ ...param }));
  if (suppliers.value.length == 1) {
    suppliers.value[0].products.push(newProductParams);
  } else {
    suppliers.value[suppliers.value.length - 1].products.push(newProductParams);
  }
  if (currentSupplier.value >= suppliers.value.length) {
    currentSupplier.value = suppliers.value.length;
  } else {
    currentSupplier.value++;
  }
};
const validateSupplier = (supplierIndex) => {
  const supplier = suppliers.value[supplierIndex];
  let isValid = true;
  supplier.products.forEach((product) => {
    product.forEach((param) => {
      if (param.validate && !param.optionalText) {
        if (!param.validate(param.value) && !param.optionalText) {
          param.isError = true;
          isValid = false;
        } else {
          param.isError = false;
        }
      }
    });
  });
  return isValid;
};
const validateProductTrading=()=>{
  if (currentProduct.value > 0) {
    let hasError = false;
    const currentProductParams = products.value[currentProduct.value - 1];
    currentProductParams.forEach((param) => {
      if (param.validate && !param.optionalText) {
        if (!param.validate(param.value)) {
          param.isError = true;
          param.keyRender++;
          hasError = true;
          return false;
        } else {
          param.isError = false;
        }
      }
    });
    return !hasError;

  }
  return true;
}
const validateProduct = (product) => {
  product.value.forEach((param) => {
    console.log(param);
    if (param.validate && !param.optionalText) {
      if (!param.validate(param.value)) {
        param.isError = true;
        return false;
      } else {
        param.isError = false;
      }
    }
  });
  return true;
};
const addNewProductToSupplier = (supplierIndex) => {
  const newProductParams = productParams.map((param) => ({ ...param }));
  console.log(newProductParams, "newProductParams", supplierIndex);
  suppliers.value[supplierIndex].products.push(newProductParams);
};

/**
 * This function shows a sweetalert with the given parameters
 * @param {string} title - Title of the alert
 * @param {string} text - Text of the alert
 * @param {string} icon - Icon of the alert
 * @param {Function} fn - Function to execute after the alert is closed
 * @param {string} go + Text of the button
 */
const showAlert = (title, text, icon, fn = null, go = "OK") => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: go,
    confirmButtonColor: "#21618C",
  }).then((result) => {
    if (result.isConfirmed) {
      if (fn) {
        fn();
      }
    }
  });
};

//show modal swall when save button supplier button is clicked
const showLastSupplierData = async (supplierIndex) => {
  const supplier = suppliers.value[supplierIndex];
  const isValid = validateSupplier(supplierIndex);
  if (!isValid) {
    showAlert(
      "Error al guardar proveedor",
      "Debes llenar todos los campos obligatorios",
      "error"
    );
    return;
  }
  console.log(isValid);
  const indicators = supplier.indicators;
  //GET CURRENT WINDOW WIDTH
  const windowWidth = window.innerWidth;
  const modalSize = windowWidth < 768 ? "100%" : "40%";
  const swall = await Swal.fire({
    title: "<span class='epilogue-regular my-2' >Un último paso</span>",
    backdrop: true,
    width: modalSize,
    html: `
   <div class="modal-save">
    <p class='epilogue-regular mt-5'>Antes de terminar con la información de tu proveedor ingresa los siguientes datos  de tu cotización</p>
    <div class="save-supplier-inputs">
      <div class="cbm-total input-container">
        <div class="input-header ">
          <span class='epilogue-regular'>CBM total <span style="color:red">*</span></span>
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.5046 8C16.5046 12.2477 12.887 15.7143 8.39515 15.7143C3.90329 15.7143 0.285714 12.2477 0.285714 8C0.285714 3.75234 3.90329 0.285714 8.39515 0.285714C12.887 0.285714 16.5046 3.75234 16.5046 8Z" fill="white" stroke="#FF500B" stroke-width="0.571429"/>
          <path d="M6.96811 12.5715V11.9858L8.12525 11.7858V6.7001L6.98239 6.5001V5.91439L8.95382 5.51439L9.29668 5.64296V11.7858L10.411 11.9858V12.5715H6.96811ZM8.55382 4.45725C8.31573 4.45725 8.12049 4.3763 7.96811 4.21439C7.82525 4.04296 7.75382 3.82868 7.75382 3.57153C7.75382 3.32391 7.83477 3.10487 7.99668 2.91439C8.15858 2.72391 8.36811 2.62868 8.62525 2.62868C8.86335 2.62868 9.05382 2.70487 9.19668 2.85725C9.34906 3.00011 9.42525 3.20963 9.42525 3.48582C9.42525 3.74296 9.34906 3.97153 9.19668 4.17153C9.0443 4.36201 8.83001 4.45725 8.55382 4.45725Z" fill="#FF500B"/>
          </svg>
        </div>
        <input type="number" class="input w-100 sora-regular" placeholder="0.0" value="${indicators[0].value}" />
        <span class="error-cbm error d-none sora-light">Ingresa un CBM válido</span>
      </div>
      <div class="peso-total input-container">
        <div class="input-header">
          <span class='epilogue-regular'>CBM total <span style="color:red">*</span></span>
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5046 8C16.5046 12.2477 12.887 15.7143 8.39515 15.7143C3.90329 15.7143 0.285714 12.2477 0.285714 8C0.285714 3.75234 3.90329 0.285714 8.39515 0.285714C12.887 0.285714 16.5046 3.75234 16.5046 8Z" fill="white" stroke="#FF500B" stroke-width="0.571429"/>
            <path d="M6.96811 12.5715V11.9858L8.12525 11.7858V6.7001L6.98239 6.5001V5.91439L8.95382 5.51439L9.29668 5.64296V11.7858L10.411 11.9858V12.5715H6.96811ZM8.55382 4.45725C8.31573 4.45725 8.12049 4.3763 7.96811 4.21439C7.82525 4.04296 7.75382 3.82868 7.75382 3.57153C7.75382 3.32391 7.83477 3.10487 7.99668 2.91439C8.15858 2.72391 8.36811 2.62868 8.62525 2.62868C8.86335 2.62868 9.05382 2.70487 9.19668 2.85725C9.34906 3.00011 9.42525 3.20963 9.42525 3.48582C9.42525 3.74296 9.34906 3.97153 9.19668 4.17153C9.0443 4.36201 8.83001 4.45725 8.55382 4.45725Z" fill="#FF500B"/>
            </svg>
        </div>
        <div class="input-prepend">
          <span class="prepend sora-regular">
              Kg    
          </span>
          <input type="number" class="input sora-regular" placeholder="0" value="${indicators[1].value}" style="width:70%!important" >
          </input>
        </div>
        <span class="error-peso error d-none">Ingresa un peso válido</span>

      </div>
    </div>
    <div class="process-steps-buttons mt-4" style="width:85%!important">
      <div class="btn-anterior epilogue-regular" id="btn-back-supplier"<span>Volver</span></div>
      <div class="btn-siguiente epilogue-regular" id="btn-guardar-supplier"><span>Guardar</span>
    </div>
  `,
    showConfirmButton: false,
    didOpen: () => {
      document
        .getElementById("btn-guardar-supplier")
        .addEventListener("click", () => {
          const cbm = document.querySelector(".cbm-total input").value;
          const peso = document.querySelector(".peso-total input").value;
          const showErrors = (cbmError, pesoError) => {
            const cbmElement = document.querySelector(".error-cbm");
            const pesoElement = document.querySelector(".error-peso");

            cbmElement.classList.toggle("d-none", !cbmError);
            cbmElement.classList.toggle("d-flex", cbmError);

            pesoElement.classList.toggle("d-none", !pesoError);
            pesoElement.classList.toggle("d-flex", pesoError);
          };

          if (cbm === "" || peso === "") {
            console.log("entro");
            showErrors(cbm === "", peso === "");
            return;
          } else {
            console.log("entro2", cbm, peso);
            // Hide errors
            showErrors(false, false);

            // Set values
            indicators[0].value = parseFloat(cbm);
            indicators[1].value = parseFloat(peso);
            currentSupplier.value++;

            Swal.close();
          }
          supplier.isCompleted = true;
        });
      document
        .getElementById("btn-back-supplier")
        .addEventListener("click", () => {
          Swal.close();
        });
    },
  }).then(() => {});
};
const getObjectURL = (file) => {
  let url = null;
  try {
    if (window.createObjectURL != undefined) {
      // basic
      url = window.createObjectURL(file);
    } else if (window.URL != undefined) {
      // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
      // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  } catch (e) {
    console.error(e);
    return null;
  }
};
const redirectoWhatsapp = (num) => {
  window.open(`https://wa.me/${num}`, "_blank");
};
const setTrading=async ()=>{
  try {

    // Preparar los datos del formulario
    const formData = new FormData();

    // Agregar datos del cliente
    console.log(formValues.value, "formValues");
    formValues.value.forEach(item => {
      console.log(item, "item",item.key,getFormParam(formValues.value, item.key).value);
      formData.append(item.key, getFormParam(formValues.value, item.key).value);
    });

    // Agregar productos
    products.value.forEach((producto, index) => {
      formData.append(`addProducto[${index}][nombre_comercial]`, getFormParam(producto, 'nombre').value);
      formData.append(`addProducto[${index}][caracteristicas]`, getFormParam(producto, 'uso').value);
      formData.append(`addProducto[${index}][cantidad]`, getFormParam(producto, 'cantidad').value);
      formData.append(`addProducto[${index}][link]`, getFormParam(producto, 'link').value);
      const fotoParam = getFormParam(producto, 'foto');

// Si existe una foto y es un archivo
      if (fotoParam && fotoParam.value instanceof File) {
        // Cambia la clave para que coincida con lo que espera el backend
        formData.append(`voucher[${index}]`, fotoParam.value);  // El backend espera 'voucher.$index'
      }
    });

    // Realizar la solicitud al backend
    const response = await setTradingOrder(formData);

    if(response.status==="success"){
      showAlert(
        "Cotización enviada",
        `Su cotización ha sido registrada con el codigo N° ${response.code} ¡Gracias por confiar en nosotros!
      Contactanos para mas informacion al whatsapp +51 991 351 346
      `,
        "success",
        () => redirectoWhatsapp("+51991351346"),
        "!Contactanos!"
      );
      //clear all values

      currentProcessStep.value = 5;
    } else {
      showAlert(
        "Error al enviar la cotización",
        `Hubo un error al enviar la cotización, por favor intente nuevamente`,
        "error"
      );
    }
    


   console.log(response)

  } catch (error) {
    console.error('Error al enviar el pedido:', error);
    throw error;
  }
}
const sendCotizacion = async () => {
  //send all in formdata format
  const formData = new FormData();
  let isValid = true;
  //filter formvalue with property  notShow
  formValues.value = formValues.value.filter((input) => {
    if (input.hasOwnProperty("notShow")) {
      if (!input.notShow) {
        return input;
      } else {
        return;
      }
    }
    return input;
  });
  console.log(formValues.value, "formValues");
  formValues.value.forEach((input) => {
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
    } else {
    }
    if (input.type == "number") {
      if (validateNumber(input.value)) {
        formData.append(input.key, input.value);
      } else {
        input.error = true;
        isValid = false;
      }
    } else {
      formData.append(input.key, input.value);
    }
  });
  if (suppliers.value.length == 0) {
    showAlert(
      "Error al enviar la cotización",
      `Debe agregar al menos un proveedor para enviar la cotización`,
      "error"
    );
    return;
  }
  let supplierIndex = 0;
  let productIndex = 0;
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
        } else if (indicator.key == "peso") {
          const existsSelected = indicator.value;
          if (existsSelected) {
            if (validateNumber(indicator.value)) {
              formData.append(
                `proveedor-${supplierIndex}-${indicator.key}`,
                indicator.value
              );
              formData.append(
                `proveedor-${supplierIndex}-peso-unidad`,
                existsSelected.value
              );
            } else {
              indicator.error = true;
              isValid = false;
            }
          } else {
            indicator.error = false;
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
  try {
    isLoading.value = true;
    const response = await sendCotization(formData);
    isLoading.value = false;
    if (response.status == 201) {
      showAlert(
        "Cotización enviada",
        `Su cotización ha sido registrada con el codigo N° ${response.code} ¡Gracias por confiar en nosotros!
      Contactanos para mas informacion al whatsapp +51 991 351 346
      `,
        "success",
        () => redirectoWhatsapp("+51991351346"),
        "!Contactanos!"
      );
      //clear all values

      currentProcessStep.value = 5;
    } else {
      showAlert(
        "Error al enviar la cotización",
        `Hubo un error al enviar la cotización, por favor intente nuevamente`,
        "error"
      );
    }
  } catch (e) {
    showAlert("Error al enviar la cotización", e.message, "error");
    isLoading.value = false;
    //set empty files  in suppliers
    currentSupplier.value = 0;
    suppliers.value = [];
  }
};

const previousProcessStep = () => {
  if (currentProcessStep.value > 1) {
    currentProcessStep.value--;
  }
};
const nextProcessStep = (fields) => {
  let hasError = false;
  fields.forEach((field) => {
    if (!field.optionalText) {
      field.error = !field.validate(field.value);
      if (field.error) {
        hasError = true;
      }
    }
  });
  if (hasError) {
    return;
  }
  if (currentProcessStep.value < processSteps.value.length) {
    processSteps.value[currentProcessStep.value - 1].isCompleted = true;
    currentProcessStep.value++;
    if (currentProcessStep.value == 3) {
      addNewSupplier();
    }
  }
};
const getCurrentStepClass = (currentStep, index) => {
  if (currentStep == index) {
    return "active";
  }
  if (processSteps.value[index - 1].isCompleted) {
    return "completed";
  }
  return "";
};
const processSteps = ref([
  {
    id: 1,
    name: "Información personal",
    isCompleted: false,
  },
  {
    id: 2,
    name: "Información empresa",
    isCompleted: false,
  },
  {
    id: 3,
    name: "Proveedores",
    isCompleted: false,
  },
]);
const deleteSupplier = (index) => {
  if (index == 0) {
    console.log("delete first supplier");
  } else {
    showDeleteSupplierSwall(index);
  }
};
const showDeleteSupplierSwall = (index) => {
  Swal.fire({
    backdrop: true,
    width: "40%",
    html: `
   <div class="modal-delete">
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32.0007 58.6667C46.7282 58.6667 58.6673 46.7276 58.6673 32C58.6673 17.2724 46.7282 5.33337 32.0007 5.33337C17.2731 5.33337 5.33398 17.2724 5.33398 32C5.33398 46.7276 17.2731 58.6667 32.0007 58.6667Z" stroke="#FF0000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M32 18.5V35" stroke="#FF0000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M32 42.6666H32.0267" stroke="#FF0000" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <h2>¿Estás seguro que deseas eliminar este proveedor?  </h2>
    <div class="process-steps-buttons mt-4" style="width:85%!important">
      <div class="btn-anterior" id="btn-back-supplier"<span>Volver</span></div>
      <div class="btn-siguiente epilogue-regular" id="btn-delete-supplier"><span>Sí,eliminar</span>
    </div>
  `,
    showConfirmButton: false,
    didOpen: () => {
      document
        .getElementById("btn-delete-supplier")
        .addEventListener("click", () => {
          suppliers.value.splice(index, 1);
          Swal.close();
        });

      document
        .getElementById("btn-back-supplier")
        .addEventListener("click", () => {
          Swal.close();
        });
    },
  });
};
const showOrderResume = () => {
  let isValid = validateProductTrading();
  if(!isValid)return;
  currentProcessStep.value = 4;
};
const editProduct = (productIndex) => {
  currentProduct.value = productIndex;
  isPendingToSave.value = true;
};
const getFormattedNumber = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};
addNewProduct();
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Epilogue:wght@100..900&family=Sora:wght@100..800&display=swap");
</style>
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

/* .supplier-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
} */

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
  border-bottom: 1px solid #cfd6dc;
  padding: 1em;
}
@media (max-width: 1068px) {
  .supplier-header {
    padding: 0.5em;
    border-bottom: none;
  }
}
@media (max-width: 768px) {
  .supplier-indicators {
    font-size: 0.8rem;
  }
  .product-list {
    border-bottom: 1px solid #cfd6dc;
  }
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
  background: white !important;
  margin-bottom: 1em;
  border-radius: 0;
  padding: 1em;
  width: 100%;
  margin: 1em auto;
  border: 1px solid #dfdfdf;
}

main {
  display: flex;
  flex-direction: column;
  gap: 1em;
  position: relative;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.step-active {
  transition: opacity 0.5s ease-in-out;
  position: relative;
  z-index: 100000;
}

.hidden-description {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  z-index: 0;
  display: none !important;
}

.show-description {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  z-index: 1000000;
  display: block !important;
  position: absolute;
  width: 30vw;
}

@keyframes opacity {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.buttons-step-by-step-container {
  position: fixed;
  bottom: 0.4em;
  z-index: 100000;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1em;
}

.btn-step {
  background-color: white;
  font-size: 2em;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-family: "Nunito", sans-serif;
}

.btn-step:hover {
  background-color: #f2f3f4;
  cursor: pointer;
}

.floatting-buttons {
  position: fixed;
  bottom: 6em;
  right: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
}

.hero-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.hero-image {
  width: 70%;
}

.process-steps-container {
  background: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 70%;
  margin: 1em auto;
}

.process-step {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 1em;
  padding: 0.8em 1em;
  border: 1px solid #cfd6dc;
}

@media (max-width: 1068px) {
  .process-steps-container {
    flex-direction: column;
  }

  .process-step {
    width: 100%;
    column-gap: 0.4em;
    font-size: 0.8em;
    padding: 0.5em 0.5em;
  }

  .order-resume {
    width: 80% !important;
  }
}

.hero-container {
  width: 70%;
  margin: 0 auto;
  background: linear-gradient(180deg, rgba(17, 17, 17, 0) 50%, #111111 100%);
  position: relative;
  aspect-ratio: 5/1.6;
}

.hero-image {
  width: 100%;

  height: 100%;
  position: absolute;

  z-index: -1;
}
@media (max-width: 1098px) {
  .navbar {
    padding: 2em 0 !important;
    margin: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100% !important;
  }

  .process-informacion-personal {
    width: 80% !important;
  }

  .process-steps-container {
    flex-direction: column;
    width: 80%;
  }

  .process-step {
    padding: 0.5em 0.5em;
  }

  .step-text {
    width: 60%;
    text-align: center;
  }

  .hero-container {
    width: 100%;
    background: linear-gradient(180deg, rgba(17, 17, 17, 0) 50%, #111111 100%);
    position: relative;
    height: 230px;
  }

  .hero-image {
    width: 100%;
    height: 100%;
    position: absolute;
    background: url(./assets/hero-sm.jpeg) no-repeat;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .main-container {
    width: 100%;
  }
}

.process-step.active .step-number {
  background-color: #ff500b !important;
  color: white;
}

.process-step.completed .step-number {
  background-color: #00d680 !important;
  color: white;
}

.process-step.active .step-text {
  color: #ff500b !important;
}

.process-step .step-number {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #cfd6dc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #abb7c2;
}

.process-step .step-text {
  color: #abb7c2;
}

.process-informacion-personal {
  width: 45%;
  margin: 0 auto;
}

.process-steps-buttons {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 1em;
}
@media (max-width: 1098px) {
  .process-steps-buttons {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 1.5em;
  }
}
.btn-siguiente {
  background: #ff500b;
  color: white;
  width: 100%;
  padding: 1.2em 1em;
  text-align: center;
  border-radius: 0.5em;
}

.btn-siguiente:hover {
  background: #cf3c01;
  cursor: pointer;
}

.btn-anterior {
  background: transparent;
  color: #7e7e7e;
  width: 100%;
  padding: 1.2em 1em;
  text-align: center;
  border: 1px solid #7e7e7e;
  border-radius: 0.5em;
}

.btn-enviar {
  width: 100%;
  padding: 1.2em 1em;
  text-align: center;
  border-radius: 0.5em;
  color: black;
  background: #00d680;
}

.btn-enviar:hover {
  background: #00b26b;
  cursor: pointer;
}

.btn-anterior:hover {
  background: #7e7e7e;
  color: white;
  cursor: pointer;
}

.process-proveedores {
  width: 80%;
  margin: 0 auto;
}

.save-supplier-inputs {
  display: flex;
  flex-direction: row;
  column-gap: 1em;
  width: 80%;
  margin: 0 auto;
}

.input-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5em;
}

.input-container .input {
  padding: 0.5em;
  border-radius: 0.4em;
  border: 1px solid #dfdfdf;
  height: 40px;
  text-align: center;
}

.input-container {
  width: 50%;
}

.input-prepend {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
}

.input-prepend .input {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.prepend {
  width: 30%;
  background-color: #dfdfdf;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 100;
  border-radius: 0.5em;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.modal-save {
  display: flex;
  flex-direction: column;
  row-gap: 1.5em;
}

.error {
  margin-top: 0.2em;
  color: red;
  font-size: 0.8em;

  align-self: flex-start;
}

.supplier-indicators {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
  border-bottom: 1px solid #dfdfdf;
  padding: 1em;
  align-items: center;
}

.indicator-name {
  color: #7e7e7e;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1em;
}

.img-container {
  width: 80%;
  border: 1px solid #dfdfdf;
  padding: 1.5em;
}

.modal-delete {
  display: flex;
  flex-direction: column;
  row-gap: 1em;
  align-items: center;
  padding: 1em 0;
}

.order-resume {
  background: white;
  width: 50%;
  margin: 0 auto;
  border-radius: 0.5em;
  padding: 2em 0;
}

.resume-section {
  border-bottom: 1px solid #dfdfdf;
}

.section-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1em 2em;
  row-gap: 1em;
  
}

.resume-supplier-indicators {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 1em;
  border-bottom: 1px solid #dfdfdf;
}

.sora-ultra-light {
  font-family: "Sora", sans-serif;
  font-weight: 100;
  font-optical-sizing: auto;
  font-style: normal;
}

.sora-extra-light {
  font-family: "Sora", sans-serif;
  font-weight: 200;
  font-optical-sizing: auto;
  font-style: normal;
}

.sora-light {
  font-family: "Sora", sans-serif;
  font-weight: 300;
  font-optical-sizing: auto;
  font-style: normal;
}

.sora-regular {
  font-family: "Sora", sans-serif;
  font-weight: 400;
  font-optical-sizing: auto;
  font-style: normal;
}

.sora-medium {
  font-family: "Sora", sans-serif;
  font-weight: 500;
  font-optical-sizing: auto;
  font-style: normal;
}

.sora-semibold {
  font-family: "Sora", sans-serif;
  font-weight: 600;
  font-optical-sizing: auto;
  font-style: normal;
}

.sora-bold {
  font-family: "Sora", sans-serif;
  font-weight: 700;
  font-optical-sizing: auto;
  font-style: normal;
}

.sora-extra-bold {
  font-family: "Sora", sans-serif;
  font-weight: 800;
  font-optical-sizing: auto;
  font-style: normal;
}

.sora-black {
  font-family: "Sora", sans-serif;
  font-weight: 900;
  font-optical-sizing: auto;
  font-style: normal;
}

.epilogue-ultra-light {
  font-family: "Epilogue", sans-serif;
  font-weight: 100;
  font-optical-sizing: auto;
  font-style: normal;
}

.epilogue-extra-light {
  font-family: "Epilogue", sans-serif;
  font-weight: 200;
  font-optical-sizing: auto;
  font-style: normal;
}

.epilogue-light {
  font-family: "Epilogue", sans-serif;
  font-weight: 300;
  font-optical-sizing: auto;
  font-style: normal;
}

.epilogue-regular {
  font-family: "Epilogue", sans-serif;
  font-weight: 400;
  font-optical-sizing: auto;
  font-style: normal;
}

.epilogue-medium {
  font-family: "Epilogue", sans-serif;
  font-weight: 500;
  font-optical-sizing: auto;
  font-style: normal;
}

.epilogue-semibold {
  font-family: "Epilogue", sans-serif;
  font-weight: 600;
  font-optical-sizing: auto;
  font-style: normal;
}

.epilogue-bold {
  font-family: "Epilogue", sans-serif;
  font-weight: 700;
  font-optical-sizing: auto;
  font-style: normal;
}

.epilogue-extra-bold {
  font-family: "Epilogue", sans-serif;
  font-weight: 800;
  font-optical-sizing: auto;
  font-style: normal;
}

.epilogue-black {
  font-family: "Epilogue", sans-serif;
  font-weight: 900;
  font-optical-sizing: auto;
  font-style: normal;
}

.process-step.active .step-text {
  font-family: "Sora", sans-serif;
  font-weight: 700;
  font-optical-sizing: auto;
  font-style: normal;
}

.resume-header {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 0 1em;
}

.icon-edit:hover path {
  stroke: #ff500b;
}

textarea::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

textarea::-webkit-scrollbar-thumb {
  background: #dfdfdf;
  /* Color del thumb */
  border-radius: 5px;
  /* Radio del borde del thumb */
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #555;
  cursor: pointer;
}

.btn-delete:hover svg {
  cursor: pointer;
  stroke: black;
}

.btn-delete-saved:hover svg {
  cursor: pointer;
}

.btn-edit:hover svg path {
  cursor: pointer;
  stroke: black;
}

.delete-product {
  width: 100%;
  margin: 0 auto;
  align-self: flex-end;
  text-align: end;
}

.delete-product svg:hover {
  cursor: pointer;
  stroke: supplierIndex black;
}
.product-list-collapsed {
  row-gap: 1em;
}
.product-list-collapsed .col-12:not(:first-child) {
  border-top: 1px solid #dfdfdf;
  padding-top: 1em;
}
.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1em;
  border-bottom: 1px solid #dfdfdf;
}
.product-header h4 {
  width: 100%;
}.product-details{
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
}
</style>