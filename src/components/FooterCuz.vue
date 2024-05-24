<template>
  <footer class="pt-4 my-md-5 pt-md-5 pb-5 border-top footer">
    <div class="separator"></div>
    <div class="row ">
      <div class="col-12 col-md">
        <img class="mb-2" src="https://agentecompra.probusiness.pe/assets/images/logo_probusiness.png?ver=5.0.0" alt="" height="60">
        <small class="d-block mb-3 text-body-secondary">© 2017 – 2024</small>
      </div>
      <div class="col-6 col-md">
        <h5 class="fw-bold mb-4">Empresa</h5>
        <ul class="list-unstyled text-small">
          <li class="mb-3"><a class="link-secondary text-decoration-none" href="#">Nosotros</a></li>
          <li class="mb-3"><a class="link-secondary text-decoration-none" href="#">Política de Privacidad</a></li>
          <li class="mb-3"><a class="link-secondary text-decoration-none" href="https://agentecompra.probusiness.pe/terminos">Términos y condiciones</a></li>
        </ul>
      </div>
      <div class="col-6 col-md">
        <h5 class="fw-bold mb-4">Redes Sociales</h5>
        <ul class="list-unstyled text-small">
          <li class="mb-3"><a class="link-secondary text-decoration-none" href="https://www.tiktok.com/@pro_business_impo" alt="ProBusiness" title="ProBusiness" target="_blank" rel="noopener noreferrer"><font-awesome-icon :icon="['fab', 'tiktok']" /> Tiktok</a></li>
          <li class="mb-3"><a class="link-secondary text-decoration-none" href="https://www.instagram.com/probusinesspe/" alt="ProBusiness" title="ProBusiness" target="_blank" rel="noopener noreferrer"><font-awesome-icon :icon="['fab', 'instagram']" /> Instagram</a></li>
          <li class="mb-3"><a class="link-secondary text-decoration-none" href="https://www.facebook.com/Probusinesspe" alt="ProBusiness" title="ProBusiness" target="_blank" rel="noopener noreferrer"><font-awesome-icon :icon="['fab', 'facebook']" /> Facebook</a></li>
          <li class="mb-3"><a class="link-secondary text-decoration-none" href="https://www.youtube.com/@MiguelVillegasImportaciones" alt="ProBusiness" title="ProBusiness" target="_blank" rel="noopener noreferrer"><font-awesome-icon :icon="['fab', 'youtube']" /> Youtube</a></li>
        </ul>
      </div>
      <div class="col-12 col-md">
        <h5 class="fw-bold mb-4">Contacto</h5>
        <ul class="list-unstyled text-small">
          <li class="mb-3"><a class="link-secondary text-decoration-none" href="tel:+51913656663" target="_blank" rel="noopener noreferrer"><font-awesome-icon :icon="['fas', 'phone']" /> (+51) 913 656 663</a></li>
          <li class="mb-3"><a class="link-secondary text-decoration-none" href="mailto:info@probusiness.pe" target="_blank" rel="noopener noreferrer"><font-awesome-icon :icon="['fas', 'envelope']" /> info@probusiness.pe</a></li>
          <li class="mb-3"><a class="link-secondary text-decoration-none" href="https://maps.app.goo.gl/mVnw7c1xdwsSciSx5" target="_blank" rel="noopener noreferrer"><font-awesome-icon :icon="['fas', 'map-pin']" /> Alberto Barton 527 - La Victoria - Perú</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<style scoped>
.footer {
    width: 80%!important;
    margin: 0 auto;
}
@media (max-width: 568px) {
    .separator {
        border-top: 1px solid #D7DBDD;
        width: 100%;
        height: 1px;
    }
}
</style>
