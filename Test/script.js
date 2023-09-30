document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const prevSlide = document.querySelector(".prev-slide");
  const nextSlide = document.querySelector(".next-slide");
  let slideIndex = 0;
  const slides = document.querySelectorAll(".carousel img");

  // Función para mostrar la diapositiva actual con movimiento horizontal
  function showSlide() {
      const translateValue = -slideIndex * 100;
      carousel.style.transform = `translateX(${translateValue}%)`;
  }

  // Función para avanzar a la siguiente diapositiva
  function nextSlideFn() {
      if (slideIndex < slides.length - 1) {
          slideIndex++;
      } else {
          slideIndex = 0;
      }
      showSlide();
  }

  // Función para retroceder a la diapositiva anterior
  function prevSlideFn() {
      if (slideIndex > 0) {
          slideIndex--;
      } else {
          slideIndex = slides.length - 1;
      }
      showSlide();
  }

  // Controlar el carrusel automáticamente
  setInterval(nextSlideFn, 3000);

  // Agregar controladores de eventos a los botones
  prevSlide.addEventListener("click", prevSlideFn);
  nextSlide.addEventListener("click", nextSlideFn);

  // Mostrar la primera diapositiva al cargar la página
  showSlide();
});


