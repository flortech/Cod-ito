const { createApp } = Vue
createApp({
    data() {
        return {
            registros: [],
            url: 'http://127.0.0.1:5000/registros', // si ya lo subieron a pythonanywhere
            error: false,
            cargando: true,
            /*atributos para el guardar los valores del formulario */
            id: "",
            nombre: "",
            tel: "",
            email: "",
            tipo:"",
            cantidad: "",
            entrada:"",
            salida:"",
            dni:"",
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)

                .then(response => response.json())
                .then(data => {
                    this.registros = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(registro) {
            const url = this.url + '/' + registro;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.json())
                .then(res => {
                    location.reload();
                })
        },
        grabar() {
            let registro = {
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
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./registros.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabarr")

                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')