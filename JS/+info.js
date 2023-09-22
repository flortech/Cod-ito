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
  });
  