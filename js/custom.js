(function () {
  "use strict";

  var app = {
    init: function () {
      let firebaseConfig = {
        apiKey: "AIzaSyDByssLJpwPv7y5_f1lULL0Rg4yw1YCJHw",
        authDomain: "contactsite-7ebd0.firebaseapp.com",
        databaseURL: "https://contactsite-7ebd0.firebaseio.com",
        projectId: "contactsite-7ebd0",
        storageBucket: "contactsite-7ebd0.appspot.com",
        messagingSenderId: "740069152545",
        appId: "1:740069152545:web:de15dd4b9ec6a9ac2d5060",
        measurementId: "G-Z734QRYVHX",
      };
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();

      //=== lazy loading effect ===\\
      this.lazyLoading();

      this.setUpListeners();

      //=== Custom scripts ===\\
      this.appendMfBg();
      this.appendBtnTop();
      this.formingHrefTel();
      this.contentTable();
      this.detectIE();

      //=== Plugins ===\\
      this.autoSizeTextarea();
      this.iCookies();
      this.device();
      this.popUp();
      this.scrollToFixed();
      this.forms();
      this.phoneMask();
      this.spincrement();
    },

    OPTIONSCOOCIES: {
      title: "Cookies",
      message:
        "We use cookies to understand how you use our site, to personalize content and to improve your experience. By continuing to use our site, you accept our use of cookies and revised.",
      delay: 600,
      expires: 30,
      onAccept: function () {
        var myPreferences = $.fn.ihavecookies.cookie();
      },
      moreInfoLabel: "",
      uncheckBoxes: true,
      advancedBtnLabel: "",
    },

    setUpListeners: function () {
      //=== Header mobile/tablet navbar ===\\
      // Header navbar toggle \\
      $(".header-navbar-btn").on("click", this.headerNavbarToggle);
      // Header navbar close not on this element \\
      $(document).on("click", this.headerNavbarNotEl);

      //=== Mobile/tablet main menu ===\\
      // Main menu toogle \\
      $(".main-mnu-btn").on("click", this.MainMenuToggle);
      // Main menu submenu toogle \\
      $(".mmm-btn").on("click", this.MainMenuSubmenuToggle);
      // Main menu close not on this element \\
      $(document).on("click", this.MainMenuCloseNotEl);

      //=== UI elements ===\\
      $(".ui-nav li").on("click", this.ui);

      //=== Form field ===\\
      $(".form-field").each(this.inputEach);
      $(".form-field-input")
        .on("focus", this.inputFocus)
        .on("keyup change", this.inputKeyup)
        .on("blur", this.inputBlur);

      //=== Button top ===\\
      $(document).on("click", ".btn-top", this.btnTop);
      $(window).on("scroll", this.btnTopScroll);

      $(".mob-main-mnu, .main-mnu, .footer-mnu").on(
        "click",
        " a",
        this.scrollToAnchor
      );
    },

    appendMfBg: function () {
      $("body").append('<div class="mf-bg"></div>');
    },

    appendBtnTop: function () {
      $("body").append(
        '<div class="btn-top"><svg class="btn-widht-ico-right" viewBox="0 0 13 9"><use xlink:href="img/sprite.svg#arrow-right"></use></svg></div>'
      );
    },

    scrollToAnchor: function (event) {
      event.preventDefault();
      var offset = 0;

      if ($(this).attr("href") != "#") {
        offset = $($(this).attr("href")).offset().top - 50;
      }

      $("html,body").animate({ scrollTop: offset }, "slow");
    },

    btnTop: function () {
      $("html, body").animate({ scrollTop: 0 }, 1000, function () {
        $(this).removeClass("active");
      });
    },

    btnTopScroll: function () {
      var btnTop = $(".btn-top");

      if ($(this).scrollTop() > 700) {
        btnTop.addClass("active");
      } else {
        btnTop.removeClass("active");
      }
    },

    ui: function () {
      var _this = $(this),
        index = _this.index(),
        nav = _this.parent(),
        tabs = _this.closest(".ui"),
        items = tabs.find(".ui-item");

      if (!_this.hasClass("active")) {
        items
          .eq(index)
          .add(_this)
          .addClass("active")
          .siblings()
          .removeClass("active");

        nav.trigger("detach.ScrollToFixed").scrollToFixed({
          marginTop: $(".header-fixed").outerHeight() + 20,
          zIndex: 2,
          limit: $(".footer").offset().top - nav.outerHeight() - 40,
          preAbsolute: function () {
            $(this).css({ opacity: 0, visability: "hidden" });
          },
          postUnfixed: function () {
            $(this).css({ opacity: 1, visability: "visible" });
          },
          postAbsolute: function () {
            $(this).css({ opacity: 1, visability: "visible" });
          },
        });

        if ($(document).scrollTop() > 0) {
          $("html, body").animate({ scrollTop: 0 }, 500);
        }
      }
    },

    //=== Mobile/tablet main menu ===\\
    MainMenuToggle: function () {
      var _this = $(this),
        _body = $("body"),
        headerH = _this.closest(".header").outerHeight(),
        mnu = $(".mob-main-mnu"),
        offsetTop = $(".header-fixed").offset().top;

      mnu.css("padding-top", headerH);
      $(this).toggleClass("active");

      _body.toggleClass("mob-main-mnu-open").scrollTop(offsetTop);

      if (_body.hasClass("mob-main-mnu-open")) {
        $(".mf-bg").addClass("visible mm");
      } else {
        $(".mf-bg").removeClass("visible mm");
      }
    },
    MainMenuSubmenuToggle: function () {
      var _this = $(this),
        item = _this.parent(),
        content = item.find(".mob-main-submnu");

      item.toggleClass("open");
      content.slideToggle();
    },
    MainMenuCloseNotEl: function (e) {
      if (
        $(e.originalEvent.target).closest(".mob-main-mnu, .main-mnu-btn").length
      )
        return;
      $("body").removeClass("mob-main-mnu-open");
      $(".main-mnu-btn").removeClass("active");
      $(".mf-bg").removeClass("visible mm");
      e.originalEvent.stopPropagation();
    },

    //=== Header mobile/tablet navbar ===\\
    headerNavbarToggle: function () {
      $(this).parent().toggleClass("open");
    },
    headerNavbarNotEl: function (e) {
      if ($(e.originalEvent.target).closest(".header-navbar").length) return;
      $(".header-navbar").removeClass("open");
      e.originalEvent.stopPropagation();
    },

    //=== Form input ===\\
    inputEach: function () {
      var _this = $(this),
        val = _this.find(".form-field-input").val();

      if (val === "") {
        _this.removeClass("focus");
      } else {
        _this.addClass("focus");
      }
    },
    inputFocus: function () {
      var _this = $(this),
        wrappInput = _this.parent();

      wrappInput.addClass("focus");
    },
    inputKeyup: function () {
      var _this = $(this),
        val = _this.val(),
        wrappInput = _this.parent();

      if (val === "" && !_this.is(":focus")) {
        wrappInput.removeClass("focus");
      } else {
        wrappInput.addClass("focus");
      }
    },
    inputBlur: function () {
      var _this = $(this),
        val = _this.val(),
        wrappInput = _this.parent();

      if (val === "") {
        wrappInput.removeClass("focus");
      }
    },


    //=== Forming href for phone ===\\
    formingHrefTel: function () {
      var linkAll = $(".formingHrefTel"),
        joinNumbToStringTel = "tel:";

      $.each(linkAll, function () {
        var _this = $(this),
          linkValue = _this.text(),
          arrayString = linkValue.split("");

        for (var i = 0; i < arrayString.length; i++) {
          var thisNunb = app.isNumber(arrayString[i]);
          if (thisNunb === true || (arrayString[i] === "+" && i === 0)) {
            joinNumbToStringTel += arrayString[i];
          }
        }

        _this.attr("href", function () {
          return joinNumbToStringTel;
        });
        joinNumbToStringTel = "tel:";
      });
    },

    isNumber: function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },

    //=== Content table responsive ===\\
    contentTable: function () {
      var contentTable = $(".content");
      if (contentTable.length) {
        $.each(contentTable.find("table"), function () {
          $(this)
            .wrap("<div class='table-responsive-outer'></div>")
            .wrap("<div class='table-responsive'></div>");
        });
      }
    },

    //=== Custom alert ===\\
    customAlert: function (text, duration, alertInfo) {
      var alerts = $(".alerts"),
        body = $("body"),
        alertClass = "",
        alertIco = "info";

      if (!alerts.length) {
        body.append('<div class="alerts"></div>');
      }
      $(".alert").remove();

      if (alertInfo === "success") {
        alertClass = "alert-success";
        alertIco = "check";
      } else if (alertInfo === "danger") {
        alertClass = "alert-danger";
        alertIco = "error";
      } else if (alertInfo === "warning") {
        alertClass = "alert-warning";
        alertIco = "warning";
      } else if (alertInfo == "default") {
        alertClass = "alert-default";
        alertIco = "info";
      }

      if (!$("." + alertClass + "").length) {
        $(".alerts").append(
          '<div class="alert ' +
            alertClass +
            '" data-duration-hide="' +
            duration +
            '"> <div class="alert-ico"> <i class="material-icons md-22">' +
            alertIco +
            '</i> </div> <div class="alert-text">' +
            text +
            "</div> </div>"
        );

        setTimeout(function () {
          $("." + alertClass + "").remove();
        }, duration);
      }

      $(document).on("click", ".alert-close", function () {
        $(this).closest(".alert").remove();
      });
    },

    //=== Plugins ===\\

    lazyLoading: function () {
      $(".lazy").Lazy({
        effect: "fadeIn",
      });
    },

    autoSizeTextarea: function () {
      autosize(document.querySelectorAll("textarea"));
    },

    iCookies: function () {
      $("body").ihavecookies(this.OPTIONSCOOCIES);
    },

    device: function () {
      if ((device.mobile() || device.tablet()) && device.ios()) {
        var tempCSS = $("a").css("-webkit-tap-highlight-color");
        $("main, .main-inner")
          .css("cursor", "pointer")
          .css("-webkit-tap-highlight-color", "rgba(0, 0, 0, 0)");
        $("a").css("-webkit-tap-highlight-color", tempCSS);
      }
    },

    popUp: function () {
      $(".open_popup").popup({
        transition: "all 0.4s",
        color: "#000000",
        opacity: 0.8,
      });
    },

    scrollToFixed: function () {
      if ($(".header-fixed").length) {
        $(".header-fixed").scrollToFixed({
          preFixed: function () {
            $(this).addClass("fixed");
          },
          postFixed: function () {
            $(this).removeClass("fixed");
          },
        });

        $("#ui-nav").scrollToFixed({
          marginTop: $(".header-fixed").outerHeight() + 20,
          zIndex: 2,
          limit: $(".footer").offset().top - $("#ui-nav").outerHeight() - 40,
          preAbsolute: function () {
            $(this).css({ opacity: 0, visability: "hidden" });
          },
          postUnfixed: function () {
            $(this).css({ opacity: 1, visability: "visible" });
          },
          postAbsolute: function () {
            $(this).css({ opacity: 1, visability: "visible" });
          },
        });
      }
    },

    forms: function () {
      var ajaxurl = "/mail.php";

      $.validator.addMethod(
        "customemail",
        function (value, element) {
          return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        },
        "The email is not a valid email."
      );

      $(".contact-form").validate({
        rules: {
          ContactName: {
            required: true,
            minlength: 2,
          },
          ContactPhone: {
            required: true,
          },
          ContactEmail: {
            required: true,
            email: true,
            customemail: true,
          },
        },
        messages: {
          ContactName: {
            required: "O campo nome é requerido.",
          },
          ContactPhone: {
            required: "O campo telefone é requerido.",
          },
          ContactEmail: {
            required: "O campo email é requerido.",
            email: "O campo email é requerido.",
            customemail: "O email não é válido.",
          },
        },
        submitHandler: function (form) {
          let db = firebase.firestore();

          let name = $("#contact-name").val();
          let phone = $("#contact-phone").val();
          let email = $("#contact-email").val();
          let message = $("#contact-message").val();

          db.collection("contacts")
            .add({
              name: name,
              phone: phone,
              email: email,
              message: message,
              createdAt: firebase.firestore.Timestamp.now(),
            })
            .then(function (docRef) {
              app.customAlert("Mensagem Enviada!", 4000, "success");

              var th = $(form);
              setTimeout(function () {
                th.trigger("reset");
                $(".form-field").removeClass("focus");
              }, 1000);
            })
            .catch(function (error) {
              app.customAlert("Não foi possível enviar!", 4000, "danger");
              console.error("Error adding document: ", error);
            });
        },
      });
    },

    phoneMask: function () {
      var listCountries = $.masksSort(
        $.masksLoad("data/phone-codes.json"),
        ["#"],
        /[0-9]|#/,
        "mask"
      );

      var maskOpts = {
        inputmask: {
          definitions: {
            "#": {
              validator: "[0-9]",
              cardinality: 1,
            },
          },
          showMaskOnHover: false,
          autoUnmask: true,
          clearMaskOnLostFocus: true,
        },
        match: /[0-9]/,
        replace: "#",
        listKey: "mask",
      };

      $(".mask-phone").inputmasks(
        $.extend(true, {}, maskOpts, {
          list: listCountries,
        })
      );
    },

    spincrement: function () {
      var show = true;
      var countbox = ".spincrement-container";

      if ($(countbox).length) {
        $(window).on("scroll load resize", function () {
          if (!show) return false;
          var w_top = $(window).scrollTop();
          var e_top = $(countbox).offset().top;
          var w_height = $(window).height();
          var d_height = $(document).height();
          var e_height = $(countbox).outerHeight();
          if (
            w_top + 500 >= e_top ||
            w_height + w_top == d_height ||
            e_height + e_top < w_height
          ) {
            $(".spincrement").spincrement({
              duration: 1500,
              leeway: 10,
            });
            show = false;
          }
        });
      }
    },

    //=== detect IE ===\\
    detectIE: function () {
      if (this.detectIECheck()) {
        var body = document.querySelector("body"),
          msg =
            "Unfortunately, the browser Internet Explorer you use is outdated and cannot display the site normally. <br> Please open the site in another browser";
        body.classList.add("overflow-hidden");
        body.innerHTML =
          '<div class="ie-browser"><div class="ie-browser-tr"><div class="ie-browser-td">' +
          msg +
          "</div></div></div>";
      }
    },
    detectIECheck: function () {
      var ua = window.navigator.userAgent;

      var msie = ua.indexOf("MSIE ");
      if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
      }

      var trident = ua.indexOf("Trident/");
      if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf("rv:");
        return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
      }

      // other browser
      return false;
    },
  };

  app.init();
})();
