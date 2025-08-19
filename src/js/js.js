// $(document).ready(function () {
//   $(".carousel__inner").slick({
//     speed: 1200,
//     adaptiveHeight: false,
//     prevArrow:
//       '<button type="button" class="slick-prev"><img src="../icons/left.svg"></button>',
//     nextArrow:
//       '<button type="button" class="slick-next"><img src="../icons/right.svg"></button>',
//       responsive: [
//         {
//             breakpoint: 992,
//             settings: {

//               dots: true,
//               arrows: false,
//             }
//         }
//       ],
//   });
// });
const slider = tns({
  container: ".carousel__inner",
  items: 1,
  slideBy: "page",
  autoplay: false,
  controls: false,
  nav: false,
  mouseDrag: true,
});

document.querySelector(".prev").addEventListener("click", function () {
  slider.goTo("prev");
});

document.querySelector(".next").addEventListener("click", function () {
  slider.goTo("next");
});

$(document).ready(function () {
  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }
  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  /////////////////////////////////modal

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });

  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #order, #thank").fadeOut("slow");
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__desr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: "Введи имя ебанат",
        phone: "Введи номер дура",
        email: {
          required: "Почта дура",
          email: "Введи верно ее дура",
        },
      },
    });
  }
  validateForms("#consultation-form");
  validateForms("#consultation form");
  validateForms("#order form");
  $("input[name=phone]").mask("+7 (999) 999-999");

  $("form").submit(function (e) {
    e.preventDefault();
    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thank").fadeIn("slow");
      $("form").trigger("reset");
    });
    return false;
  });
  //scrolll up
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });
  $("a[href^='#']").on("click", function (e) {
    e.preventDefault();

    let target = $(this).attr("href");
    let offset = $(target).offset().top; // позиция блока по оси Y

    $("html, body").animate(
      { scrollTop: offset },
      800 // скорость прокрутки (мс)
    );
  });
});
