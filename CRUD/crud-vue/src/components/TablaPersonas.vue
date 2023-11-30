<template>
  <div id="tabla-personas">
      <table class="table">
          <thead>
              <tr>
                  <th>Nombre y Apellido</th>
                  <th>DNI</th>
                  <th>Telefono</th>
                  <th>E-mail</th>
                  <th>Tipo</th>
                  <th>Cant</th>
                  <th>Entrada</th>
                  <th>Salida</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="persona in datosPaginados" :key="persona.id">
                  
                  <td v-if= "editando === persona.id">
                      <input type="text" class="form-control" v-model="persona.nombre">
                  </td>
                  <td v-else>{{ persona.nombre }}</td>

                  <td v-if= "editando === persona.id">
                      <input type="text" class="form-control" v-model="persona.dni">
                  </td>
                  <td v-else>{{ persona.dni }}</td>

                  <td v-if= "editando === persona.id">
                      <input type="text" class="form-control" v-model="persona.tel">
                  </td>
                  <td v-else>{{ persona.tel }}</td>

                  <td v-if= "editando === persona.id">
                      <input type="text" class="form-control" v-model="persona.email">
                  </td>
                  <td v-else>{{ persona.email }}</td>

                  <td v-if= "editando === persona.id">
                      <select
                          v-model="persona.tipo"
                          class="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          >
                          <option value="bungalow">Bungalow</option>
                          <option value="cabana">Cabaña</option>
                      </select>
                  </td>
                  <td v-else>{{ persona.tipo }}</td>

                  <td v-if= "editando === persona.id">
                      <input
                      type="number"
                      min="1"
                      max="6"
                      class="form-control"
                      v-model="persona.cantidad"
                      />
                  </td>
                  <td v-else>{{ persona.cantidad }}</td>

                  <td v-if= "editando === persona.id">
                      <input type="date" class="form-control" v-model="persona.entrada">
                  </td>
                  <td v-else>{{ persona.entrada }}</td>

                  <td v-if= "editando === persona.id">
                      <input type="date" class="form-control" v-model="persona.salida">
                  </td>
                  <td v-else>{{ persona.salida }}</td>

                  <td v-if="editando === persona.id">
                      <button
                      class="btn btn-success ml-2"
                      @click="guardarPersona(persona)"
                      >Guardar
                      </button>
                      <button
                      class="btn btn-secondary ml-2"
                      @click="cancelarEdicion(persona)"
                      >Cancelar
                      </button>
                  </td>

                  <td v-else>
                      <button class="btn btn-danger" @click="eliminarPersona(persona.id)">
                      Eliminar
                      </button>
                      <button class="btn btn-info ml-2" @click="editarPersona(persona)">
                      Editar
                      </button>
                  </td>

              </tr>
          </tbody>
      </table>
      <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
              <li class="page-item" v-on:click="getPreviousPage()">
                  <a class="page-link" href="#">Previous</a>
              </li>
              <li
              v-for="pagina in totalPaginas()"
              :key="pagina"
              v-on:click="getDataPagina(pagina)"
              class="page-item"
              v-bind:class="isActive(pagina)"
              >
                  <a class="page-link" href="#">{{ pagina }}</a>
              </li>
              <li class="page-item" v-on:click="getNextPage()">
                  <a class="page-link" href="#">Next</a>
              </li>
          </ul>
      </nav>
  </div>
</template>

<script>
  export default{
      name: 'tabla-personas',
      props:{
          
      },
  
      data(){
          return{
              
              url:'http://127.0.0.1:5000/registros',
              personas:[],
              cargando: true,
              error: false,
              elementosPorPagina: 10,
              datosPaginados:[],
              paginaActual: 1,
              idPersonaEditada: null,
              editando: null,
          }
      },

      mounted(){
          this.fetchData(this.url);
          
      },

      methods:{
          async fetchData(url){
              try{
                  const response = await fetch(url);
                  const data = await response.json();
                  this.personas = data;
                  this.cargando = false;
                  this.getDataPagina(1)
                  } catch(err){
                  console.log(err);
                  this.error = true;
              }
          },

          totalPaginas(){
              return Math.ceil(this.personas.length /this.elementosPorPagina);
          },

          getDataPagina(noPagina){
              this.paginaActual = noPagina;
              this.datosPaginados = [];

              let ini = (noPagina * this.elementosPorPagina) - this.elementosPorPagina;
              let fin = (noPagina * this.elementosPorPagina);
              
              this.datosPaginados = this.personas.slice(ini, fin);
          },
          
          getPreviousPage() {
              if (this.paginaActual > 1) {
                  this.paginaActual--;
              }
              this.getDataPagina(this.paginaActual);
          },
          getNextPage() {
              if (this.paginaActual < this.totalPaginas()) {
                  this.paginaActual++;
              }
              this.getDataPagina(this.paginaActual);
          },

          isActive(noPagina){
              return noPagina == this.paginaActual ? 'active' : '';
          },

          async eliminarPersona(id){
              
              try {
                  const response = await fetch(`http://localhost:5000/registros/${id}}`, {
                      method: 'DELETE',
                  });
                  if (response.ok){
                      console.log('Persona con ID ${id} se ha eliminado');
                      this.fetchData(this.url);
                  }else{
                      console.error('Error al intentar eliminar ${id}');
                  }
              }catch (error){
                  console.error(error);
              }   
          },

          editarPersona(persona) {
              this.personaEditada = Object.assign({}, persona);
              this.idPersonaEditada = persona.id;
              this.editando = persona.id;
              console.log(`Editando persona con ID ${this.idPersonaEditada}`);
          },

          cancelarEdicion(persona){
              Object.assign(persona, this.personaEditada);
              this.editando = null;
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

          async guardarPersona(persona){
              const personaSinId = this.eliminarCampoId(persona);
                  

              try{
                  const response = await fetch(`${this.url}/${persona.id}`,{
                      method: 'PUT',
                      headers:{
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(personaSinId),
                  });

                  if(!response.ok){
                      throw new Error('Error en la solicitud PUT: ${response.statusText}');
                  }
                  const data = await response.json();
                      console.log('Solicitud PUT exitosa', data);
                      this.reiniciarVariables();
                      this.fetchData(this.url);
                  } catch (error) {
                      console.error(error);
                  }
          },

          reiniciarVariables(){
              this.editando = null;
              this.idPersonaEditada = null;
          },
      }
  };   


</script>

<style>

</style>