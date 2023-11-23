document.addEventListener("DOMContentLoaded", function () {
    const enviarbtn = document.getElementById("reservar-ok");
    const formulario = document.querySelector('#formulario');
    
    const emailValido = email => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const validacion = (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre");
        const dni = document.getElementById("dni");
        const email = document.getElementById("email");
        const tel = document.getElementById("tel");
        
        if (nombre.value == "" || nombre.value.length == 0) {
            alert("Ingrese su nombre por favor");
            nombre.focus();
            return false;
        }
        if (dni.value == "" || dni.value.length == 0) {
            alert("Ingrese su DNI por favor");
            dni.focus();
            return false;
        }
        if (email.value == "") {
            alert("Ingrese su correo");
            email.focus();
            return false;
        }
        if (!emailValido(email.value)) {
            alert("Ingrese un correo válido por favor");
            email.focus();
            return false;
        }
        if (tel.value == "" || /^\s+$/.test(tel.value)) {
            alert("Ingrese un teléfono de contacto");
            tel.focus();
            return false;
        }

        procesadatos();

        cerrarmenu();
        alert("Sus datos se enviaron correctamente");
        return true;
    }

    function cerrarmenu() {
        var sectionReserva = document.querySelector(".section-reserva");
        sectionReserva.classList.remove("mostrar");
    }

    function procesadatos() {
        const form = document.getElementById('formulario');
        const datos = new FormData(form);
        const datoscompletos = {};
    
        datos.forEach((value, key) => {
            datoscompletos[key] = value;
        });
    
        fetch("https://Randomdev90.pythonanywhere.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datoscompletos),
        });
    }

    enviarbtn.addEventListener('click', validacion);
});

