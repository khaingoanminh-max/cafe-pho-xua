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
// MINI CART ENGINE V7.0 - PART 2
// ==========================================

let cart = [];

// Cập nhật số lượng trên icon giỏ
function updateCartCount() {

    const count = document.getElementById("cart-count");

    if (!count) return;

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    count.textContent = total;
}

// Thêm món vào giỏ
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

    alert("✅ Đã thêm " + product + " vào giỏ hàng.");
}

// Gắn sự kiện cho tất cả nút Đặt ngay
document.querySelectorAll(".menu-order-btn").forEach(button => {

    button.addEventListener("click", function (e) {

        e.preventDefault();

        const product = this.dataset.product;
        const price = this.dataset.price;

        addToCart(product, price);

    });

});
// ==========================================
// PART 3A
// HIỂN THỊ GIỎ HÀNG
// ==========================================

// Mở giỏ hàng khi bấm icon
const cartIcon = document.getElementById("cart-icon");

if (cartIcon) {

    cartIcon.addEventListener("click", () => {

        showCart();

    });

}

// Hiển thị nội dung giỏ hàng
function showCart() {

    if (cart.length === 0) {

        alert("🛒 Giỏ hàng đang trống.");

        return;

    }

    let text = "🛒 GIỎ HÀNG\n\n";

    let total = 0;

    cart.forEach((item, index) => {

        text +=
            (index + 1) + ". " +
            item.product +
            " x" +
            item.quantity +
            "\n";

        total += item.price * item.quantity;

    });

    text +=
        "\n----------------------\n";

    text +=
        "Tổng tiền: " +
        total.toLocaleString("vi-VN") +
        "đ";

    alert(text);

}
// ==========================================
// PART 3B
// OPEN CART + RENDER CART
// ==========================================

const cartIcon = document.getElementById("cart-icon");
const cartPanel = document.getElementById("cart-panel");
const cartOverlay = document.getElementById("cart-overlay");
const closeCart = document.getElementById("close-cart");

function renderCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="cart-empty">Giỏ hàng đang trống.</p>';

        cartTotal.textContent = "0đ";

        return;
    }

    let html = "";
    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        html += `
        <div class="cart-item">
            <div>
                <strong>${item.product}</strong><br>
                ${item.quantity} × ${item.price.toLocaleString()}đ
            </div>
            <div>
                ${(item.price * item.quantity).toLocaleString()}đ
            </div>
        </div>
        `;

    });

    cartItems.innerHTML = html;
    cartTotal.textContent = total.toLocaleString() + "đ";
}

// Mở giỏ
if (cartIcon) {

    cartIcon.addEventListener("click", () => {

        renderCart();

        cartPanel.classList.add("active");
        cartOverlay.classList.add("active");

    });

}

// Đóng giỏ
if (closeCart) {

    closeCart.addEventListener("click", () => {

        cartPanel.classList.remove("active");
        cartOverlay.classList.remove("active");

    });

}

if (cartOverlay) {

    cartOverlay.addEventListener("click", () => {

        cartPanel.classList.remove("active");
        cartOverlay.classList.remove("active");

    });

}
// ==========================================
// PART 4
// CHECKOUT ZALO + INIT
// ==========================================

const checkoutBtn = document.getElementById("checkout-btn");

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) {

            alert("🛒 Giỏ hàng đang trống.");

            return;

        }

        let message = "☕ ĐƠN ĐẶT HÀNG CAFE PHỐ XƯA\n\n";

        let total = 0;

        cart.forEach(item => {

            const money = item.price * item.quantity;

            total += money;

            message +=
                `${item.product}\n` +
                `${item.quantity} x ${item.price.toLocaleString()}đ = ${money.toLocaleString()}đ\n\n`;

        });

        message +=
            "----------------------\n" +
            "TỔNG: " +
            total.toLocaleString() +
            "đ";

        const zaloPhone = "0917856899";

        window.open(

            `https://zalo.me/${zaloPhone}?text=${encodeURIComponent(message)}`,

            "_blank"

        );

    });

});

// ==========================================
// INITIALIZE
// ==========================================

updateCartCount();

renderCart();
