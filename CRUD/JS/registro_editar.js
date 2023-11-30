console.log(location.search) // lee los argumentos pasados a este formulario
var id = location.search.substr(4)
console.log(id)
const { createApp } = Vue
createApp({
    data() {
        return {
            id: 0,
            nombre: "",
            tel: "",
            email:"",
            tipo:"",
            cantidad:0,
            entrada:"",
            salida:"",
            dni:"",
            url: 'http://127.0.0.1:5000/registros/' + id,
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {

                    console.log(data)
                    this.id = data.id
                    this.nombre = data.nombre;
                    this.tel = data.tel
                    this.email = data.email
                    this.tipo = data.tipo
                    this.cantidad = data.cantidad
                    this.entrada = data.entrada
                    this.salida = data.salida
                    this.dni = data.dni 
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        modificar() {
            let producto = {
                nombre: this.nombre,
                tel: this.tel, 
                email: this.email,
                tipo: this.tipo,
                cantidad: this.cantidad, 
                entrada: this.entrada,
                salida: this.salida,
                dni: this.dni  
            }
            var options = {
                body: JSON.stringify(registro),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./registros.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')