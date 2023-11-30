<template>
  <div id="app" class="container">
    <div class="w-auto">
      <h1>Registros</h1>
    </div>
    <div class="row">
      <agregar-manual/>
      <tabla-personas/>
    </div>
  </div>
</template>

<script>
import TablaPersonas from './components/TablaPersonas.vue';
import AgregarManual from './components/AgregarManual.vue';

export default {
name: 'App',
components: {
  TablaPersonas,
  AgregarManual,
}
}
</script>

<style>
#app {
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
margin-top: 60px;
}
</style>
