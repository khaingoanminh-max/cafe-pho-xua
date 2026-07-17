/* =========================================================
   CAFE PHỐ XƯA
   VERSION        : 4.0
   PACKAGE        : 04
   FILE           : script.js
   PART           : 1
   BLOCK          : 4A.1
   STATUS         : BUILDING
   ARCHITECT      : ChatGPT

   Ghi chú:
   - Khởi tạo JavaScript Foundation.
   - Sử dụng IIFE để cô lập phạm vi.
   - Kích hoạt Strict Mode.
   - Chưa khai báo Config.
   - Chưa khai báo DOM Cache.
   - Chưa khai báo Modules.
========================================================= */

(() => {

    'use strict';
    /* =====================================================
       APPLICATION NAMESPACE
    ====================================================== */

    const App = {};

    /* =====================================================
       APPLICATION CONFIGURATION
    ====================================================== */

    App.config = Object.freeze({

        appName: 'Cafe Phố Xưa',

        version: '4.0',

        debug: false,

        selectors: Object.freeze({

            siteWrapper: '.site-wrapper',

            siteHeader: '.site-header',

            main: 'main',

            hero: '#hero',

            about: '#about',

            menu: '#menu',

            gallery: '#gallery',

            delivery: '#delivery',

            contact: '#contact',

            footer: '.site-footer',

            backToTop: '#back-to-top'

        }),

        breakpoints: Object.freeze({

            mobile: 576,

            tablet: 768,

            desktop: 992,

            wide: 1200

        }),

        timing: Object.freeze({

            debounce: 200,

            throttle: 100,

            scrollDuration: 500

        })

    });
      /* =====================================================
       DOM CACHE
    ====================================================== */

    App.dom = {};

    /* =====================================================
       DOM CACHE INITIALIZER
    ====================================================== */

    App.cacheDom = () => {

        const { selectors } = App.config;

        App.dom.siteWrapper = document.querySelector(selectors.siteWrapper);

        App.dom.siteHeader = document.querySelector(selectors.siteHeader);

        App.dom.main = document.querySelector(selectors.main);

        App.dom.hero = document.querySelector(selectors.hero);

        App.dom.about = document.querySelector(selectors.about);

        App.dom.menu = document.querySelector(selectors.menu);

        App.dom.gallery = document.querySelector(selectors.gallery);

        App.dom.delivery = document.querySelector(selectors.delivery);

        App.dom.contact = document.querySelector(selectors.contact);

        App.dom.footer = document.querySelector(selectors.footer);

        App.dom.backToTop = document.querySelector(selectors.backToTop);

    };
      /* =====================================================
       UTILITY FUNCTIONS
    ====================================================== */

    App.utils = {};

    /* =====================================================
       DEBOUNCE
    ====================================================== */

    App.utils.debounce = (callback, delay = App.config.timing.debounce) => {

        let timeoutId;

        return (...args) => {

            window.clearTimeout(timeoutId);

            timeoutId = window.setTimeout(() => {

                callback(...args);

            }, delay);

        };

    };

    /* =====================================================
       THROTTLE
    ====================================================== */

    App.utils.throttle = (callback, limit = App.config.timing.throttle) => {

        let waiting = false;

        return (...args) => {

            if (waiting) {

                return;

            }

            callback(...args);

            waiting = true;

            window.setTimeout(() => {

                waiting = false;

            }, limit);

        };

    };

    /* =====================================================
       CLAMP
    ====================================================== */

    App.utils.clamp = (value, min, max) => {

        return Math.min(Math.max(value, min), max);

    };

    /* =====================================================
       PREFERS REDUCED MOTION
    ====================================================== */

    App.utils.prefersReducedMotion = () => {

        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    };

    /* =====================================================
       IS MOBILE
    ====================================================== */

    App.utils.isMobile = () => {

        return window.innerWidth < App.config.breakpoints.desktop;

    };

    /* =====================================================
       IS DESKTOP
    ====================================================== */

    App.utils.isDesktop = () => {

        return window.innerWidth >= App.config.breakpoints.desktop;

    };
      /* =====================================================
       APPLICATION STATE
    ====================================================== */

    App.state = {

        /* ---------------------------------------------
           Application
        --------------------------------------------- */

        initialized: false,

        debug: App.config.debug,

        /* ---------------------------------------------
           Viewport
        --------------------------------------------- */

        viewport: {

            width: window.innerWidth,

            height: window.innerHeight

        },

        /* ---------------------------------------------
           Scroll
        --------------------------------------------- */

        scroll: {

            x: window.scrollX,

            y: window.scrollY,

            direction: 'down'

        },

        /* ---------------------------------------------
           Header
        --------------------------------------------- */

        header: {

            height: 0,

            isScrolled: false

        },

        /* ---------------------------------------------
           Navigation
        --------------------------------------------- */

        navigation: {

            mobileOpen: false,

            activeSection: null

        },

        /* ---------------------------------------------
           Dialog
        --------------------------------------------- */

        dialog: {

            active: null

        },

        /* ---------------------------------------------
           Accessibility
        --------------------------------------------- */

        accessibility: {

            reducedMotion: App.utils.prefersReducedMotion()

        }

    };
      /* =====================================================
       EVENT REGISTRY
    ====================================================== */

    App.events = {};

    /* =====================================================
       WINDOW RESIZE
    ====================================================== */

    App.events.onResize = () => {

        App.state.viewport.width = window.innerWidth;

        App.state.viewport.height = window.innerHeight;

    };

    /* =====================================================
       WINDOW SCROLL
    ====================================================== */

    App.events.onScroll = () => {

        const previousY = App.state.scroll.y;

        const currentY = window.scrollY;

        App.state.scroll.x = window.scrollX;

        App.state.scroll.y = currentY;

        App.state.scroll.direction =
            currentY > previousY ? 'down' : 'up';

    };

    /* =====================================================
       WINDOW VISIBILITY
    ====================================================== */

    App.events.onVisibilityChange = () => {

        App.state.documentHidden = document.hidden;

    }
      /* =====================================================
       HEADER MODULE
    ====================================================== */

    App.modules.header = {

        init() {

            this.cache();

            this.bindEvents();

            this.update();

        },

        cache() {

            this.element = App.dom.siteHeader;

            if (!this.element) {

                return;

            }

            App.state.header.height = this.element.offsetHeight;

        },

        bindEvents() {

            /* Reserved for future header events */

        },

        update() {

            if (!this.element) {

                return;

            }

            const scrolled = App.state.scroll.y > 20;

            App.state.header.isScrolled = scrolled;

            this.element.classList.toggle(

                'is-scrolled',

                scrolled

            );

        },

        destroy() {

            this.element = null;

        }

    };=
      /* =====================================================
       MODULE LIFECYCLE
    ====================================================== */

    App.updateModules = () => {

        Object.values(App.modules).forEach((module) => {

            if (

                module &&

                module.initialized &&

                typeof module.update === 'function'

            ) {

                module.update();

            }

        });

    };
      /* =====================================================
       EVENT BINDINGS
    ====================================================== */

    App.bindEvents = () => {

        window.addEventListener(

            'resize',

            App.utils.debounce(App.events.onResize)

        );

        window.addEventListener(

            'scroll',

            App.utils.throttle(App.events.onScroll),

            { passive: true }

        );

        document.addEventListener(

            'visibilitychange',

            App.events.onVisibilityChange

        );

    };

    /* =====================================================
       APPLICATION INITIALIZER
    ====================================================== */

    App.init = () => {

        App.cacheDom();

        App.bindEvents();

        App.events.onResize();

        App.events.onScroll();

        App.events.onVisibilityChange();

        App.state.initialized = true;

        if (App.state.debug) {

            console.log(

                `${App.config.appName} ${App.config.version} initialized.`

            );

        }

    };

    /* =====================================================
       APPLICATION BOOTSTRAP
    ====================================================== */

    document.addEventListener(

        'DOMContentLoaded',

        App.init

    );

})();

  
