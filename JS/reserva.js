document.addEventListener("DOMContentLoaded", function () {
    const enviarbtn = document.getElementById("reservar-ok");
    const formulario = document.getElementById('formulario');

    const emailValido = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const mostrarAlerta = (mensaje) => {
        alert(mensaje);
    }

    const cerrarMenu = () => {
        const sectionReserva = document.querySelector(".section-reserva");
        sectionReserva.classList.remove("mostrar");
    }

    const procesarDatos = async () => {
        try {
            const datos = new FormData(formulario);

            const response = await fetch("http://127.0.0.1:5000/registros", {
                method: "POST",
                headers: {
                    // No es necesario establecer Content-Type para FormData
                },
                body: datos,
            });

            if (!response.ok) {
                throw new Error("Error al enviar datos");
            }

            mostrarAlerta("Sus datos se enviaron correctamente");
        } catch (error) {
            console.error("Error:", error);
            mostrarAlerta("Hubo un problema al enviar los datos");
        }
    };

    const validarFormulario = (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre");
        const dni = document.getElementById("dni");
        const email = document.getElementById("email");
        const tel = document.getElementById("tel");

        if (nombre.value.trim() === "") {
            mostrarAlerta("Ingrese su nombre por favor");
            nombre.focus();
            return false;
        }

        if (dni.value.trim() === "") {
            mostrarAlerta("Ingrese su DNI por favor");
            dni.focus();
            return false;
        }

        if (email.value.trim() === "") {
            mostrarAlerta("Ingrese su correo");
            email.focus();
            return false;
        }

        if (!emailValido(email.value)) {
            mostrarAlerta("Ingrese un correo válido por favor");
            email.focus();
            return false;
        }

        if (tel.value.trim() === "" || /^\s+$/.test(tel.value)) {
            mostrarAlerta("Ingrese un teléfono de contacto");
            tel.focus();
            return false;
        }

        procesarDatos();
        cerrarMenu();
        return true;
    };


    enviarbtn.addEventListener('click', validarFormulario);

  
});
