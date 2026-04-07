"use strict";
(function ($) {
  // ==========================================
  //      Start Document Ready function
  // ==========================================
  $(document).ready(function () {
    //============================ Scroll To Top Icon Js Start =========
    (() => {
      const btn = $(".scroll-top");
      $(window).on("scroll", function () {
        if ($(window).scrollTop() >= 100) {
          $(".header").addClass("fixed-header");
          btn.addClass("show");
        } else {
          $(".header").removeClass("fixed-header");
          btn.removeClass("show");
        }
      });

      btn.on("click", function (e) {
        e.preventDefault();
        $("html, body").animate(
          {
            scrollTop: 0,
          },
          "300",
        );
      });
    })();

    // ========================== Add Attribute For Bg Image Js Start =====================
    $(".bg-img").css("background-image", function () {
      return `url(${$(this).data("background-image")})`;
    });
    // ========================== Add Attribute For Bg Image Js End =====================

    // ================== Password Show Hide Js Start ==========
    $(".toggle-password").on("click", function () {
      $(this).toggleClass("fa-eye");
      var input = $($(this).attr("id"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
    // =============== Password Show Hide Js End =================

    // ================== Sidebar Menu Js Start ===============
    // Sidebar Dropdown Menu Start
    $(".has-dropdown > a").click(function () {
      $(".sidebar-submenu").slideUp(200);
      if ($(this).parent().hasClass("active")) {
        $(".has-dropdown").removeClass("active");
        $(this).parent().removeClass("active");
      } else {
        $(".has-dropdown").removeClass("active");
        $(this).next(".sidebar-submenu").slideDown(200);
        $(this).parent().addClass("active");
      }
    });
    // Sidebar Dropdown Menu End

    // Sidebar Icon & Overlay js
    $(".navigation-bar").on("click", function () {
      $(".sidebar-menu").addClass("show-sidebar");
      $(".sidebar-overlay").addClass("show");
    });

    $(".sidebar-menu__close, .sidebar-overlay").on("click", function () {
      $(".sidebar-menu").removeClass("show-sidebar");
      $(".sidebar-overlay").removeClass("show");
    });

    // Sidebar Icon & Overlay js

    // Sidebar Icon & Overlay js
    $(".forum-body-collapse").on("click", function () {
      $(".forum-sidebar").addClass("show");
      $(".sidebar-overlay").addClass("show");
    });

    $(".forum-sidebar-close, .sidebar-overlay").on("click", function () {
      $(".forum-sidebar").removeClass("show");
      $(".sidebar-overlay").removeClass("show");
    });

    // Sidebar Icon & Overlay js

    // ===================== Sidebar Menu Js End =================

    // ===================== Comment Thread Toggle Js Start =================
    $(".comment-collapse-btn").on("click", function () {
      const targetId = $(this).data("target");
      const $replies = $("#" + targetId);
      const isActive = $(this).hasClass("active");

      if (isActive) {
        $replies.slideUp(200);
        $(this).removeClass("active");
        $(this)
          .find("i")
          .removeClass("la-minus-circle")
          .addClass("la-plus-circle");
      } else {
        $replies.slideDown(200);
        $(this).addClass("active");
        $(this)
          .find("i")
          .removeClass("la-plus-circle")
          .addClass("la-minus-circle");
      }
    });

    // ===================== Comment Thread Toggle Js End =================

    const editor = document.getElementById("editor");
    if (editor) {
      const quill = new Quill(editor, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ header: [1, 2, false] }],
            [{ size: ["small", "normal", "large", "huge"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "clean"],
          ],
        },
      });
    }

    //Plugin Customization Start
    // ========================= Select2 Js Start ==============
    (() => {
      // select initial
      $(".select2").each(function (index, element) {
        if (!$(element).parent().hasClass("select2-wrapper")) {
          $(element).wrap('<div class="select2-wrapper"></div>');
        }

        $(element).select2({
          dropdownParent: $(element).closest(".select2-wrapper"),
        });
      });
    })();
    // ========================= Select2 Js End ==============

    // ========================= Slick Slider Js Start ==============
    (() => {
      const sliderConfig = {
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        speed: 1500,
        dots: true,
        pauseOnHover: true,
        arrows: false,
        prevArrow:
          '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow:
          '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
      };

      $(".testimonial-slider").slick({
        ...sliderConfig,
        slidesToShow: 1,
        arrows: true,
        slidesToScroll: 1,
        dots: false,
        autoplay: false,
        fade: true,
      });

      $(".details-view").slick({
        ...sliderConfig,
        arrows: true,
        dots: false,
        autoplay: false,
        variableWidth: true,
      });

      // =======Gallery magnific Popup Icon Js Start ===

      // Hide items beyond the first 5 in the view
      $(".details-view-item").each(function (index) {
        if (index >= 5) {
          $(this).hide();
        }
      });

      $(".details-view-item").magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
        },
      });
      // ======= Gallery magnific Popup Icon Js End ===

      // custom scrollspy

      function scrollSpy(selector, options) {
        const scrollSpyContainer = $(selector).eq(0);
        const scrollSpyItems = [
          ...scrollSpyContainer.find('[data-spy="scroll"]'),
        ];
        const scrollSpySections = [];
        const scrollSpyOptions = {
          offset: 0,
          position: 0,
          transition: 150,
          ...options,
        };

        if (scrollSpyContainer.length) {
          scrollSpyItems.forEach(function (item) {
            scrollSpySections.push($(item.hash)[0]);

            $(item).on("click", function (e) {
              e.preventDefault();
              $("html,body").animate(
                {
                  scrollTop:
                    $(this.hash).offset().top - scrollSpyOptions.offset,
                },
                scrollSpyOptions.transition,
              );
            });
          });

          $(window).on("scroll", function () {
            const scrollPos =
              $(document).scrollTop() + scrollSpyOptions.position;

            scrollSpySections.forEach(function (section) {
              const top = $(section).offset().top;
              const bottom = top + $(section).outerHeight();
              const id = $(section).attr("id");

              if (scrollPos >= top && scrollPos < bottom) {
                scrollSpyContainer.find(".active").removeClass("active");
                $(`a[href="#${id}"]`).addClass("active");
              } else {
                $(`a[href="#${id}"]`).removeClass("active");
              }
            });
          });
        }
      }

      const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
      const scrollSpyHeight =
        document.querySelector("#scrollSpy")?.offsetHeight || 0;

      scrollSpy("#scrollSpy", {
        offset: headerHeight + scrollSpyHeight + 24,
        position: headerHeight + scrollSpyHeight + 48,
      });
    })();
    // ========================= Slick Slider Js End ===================

    // ========================= Odometer Counter Up Js End ==========
    $(".counter-item").each(function () {
      $(this).isInViewport(function (status) {
        if (status === "entered") {
          for (
            var i = 0;
            i < document.querySelectorAll(".odometer").length;
            i++
          ) {
            var el = document.querySelectorAll(".odometer")[i];
            el.innerHTML = el.getAttribute("data-odometer-final");
          }
        }
      });
    });
    // ========================= Odometer Up Counter Js End =====================

    // ==================== animation JS Start ====================
    new WOW().init();
    // ==================== animation JS End ====================

    // calculate height
    function setHeight(variable, name) {
      let headerSelect = document.getElementsByClassName(`${name}`)[0];
      if (headerSelect) {
        let headerHeight = headerSelect.clientHeight;
        document.documentElement.style.setProperty(
          `${variable}`,
          `${headerHeight}px`,
        );
      }
    }
    setHeight("--header-h", "header");
    setHeight("--form-h", "banner-form-section");

    // tooltips
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]',
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
    );

    // Range slider start

    $("#slider-range").slider({
      range: true,
      min: 60,
      max: 100,
      values: [60, 100],
      slide: function (event, ui) {
        $("input[name=min_price]").val(ui.values[0]);
        $("input[name=max_price]").val(ui.values[1]);
      },
    });

    // Range slider end
  });

  // ==========================================
  //      End Document Ready function
  // ==========================================

  // ========================= Preloader Js Start =====================
  $(window).on("load", function () {
    $(".preloader").fadeOut();
  });
  // ========================= Preloader Js End=====================
})(jQuery);
