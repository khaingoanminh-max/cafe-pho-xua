/* =========================================================
   CAFE PHỐ XƯA 4.0
   Production Ready JavaScript
   Package 04
   Block 4A
   JavaScript Foundation
========================================================= */

"use strict";

/* =========================================================
   APPLICATION
========================================================= */

const CafePhoXua = {

    init() {

        this.cacheDom();

        this.bindEvents();

        this.start();

    },

    /* =====================================================
       CACHE DOM
    ===================================================== */

    cacheDom() {

        this.body = document.body;

        this.html = document.documentElement;

        this.header = document.querySelector(".site-header");

    },

    /* =====================================================
       EVENTS
    ===================================================== */

    bindEvents() {

        window.addEventListener("load", () => {

            this.onLoad();

        });

    },

    /* =====================================================
       START
    ===================================================== */

    start() {

        console.log("Cafe Phố Xưa 4.0 Started");

    },

    /* =====================================================
       WINDOW LOAD
    ===================================================== */

    onLoad() {

        console.log("Website Loaded");

    }

};

/* =========================================================
   APPLICATION START
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    CafePhoXua.init();

});
/* =====================================================
   MOBILE NAVIGATION
===================================================== */

toggleMobileNavigation() {

    if (!this.mobileNavigation || !this.mobileOverlay || !this.mobileToggle) return;

    const isOpen = this.mobileNavigation.classList.toggle("is-open");

    this.mobileOverlay.classList.toggle("is-open", isOpen);

    this.mobileToggle.classList.toggle("is-active", isOpen);

    this.body.classList.toggle("menu-open", isOpen);

    this.mobileToggle.setAttribute("aria-expanded", isOpen);

},

closeMobileNavigation() {

    if (!this.mobileNavigation || !this.mobileOverlay || !this.mobileToggle) return;

    this.mobileNavigation.classList.remove("is-open");

    this.mobileOverlay.classList.remove("is-open");

    this.mobileToggle.classList.remove("is-active");

    this.body.classList.remove("menu-open");

    this.mobileToggle.setAttribute("aria-expanded", "false");

},
this.lastScrollY = window.scrollY;

this.scrollThreshold = 20;
window.addEventListener("scroll", () => {

    this.handleScroll();

}, { passive: true });
/* =====================================================
   SCROLL & HEADER
===================================================== */

handleScroll() {

    this.updateHeaderState();

},

updateHeaderState() {

    if (!this.header) return;

    const currentScroll = window.scrollY;

    if (currentScroll > this.scrollThreshold) {

        this.header.classList.add("is-scrolled");

    } else {

        this.header.classList.remove("is-scrolled");

    }

    this.lastScrollY = currentScroll;

},
