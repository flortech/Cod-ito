document.addEventListener("DOMContentLoaded", function () {
    const enviarbtn = document.getElementById("mnjbtn");   

    const emailValido = email => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const validacion = (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre");
        const correo = document.getElementById("correo");
        const mensaje = document.getElementById("mensaje");

        if (nombre.value == "" || nombre.value.length == 0) {
            alert("Ingrese su nombre por favor");
            nombre.focus();
            return false;
        }
        
        if (correo.value == "") {
            alert("Ingrese su correo");
            correo.focus(); // Cambiado de 'email' a 'correo'
            return false;
        }
        if (!emailValido(correo.value)) {
            alert("Ingrese un correo válido por favor");
            correo.focus();
            return false;
        }

        if (mensaje.value == "" || mensaje.value.length == 0) {
            alert("Ingrese su mensaje");
            mensaje.focus(); // Cambiado de 'nombre' a 'mensaje'
            return false;
        }
        
        alert("Su mensaje se envió correctamente");
        borrarform();
        return true;
    }

    enviarbtn.addEventListener('click', validacion);
    
    function borrarform() {
        var form = document.querySelector("form");
        form.reset();
    }
});
