// ==========================================
// CAFE PHỐ XƯA - SCRIPT V7.0
// PART 1
// Slider + Reveal Animation
// ==========================================

// ===============================
// SLIDER
// ===============================

let currentSlide = 0;

const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {

    if (!slides || slide.length === 0) return;

    if (index >= slide.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slide.length - 1;
    } else {
        currentSlide = index;
    }

    slides.style.transform =
        `translateX(-${currentSlide * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));

    if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
    }

}

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        showSlide(currentSlide + 1);
    });
}

if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        showSlide(currentSlide - 1);
    });
}

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);

    });

});

if (slide.length > 0) {

    setInterval(() => {

        showSlide(currentSlide + 1);

    }, 4000);

    showSlide(0);

}

// ===============================
// REVEAL ANIMATION
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const reveals =
        document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {

        reveals.forEach(item => {

            item.classList.add("active");

        });

        return;

    }

    const observer =
        new IntersectionObserver((entries) => {

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
// ==========================================
// PART 2
// MINI CART ENGINE
// ==========================================

let cart = [];

// ----------------------------
// Cập nhật số trên icon giỏ
// ----------------------------

function updateCartCount() {

    const badge = document.getElementById("cart-count");

    if (!badge) return;

    let total = 0;

    cart.forEach(item => {

        total += item.quantity;

    });

    badge.textContent = total;

}

// ----------------------------
// Thêm món vào giỏ
// ----------------------------

function addToCart(product, price) {

    const found = cart.find(item => item.product === product);

    if (found) {

        found.quantity++;

    } else {

        cart.push({

            product: product,
            price: Number(price),
            quantity: 1

        });

    }

    updateCartCount();

    console.log("Cart:", cart);

}

// ----------------------------
// Bắt sự kiện nút Đặt ngay
// ----------------------------

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".menu-order-btn").forEach(button => {

        button.addEventListener("click", function () {

            const product = this.dataset.product;

            const price = this.dataset.price;

            addToCart(product, price);

            alert("✅ Đã thêm " + product + " vào giỏ hàng.");

        });

    });

});
