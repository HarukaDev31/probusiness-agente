<template>
    <div id="div-footer-cart" class="fixed-bottom mt-auto py-3 bg-white footer-cart-shadow">
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="d-grid">
              <button type="submit" id="btn-enviar_pedido" class="btn btn-success btn-lg col" @click="sendCotizacion">Enviar pedido</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
const emit=defineEmits(['sendCotizacion'])
const sendCotizacion = () => {
    emit('sendCotizacion')
}
</script>

<style scoped>
#div-footer-cart {
    box-shadow: 0 -10px 10px rgba(0,0,0,0.1);
}
</style>