let currentSlide = 0;

const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
    if (index >= slide.length) currentSlide = 0;
    else if (index < 0) currentSlide = slide.length - 1;
    else currentSlide = index;

    slides.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");
}

document.querySelector(".next").addEventListener("click", () => {
    showSlide(currentSlide + 1);
});

document.querySelector(".prev").addEventListener("click", () => {
    showSlide(currentSlide - 1);
});

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showSlide(index);
    });
});

setInterval(() => {
    showSlide(currentSlide + 1);
}, 4000);

showSlide(0);
