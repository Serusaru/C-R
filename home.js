
const slides = document.querySelector('.slides');
const slideImages = document.querySelectorAll('.slides img');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;

function updateSliderPosition() {
  const slideWidth = slideImages[0].clientWidth;
  slides.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slideImages.length;
  updateSliderPosition();
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slideImages.length) % slideImages.length;
  updateSliderPosition();
});


window.addEventListener('resize', updateSliderPosition);
