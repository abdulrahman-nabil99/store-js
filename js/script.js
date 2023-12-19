// revealing on scroll
const allSections = document.querySelectorAll(".scroll-observe");

const revealSection = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) entry.target.classList.remove("hidden");
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach((sec) => {
  sectionObserver.observe(sec);
  sec.classList.add("hidden");
});

// lazy image loade
const productsImgs = document.querySelectorAll(".lazy-img");

const loadImg = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      entry.target.addEventListener("load", () =>
        entry.target.classList.remove("lazy-img")
      );
    }
  });
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.5,
});
productsImgs.forEach((img) => {
  imgObserver.observe(img);
});

// slider
function slider() {
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const slideWidth = window.getComputedStyle(slides[0]);
  const sliderWidth = window.getComputedStyle(slider);

  let currentSlide = 0;
  // change slide Function
  let changeSlide = function (min) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - min) * 100}%)`;
    });
  };
  changeSlide(currentSlide);
  // next slide
  const nextSlide = function () {
    currentSlide++;
    if (
      currentSlide >= slides.length - 3 &&
      parseFloat(slideWidth.width) === parseFloat(sliderWidth.width) / 4
    ) {
      currentSlide = 0;
    } else if (
      currentSlide >= slides.length - 1 &&
      parseFloat(slideWidth.width) === parseFloat(sliderWidth.width) / 2
    ) {
      currentSlide = 0;
    } else if (currentSlide === slides.length) {
      currentSlide = 0;
    }
    changeSlide(currentSlide);
  };
  // previous slide
  const prevSlide = function () {
    currentSlide--;
    if (
      currentSlide < 0 &&
      parseFloat(slideWidth.width) === parseFloat(sliderWidth.width) / 4
    ) {
      currentSlide = slides.length - 4;
    } else if (
      currentSlide < 0 &&
      parseFloat(slideWidth.width) === parseFloat(sliderWidth.width) / 2
    ) {
      currentSlide = slides.length - 2;
    } else if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }
    changeSlide(currentSlide);
  };

  btnLeft.addEventListener("click", prevSlide);
  btnRight.addEventListener("click", nextSlide);
}

slider();
