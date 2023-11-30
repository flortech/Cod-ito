<template>
    <div id="agregar-manual">
        <form @submit.prevent="enviarFormulario">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-3">
                        <div class="form-grup"><label for="">Nombre y Apellido</label></div>
                        <input v-model="persona.nombre" type="text" class="form-control" :class="{ 'is invalid' : procesando && nombreInvalido}" @focus="resetEstado">
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3">
                        <div class="form-grup"><label for="">DNI</label></div>
                        <input v-model="persona.dni" type="text" class="form-control">
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3">
                        <div class="form-grup"><label for="">Telefono</label></div>
                        <input v-model="persona.tel" type="text" class="form-control" :class="{'is invalid' : procesando && telInvalido}" @focus="resetEstado">
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3">
                        <div class="form-grup"><label for="">E-mail</label></div>
                        <input v-model="persona.email" type="email" class="form-control">
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="form-group mb-0"><label>Tipo</label></div>
                    <select v-model="persona.tipo" class="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option value="bungalow">Bungalow</option>
                        <option value="cabana">Cabaña</option>
                    </select>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="form-group mb-0"><label for="cantidad">Cantidad</label></div>
                    <input v-model="persona.cantidad" type="number" id="cantidad" name="cantidad" max="6" min="1" class="form-control">
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3">
                        <div class="form-grup"><label for="">Entrada</label></div>
                        <input v-model="persona.entrada" type="date" required class="form-control">
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3">
                        <div class="form-grup"><label for="">Salida</label></div>
                        <input v-model="persona.salida" type="date" required class="form-control">
                    </div>
                </div>
                <div class="row col-sm-12 col-md-6 col-lg-3">
                    <div class="form-group"><button class="btn btn-primary " >Añadir</button></div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-sm12 col-md-6 col-lf-3">
                        <div v-if="error && procesando" class="alert alert-danger" role="alert">Debes rellenar todos los campos</div>
                    </div>
                    <div class="col-sm12 col-md-6 col-lf-3">
                        <div v-if="correcto" class="alert alert-success" role="alert">Información enviada correctamente</div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default{
        name: 'agregar-manual',
        data(){
            return{
                procesando: false,
                correcto: false,
                error: false,
                persona:{
                    nombre:'',
                    dni:'',
                    tel:'',
                    email:'',
                    tipo:'',
                    cantidad:'',
                    entrada:'',
                    salida:'',
                },
            }
        },
        methods: {
            async enviarFormulario() {
                this.procesando = true,
                this.resetEstado();

                if (this.nombreInvalido || this.telInvalido){
                    this.error = true;
                    return;
                }
                try {
                    const formData = new FormData();
                    formData.append('nombre', this.persona.nombre); 
                    formData.append('dni', this.persona.dni);
                    formData.append('tel', this.persona.tel);
                    formData.append('email', this.persona.email);
                    formData.append('tipo', this.persona.tipo);
                    formData.append('cantidad', this.persona.cantidad);
                    formData.append('entrada', this.persona.entrada);
                    formData.append('salida', this.persona.salida);

                    const response = await fetch('http://127.0.0.1:5000/registros', {
                        method: 'POST',
                        body: formData,
                    });

                    if (response.ok) {

                        console.log('Registro enviado con éxito');
                        
                        this.error = false;
                        this.correcto = true;
                        this.procesando = false;

                        this.persona = {
                                nombre: '',
                                dni: '',
                                tel: '',
                                email: '',
                                tipo: '',
                                cantidad: '',
                                entrada: '',
                                salida: '',
                            };
                        
                    } else {

                        console.error('Error al enviar el registro');
                        }
                } catch (error) {
                        console.error(error);
                    }
            },
            resetEstado(){
                this.correcto =false;
                this.error = false;
            },
        },
        computed:{
            nombreInvalido(){
                return this.persona.nombre.length < 1;
            },
            telInvalido(){
                return this.persona.tel.length < 1;
            },
        },
        
    };
</script>

<style  scoped>
    form{
        margin-bottom: 2rem;
    }

</style>