<template>
  <footer class="pt-4 mt-5 pt-md-5 border-top footer">
    <div class="row footer-items mx-auto ">
      <div class="col-12 col-md-3 logo">
        <img class="mb-2" src="/src/assets/logo-footer.png" alt="ProBusiness" title="ProBusiness" width="150" />
      </div>
      <div class="col-12 col-md-2 item">
        <h5 class=" mb-4 epilogue-medium text-white">Empresa</h5>
        <ul class="list-unstyled text-small">
          <li class="mb-3"><a class="link-secondary text-decoration-none epilogue-light"
              href="https://www.probusiness.pe/nosotros">Nosotros</a></li>
          <li class="mb-3"><a class="link-secondary text-decoration-none epilogue-light"
              href="https://www.probusiness.pe/politicas">Política de Privacidad</a></li>
          <li class="mb-3"><a class="link-secondary text-decoration-none epilogue-light"
              href="https://agentecompra.probusiness.pe/terminos">Términos y condiciones</a></li>
        </ul>
      </div>
      <div class="col-12 col-md-2 item">
        <h5 class=" mb-4 epilogue-medium text-white">Redes Sociales</h5>
        <ul class="list-unstyled text-small">
          <li class="mb-3"><a class="link-secondary text-decoration-none epilogue-light"
              href="https://www.tiktok.com/@pro_business_impo" alt="ProBusiness" title="ProBusiness" target="_blank"
              rel="noopener noreferrer"><font-awesome-icon :icon="['fab', 'tiktok']" /> Tiktok</a></li>
          <li class="mb-3"><a class="link-secondary text-decoration-none epilogue-light"
              href="https://www.instagram.com/probusinesspe/" alt="ProBusiness" title="ProBusiness" target="_blank"
              rel="noopener noreferrer"><font-awesome-icon :icon="['fab', 'instagram']" /> Instagram</a></li>
          <li class="mb-3"><a class="link-secondary text-decoration-none epilogue-light"
              href="https://www.facebook.com/Probusinesspe" alt="ProBusiness" title="ProBusiness" target="_blank"
              rel="noopener noreferrer"><font-awesome-icon :icon="['fab', 'facebook']" /> Facebook</a></li>
          <li class="mb-3"><a class="link-secondary text-decoration-none epilogue-light"
              href="https://www.youtube.com/@MiguelVillegasImportaciones" alt="ProBusiness" title="ProBusiness"
              target="_blank" rel="noopener noreferrer"><font-awesome-icon :icon="['fab', 'youtube']" /> Youtube</a>
          </li>
        </ul>
      </div>
      <div class="col-12 col-md-2 item">
        <h5 class=" mb-4 epilogue-medium text-white">Contacto</h5>
        <ul class="list-unstyled text-small">
          <li class="mb-3"><a class="link-secondary text-decoration-none epilogue-light" href="tel:+51913656663"
              target="_blank" rel="noopener noreferrer"><font-awesome-icon :icon="['fas', 'phone']" /> (+51) 913 656
              663</a></li>
          <li class="mb-3"><a class="link-secondary text-decoration-none epilogue-light"
              href="mailto:info@probusiness.pe" target="_blank" rel="noopener noreferrer"><font-awesome-icon
                :icon="['fas', 'envelope']" /> info@probusiness.pe</a></li>
          <li class="mb-3"><a class="link-secondary text-decoration-none epilogue-light"
              href="https://maps.app.goo.gl/mVnw7c1xdwsSciSx5" target="_blank"
              rel="noopener noreferrer"><font-awesome-icon :icon="['fas', 'map-pin']" /> Alberto Barton 527 - La
              Victoria - Perú</a></li>
        </ul>
      </div>
    </div>
    <div class="separator"></div>
    <p class="m-0 epilogue-regular reserved" style="color:#757575">©2024 Probusiness. Todos los derechos reservados</p>
  </footer>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<style scoped>
.footer {
  width: 100%;
  margin: 0 auto;
  background: black;
  padding-left: 8em;
  padding-right: 8em;
}

.footer-items {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .reserved {
    text-align: center;
    padding-top: 2em;
    padding-bottom: 2em;
  }

  .footer {
    padding-left: 3em;
    padding-right: 3em;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    display: flex;
    margin: 0 auto;
    width: 100%;
  }

  .footer-items {
    display: flex;
    flex-direction: column;
    row-gap: 3em;
  }

  .footer-items .item::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: #585858;
  }

  .footer-items .logo {
    padding-top: 4em;
    padding-bottom: 4em;
  }
}
</style>
