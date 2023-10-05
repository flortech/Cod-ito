document.addEventListener("DOMContentLoaded", function () {
  var botonCabañaInfo = document.getElementById("cabañainfo");
  var botonBungalowsInfo = document.getElementById("bungalowsinfo");
  var botonCabañaReserva = document.getElementById("cabañareserva");
  var botonBungalowsReserva = document.getElementById("bungalowsreserva");

  botonCabañaInfo.addEventListener("click", function () {
    toggleInfo(document.querySelector(".cabañasbox"), botonCabañaInfo);
  });

  botonBungalowsInfo.addEventListener("click", function () {
    toggleInfo(document.querySelector(".bungalowsbox"), botonBungalowsInfo);
  });

  botonCabañaReserva.addEventListener("click", function () {
    mostrarReserva();
  });

  botonBungalowsReserva.addEventListener("click", function () {
    mostrarReserva();
  });

  function toggleInfo(box, boton) {
    box.classList.toggle("info-visible");
    if (box.classList.contains("info-visible")) {
      boton.textContent = "-Info";
    } else {
      boton.textContent = "+Info";
    }
  }

  function mostrarReserva() {
    var sectionReserva = document.querySelector(".section-reserva");
    sectionReserva.classList.add("mostrar");
  }

  /* carrrusel header /*/
  //////////////////////////////

  const carousel = document.querySelector(".carousel");

  let intervalo = null;
  let step = 1;
  let scrolling = false;
  let direction = 1; // direc: 1 para adelante, -1 para atrás

  const start = () => {
    if (intervalo === null) {
      scrolling = true;
      intervalo = setInterval(function () {
        carousel.scrollLeft += step * direction;

        // se verifica si llega al final y cambia direc
        if (
          direction === 1 &&
          carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth
        ) {
          direction = -1;
        } else if (direction === -1 && carousel.scrollLeft <= 0) {
          direction = 1;
        }
      }, 3);
    }
  };

  const stop = () => {
    if (intervalo !== null) {
      clearInterval(intervalo);
      intervalo = null;
      scrolling = false;
    }
  };

  /*carousel.addEventListener("mouseenter", () => {
    stop();
  });

  carousel.addEventListener("mouseleave", () => {
    if (!scrolling) {
      start();
    }
  });*/

  start();
});
