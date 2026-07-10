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
// ==========================================
// ANIMATION V6 PREMIUM
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const reveals = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        reveals.forEach(item => item.classList.add("active"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    reveals.forEach(section => {

        observer.observe(section);

    });

});

// Đã tạm tắt chức năng mở Zalo để chuyển sang Mini Cart V7.
