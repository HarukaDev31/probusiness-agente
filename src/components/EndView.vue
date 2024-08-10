<template>
    <div class="quote-sent-card">
      <div class="card-content">
        <div class="success-icon">✓</div>
        <h2 class="headline">Cotización enviada</h2>
        <p class="subtitle">Se ha enviado la cotización</p>
      </div>
      <div class="card-actions">
        <button @click="back" class="back-button">Volver</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['back'])
  
  const back = () => {
    emit('back')
  }
  </script>
  
  <style scoped>
  .quote-sent-card {
    max-width: 400px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 24px;
  }
  
  .card-content {
    margin-bottom: 24px;
  }
  
  .success-icon {
    font-size: 64px;
    color: #4caf50;
    margin-bottom: 16px;
  }
  
  .headline {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }
  
  .subtitle {
    font-size: 16px;
    color: #666;
    margin-bottom: 0;
  }
  
  .card-actions {
    padding-top: 16px;
  }
  
  .back-button {
    width: 100%;
    padding: 12px 24px;
    background-color: #1976d2;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
  }
</style>