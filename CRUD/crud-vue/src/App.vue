<template>
  <div id="app" class="container">
    <div class="row">
      <div class="w-auto">
        <h1>Registros</h1>
      </div>
    </div>
    <div class="row">
      <div class="w-auto">
        <agregar-manual @registro-exitoso="actualizarTablaPersonas"/>
        <tabla-personas :personas="personas" @guardarFinalizado="reiniciarVariables" @eliminar-persona ="guardarIdPersona" @guardar-persona = "guardarPersona"/>
        <div>{{ mensajeEliminacion }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {emit} from 'vue'
import TablaPersonas from '@/components/TablaPersonas.vue'
import AgregarManual from './components/AgregarManual.vue';

export default {
  name: 'app',
  components:{
    TablaPersonas,
    AgregarManual,
  },
  data(){
    return{
      actualizarComponente: [],
      personaEditada: [],
      personas:[],
      url:'http://127.0.0.1:5000/registros',
      error:false,
      cargando:true,
      idPersonaEliminar: null,
      mensajeEliminacion: '',
      id:0,
      nombre:'',
      dni:'',
      tel:'',
      email:'',
      tipo:'',
      cantidad:'',
      entrada:'',
      salida:'',
    }
  },
  methods: {
    async fetchData(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        this.personas = data;
        this.cargando = false;
      } catch (err) {
        console.error(err);
        this.error = true;
      }
    },
    actualizarTablaPersonas(){
      this.fetchData(this.url);
    },
    guardarIdPersona(id) {
      this.idPersonaEliminar = id;
      console.log(`Evento delete persona ${id}`);
      this.eliminarPersona();
    },
    async eliminarPersona() {
      if (!this.idPersonaEliminar) {
        console.error('No se proporcionó un ID de persona para eliminar.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/registros/${this.idPersonaEliminar}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log(`Persona con ID ${this.idPersonaEliminar} eliminada con éxito`);
          this.mensajeEliminacion = `La persona con ID ${this.idPersonaEliminar} se ha eliminado del registro.`;
          this.limpiarMensaje();
          this.fetchData(this.url);
          emit('actualizarComponente');
          
        } else {
          console.error(`Error al eliminar la persona con ID ${this.idPersonaEliminar}`);
        }
      } catch (error) {
        console.error(error);
      }

      this.idPersonaEliminar = null;
    },
    limpiarMensaje() {
      setTimeout(() => {
        this.mensajeEliminacion = '';
        }, 5000); 
      },
    
    eliminarCampoId(persona) {
      const personaSinId = { ...persona };  
        for (const key in personaSinId) {
          if (key === 'id') {
            delete personaSinId[key];  
            break;  
          }
        }
      return personaSinId;
    },

    async guardarPersona(datosEditados) {
    const { id, persona } = datosEditados;
    const personaSinId = this.eliminarCampoId(persona);
    
    console.log(personaSinId);

    try {
        const response = await fetch(`http://127.0.0.1:5000/registros/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(personaSinId),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud PUT: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Solicitud PUT exitosa', data);
        emit('guardarFinalizado');
    } catch (error) {
        console.error(error);
    }
  },
  
  },

  created(){
        this.fetchData(this.url);
      }, 
};

</script>

/<style scoped>

</style>