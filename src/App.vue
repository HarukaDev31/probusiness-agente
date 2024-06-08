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
    <main class="main-container" style="position:relative">
      <div id="first-row" class="d-flex flex-column flex-md-row gap-4">
        <div id="card-cliente" class="step step-1">
          <h1 class="fw-bold">Cliente</h1>
          <card class="card">
            <template #body>
              <!--Customized input with index pair-->
              <customized-input v-for="(input, index) in formValuesComputedPair" :key="index" :text="input.text"
                :optionalText="input.optionalText" :type="input.type" @input="(e) => (input.value = e)"
                :value="input.value" :validation="input.validate" :is-error="input.error" :prepend="input.prepend"
                :keyRender="input.keyRender" :class="`step step-${2 + index}`" />
            </template>
          </card>
        </div>
        <div id="description-step-1" style="position:absolute;height: auto;width:30vw;min-width: 300px;right: 0;"
          class=" hidden-description d-flex flex-column justify-content-end align-items-end">
          <div class="d-flex flex-column gap-2 card">
            <p>
              En esta sección,debés ingresar tus datos personales, como tu DNI/ID, nombres, apellidos y correo electrónico.
              Esto es muy importante para poder contactarte y enviarte la cotización.
            </p>
           
          </div>
          <div>
            <img class="mb-0 mb-sm-1 " style="border-radius: 50%" height="20%" width="100px"
              src="/src/assets/probusiness.png" alt="Logo ProBusiness">

          </div>
        </div>
        <div v-for="(desc, descIndex) in formValuesComputedPair"
          :id="`description-step-${descIndex + 2}`"
          style="position:absolute;height: auto;width:30vw;min-width: 300px;right: 0;"
          class=" hidden-description d-flex flex-column justify-content-end align-items-end"> 
          <div class="d-flex flex-column gap-2 card">
            <p>
              {{ desc.helpText }}
            </p>
          </div>
          <div>
            <img class="mb-0 mb-sm-1 " style="border-radius: 50%" height="20%" width="100px"
              src="/src/assets/probusiness.png" alt="Logo ProBusiness">
          </div>
        </div>
        
        <div id="card-empresa" :class="`step step-${formValuesComputedPair.length + 2}`">
          <h1 class="fw-bold">Empresa</h1>
          <card class="card">
            <template #body>
              <customized-input v-for="(input, index) in formValuesComputedOdd" :key="index" :text="input.text"
                :value="input.value" :optionalText="input.optionalText" :type="input.type"
                @input="(e) => (input.value = e)" :validation="input.validate" :is-error="input.error"
                :prepend="input.prepend" :keyRender="input.keyRender"
                :class="`step step-${3 + formValuesComputedPair.length + index}`" />

            </template>
          </card>
        </div>
        <div id="description-step-6" style="position:absolute;height: auto;width:30vw;min-width: 300px;right: 0;"
          class=" hidden-description d-flex flex-column justify-content-end align-items-end">
          <div class="d-flex flex-column gap-2 card">
            <p>
              En esta sección, deberás ingresar los datos de la empresa, como el nombre de la empresa y el RUC.
            </p>
            
          </div>
          <div>
            <img class="mb-0 mb-sm-1 " style="border-radius: 50%" height="20%" width="100px"
              src="/src/assets/probusiness.png" alt="Logo ProBusiness">

          </div>
        </div>
        <div v-for="(desc, descIndex) in formValuesComputedOdd" :id="`description-step-${descIndex + 3 + formValuesComputedPair.length}`"
          style="position:absolute;height: auto;width:30vw;min-width: 300px;left: 0;"
          class=" hidden-description d-flex flex-column justify-content-end align-items-start">
          <div class="d-flex flex-column gap-2 card">
            <p>
              {{ desc.helpText }}
            </p>
          </div>
          <div>
            <img class="mb-0 mb-sm-1 " style="border-radius: 50%" height="20%" width="100px"
              src="/src/assets/probusiness.png" alt="Logo ProBusiness">
          </div>
        </div>
      </div>
      <div id="second-row" >
        <div class="proveedores-container d-flex flex-column mt-3 align-items-center">
          <h1>Proveedores</h1>
          <customized-button @click="addNewSupplier()" v-if="suppliers.length == 0"
            :class="`step step-${3 + formValuesComputedPair.length + formValuesComputedOdd.length}`">
            <template #text>Agregar Proveedor</template>
          </customized-button>
          <div id="suppliers-list" class="mt-3" v-if="suppliers.length != 0">
            <card v-for="(supplier, supplierIndex) in suppliers" :key="supplierIndex" class="my-3" :background="currentSupplier.value != supplierIndex + 1 ? '#21618C' : 'white'
              ">
              <template #header>
                <div class="supplier-header d-flex flex-column flex-lg-row align-items-center"
                  @click="changeCurrentSupplier(supplierIndex + 1)">
                  <h2 class="w-100" :style="currentSupplier.value != supplierIndex + 1
                    ? 'color:white '
                    : ''
                    ">
                    <strong class="">PROVEEDOR {{ supplierIndex + 1 }}</strong>
                    <div class="btn btn-outline-danger" v-if="currentSupplier.value == supplierIndex + 1"
                      @click.stop="deleteSupplier(supplierIndex)">
                      Eliminar
                    </div>
                  </h2>

                  <div class="supplier-indicators d-flex flex-column flex-md-row gap-4 align-items-center"
                    v-if="currentSupplier.value == supplierIndex + 1">
                    <div class="supplier-indicator d-flex" v-for="(indicator, index) in supplier.indicators"
                      :key="`${supplierIndex}-${indicator.key}`">
                      <customized-input :value="indicator.value" :text="indicator.name" :type="indicator.type"
                        :key="`${supplierIndex}-${indicator.key}`" :optionalText="indicator.optionalText"
                        @input="(e) => (indicator.value = e)" v-if="indicator.key != 'proforma'"
                        :is-error="indicator.error" :options="indicator.options" :keyRender="indicator.keyRender"
                        @select="(e) => changeSelected(supplierIndex, e)" />

                      <file-selector v-else :not-show-drop="false" :multiple="true" :value="indicator.value"
                        @file-change="(files) => handleMultipleFiles(files, indicator)"
                        :accept="'image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'">
                        <template #button>
                          <div class="btn d-flex flex-column"
                            :class="indicator.value ? 'btn-dark' : 'btn-outline-secondary'">
                            Subir proforma y/o Packing
                            <small class="text-danger">
                              {{ indicator.value ? `(${indicator.value.length} archivo(s))` : '' }}
                            </small>
                          </div>
                        </template>
                      </file-selector>
                    </div>
                  </div>
                </div>
              </template>
              <template #body v-if="currentSupplier.value == supplierIndex + 1 &&
                supplier.products != 0
                ">
                <div v-for="(productList, productListIndex) in supplier.products" class="product-list row"
                  :key="productListIndex">
                  <div class="col-12 col-md-4">
                    <div v-for="(product, productItemIndex) in productList.filter(
                      (item) => item.type == 'file'
                    )" :key="`fileSelector-${productItemIndex}`" style="height: 100%">
                      <label class="fw-bold">Imagen</label>
                      <file-selector :not-show-drop="true" :multiple="false" :value="product.value"
                        @fileChange="(files) => handleFile(files, product)" :accept="'image/*'">
                        <template #text>Seleccionar foto</template>
                      </file-selector>
                    </div>
                  </div>
                  <div class="col-12 col-md-8">
                    <customized-input v-for="(product, productItemIndex) in productList.filter(
                      (item) => item.type != 'file'
                    )" :key="`${productListIndex}-${productItemIndex}`" :text="product.text"
                      :optionalText="product.optionalText" :type="product.type" :value="product.value"
                      @input="(e) => (product.value = e)" :is-error="product.error" :key-render="product.keyRender" />

                    <div class="btn btn-outline-danger w-100" @click="deleteProduct(productListIndex, supplierIndex)">
                      Quitar
                    </div>
                  </div>
                </div>
              </template>
            </card>
          </div>
          <div class="d-flex flex-column w-100 gap-2">
            <div class="btn btn-outline-danger" @click="addNewProductToSupplier(currentSupplier.value)"
              v-if="suppliers.length != 0">
              Agregar Producto
            </div>
            <customized-button @click="addNewSupplier()" v-if="suppliers.length != 0">
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
import { ref, computed, reactive, onMounted } from "vue";
import { sendCotization, getClientDataByDNIID } from "./services/send-cotization";
import Swal from 'sweetalert2';
const validateNotEmpy = (value) => {
  return value != "";
};
const validateNumber = (value) => {
  //validate if is a number and is more than 0 and less than 100
  return !isNaN(value) && value > 0 && value < 999999999;
};
const changeSelected = (supplierIndex, value) => {
  const supplier = suppliers.value[supplierIndex];
  const indicator = supplier.indicators.find((indicator) => indicator.key == "peso");
  indicator.options.forEach((option) => {
    option.selected = option.value == value;
  });
};
const getClientData = async (value) => {
  if (!validateNotEmpy(value)) return showAlert("Error al buscar cliente", "Debe ingresar un DNI/ID", 'error')
  try {
    isLoading.value = true
    const params = {
      dni: value
    }
    const response = await getClientDataByDNIID(params);

    formValues.value.forEach((input) => {
      if (response.tipoCliente == 0) {
        showAlert("Cliente no encontrado",
          `No se encontró un cliente con el DNI/ID ingresado`, 'error')
        return
      }
      if (response.tipoCliente == 2) {
        //NOTIFY USE COLLABORATOR CODE,GET CONGRATULATIONS
        showAlert("Bienvenido de vuelta!",
          `Al ser un socio, obtienes un descuento especial en tu cotización`, 'success')
        return
      }
      try {
        input.keyRender++

        input.value = response.clientData[0][input.key];
      } catch (e) {
        showAlert("Error al buscar cliente",
          `Hubo un error al buscar el cliente, por favor intente nuevamente`, 'error')

      }

    });
    isLoading.value = false
  }
  catch (e) {
    isLoading.value = false
    console.error(e)
  }
};
const formValues = ref([
  {
    text: "DNI/ID",
    key: "dni",
    optionalText: false,
    type: "text",
    value: "",
    validate: validateNotEmpy,
    error: false,
    prepend: {
      icon: 'bi bi-search',
      //send function to component and call it when icon is clicked
      action: getClientData
    },
    keyRender: 0,
    helpText: "Ingresa tu DNI/ID para buscar tus datos y dale click al icono de búsqueda para autocompletar tus datos."
  },

  {
    text: "Whatsapp",
    key: "whatsapp",
    optionalText: false,
    type: "text",
    value: "",
    validate: validateNumber,
    error: false,
    keyRender: 0,
    helpText: "Ingresa tu número de whatsapp para poder contactarte."

  },
  {
    text: "Nombres",
    key: "nombres",
    optionalText: false,
    type: "text",
    value: "",
    validate: validateNotEmpy,
    error: false,
    keyRender: 0,
    helpText: "Ingresa tus nombres completos."
  },

  {
    text: "Nombre de la empresa",
    key: "empresa",
    optionalText: true,
    type: "text",
    value: "",
    error: false,
    keyRender: 0,
    helpText: "Ingresa el nombre de la empresa a la que perteneces. Si no tienes empresa, déjalo en blanco."
  },
  {
    text: "Apellidos",
    key: "apellidos",
    optionalText: false,
    type: "text",
    value: "",
    validate: validateNotEmpy,
    error: false,
    keyRender: 0,
    helpText: "Ingresa tus apellidos completos."
  },

  {
    text: "RUC",
    key: "ruc",
    optionalText: true,
    type: "text",
    value: "",
    error: false,
    keyRender: 0,
    helpText: "Ingresa el RUC de la empresa a la que perteneces. Si no tienes empresa, déjalo en blanco."
  },
  {
    text: "Email",
    key: "email",
    optionalText: false,
    type: "email",
    value: "",
    validate: validateNotEmpy,
    error: false,
    keyRender: 0,
    helpText: "Ingresa tu correo electrónico."
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
  currentSupplier.value = index;



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
const addNewSupplier = () => {
  const newSupplierIndicators = supplierIndicators.value.map(indicator => ({
    ...indicator,
    options: indicator.options ? indicator.options.map(option => ({ ...option })) : undefined
  }));

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
    keyRender: 0
  },
  {
    text: "Uso",
    optionalText: false,
    type: "text",
    key: "uso",
    value: "",
    error: false,
    keyRender: 0

  },
  {
    text: "Cantidad",
    optionalText: false,
    type: "number",
    key: "cantidad",
    value: "",
    error: false,
    keyRender: 0

  },
  {
    text: "Valor Unitario",
    optionalText: false,
    type: "number",
    key: "valor",
    value: "",
    error: false,
    keyRender: 0

  },
  {
    text: "Agregar Foto",
    optionalText: false,
    type: "file",
    key: "foto",
    value: null,
    error: false,
    keyRender: 0

  },
  {
    text: "Link",
    optionalText: true,
    key: "link",
    type: "link",
    value: "",
    error: false,
    keyRender: 0

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
    keyRender: 0
  },
  {
    name: "PESO TOTAL",
    type: "number",
    options: [
      { text: "Kg", value: "Kg", selected: false },
      { text: "Tn", value: "Tn", selected: false },
    ],
    key: "peso",
    value: "",
    error: false,
    optionalText: true,
    keyRender: 0

  },

]);
const suppliers = ref([]);

const showAlert = (title, text, icon, fn = null, go = "OK") => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: go,
    confirmButtonColor: '#21618C',
  }).then((result) => {
    if (result.isConfirmed) {
      if (fn) {
        fn()
      }
    }
  });
}
const redirectoWhatsapp = (num) => {
  window.open(`https://wa.me/${num}`, '_blank')
}
const sendCotizacion = async () => {
  //send all in formdata format
  const formData = new FormData();
  let isValid = true;
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
    showAlert("Error al enviar la cotización",
      `Debe agregar al menos un proveedor para enviar la cotización`, 'error')
    return;
  }
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
        } else if (indicator.key == "peso") {
          const existsSelected = indicator.options.find(option => option.selected)
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
        }
        else {
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
    isLoading.value = true
    const response = await sendCotization(formData);
    isLoading.value = false
    if (response.status == 201) {
      showAlert("Cotización enviada",
        `Su cotización ha sido registrada con el codigo N° ${response.code} ¡Gracias por confiar en nosotros!
      Contactanos para mas informacion al whatsapp +51 991 351 346
      `, 'success', () =>
        redirectoWhatsapp("+51991351346"), "!Contactanos!"
      )
      //clear all values 

      currentSupplier.value = 0;
      suppliers.value = [];
      formValues.value.forEach((input) => {
        input.value = "";
        input.keyRender++
      });

    } else {
      showAlert("Error al enviar la cotización",
        `Hubo un error al enviar la cotización, por favor intente nuevamente`, 'error')
    }
  } catch (e) {
    showAlert("Error al enviar la cotización",
      e.message, 'error')
    isLoading.value = false
    //set empty files  in suppliers 
    currentSupplier.value = 0;
    suppliers.value = []
    console.error(e)
  }
};
const deleteSupplier = (index) => {
  suppliers.value.splice(index, 1);
  if (suppliers.value.length == 0) {
    currentSupplier.value = 0;
  } else {
    currentSupplier.value = index > 0 ? index : 0;
  }
};
const isLoading = ref(false)
const isInStepByStep = ref(false)
const startStepByStep = () => {
  try {
    isInStepByStep.value = true
    let currentStep = 1;
    let stepTag = document.querySelector(`.step-${currentStep}`)
    stepTag.classList.add('step-active');
    let descriptionTag = document.querySelector(`#description-step-${currentStep}`)
    descriptionTag.classList.remove('hidden-description')
    descriptionTag.classList.add('show-description')
    //SET INTERVAL TO CHANGE STEPS
    let interval = setInterval(() => {
      try {
        stepTag.classList.remove('step-active');
        if (descriptionTag) {
          descriptionTag.classList.remove('show-description')
          descriptionTag.classList.add('hidden-description')
        }
        currentStep++;
        stepTag = document.querySelector(`.step-${currentStep}`)
        //if steptag not visible in the screen scroll to it
        if (stepTag) {
          stepTag.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }
        descriptionTag = document.querySelector(`#description-step-${currentStep}`)
        console.log(currentStep,stepTag,descriptionTag,formValuesComputedPair.value.length + formValuesComputedOdd.value.length + 3)
        //if steptag is ! from 1 and 5
        if (currentStep != 1 && currentStep != 6 && currentStep !== formValuesComputedPair.value.length + formValuesComputedOdd.value.length + 3) {
          stepTag.style.backgroundColor = "white"
        }
        if(currentStep !== formValuesComputedPair.value.length + formValuesComputedOdd.value.length + 3){
          //click on the input
          
        }
        stepTag.classList.add('step-active');
        if (descriptionTag) descriptionTag.classList.add('show-description')
        if (currentStep >= formValuesComputedPair.value.length + formValuesComputedOdd.value.length + 3) {

          setTimeout(() => {
            clearInterval(interval)
            stepTag.classList.remove('step-active');
            isInStepByStep.value = false
          }, 1000);
        }
      }
      catch (e) {
        console.error(e)
        clearInterval(interval)
        isInStepByStep.value = false
      }
    }, 100);
  } catch (e) {
    console.error(e)
  }

}
// onMounted(() => {
//   startStepByStep()
// })
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

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
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
}

.show-description {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  z-index: 1000000;

}

@keyframes opacity {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }

}
</style>