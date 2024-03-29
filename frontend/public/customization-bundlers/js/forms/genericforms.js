class GenericForms {
  constructor() {
    jQuery().validate
      ? (this._initLogin(),
        this._initSignUp(),
        this._initContact(),
        this._initPersonal(),
        this._initAddress(),
        this._initReservation())
      : console.log("validate is undefined!");
  }
  _initLogin() {
    const e = document.getElementById("loginForm");
    if (!e) return void console.log("loginForm is null");
    jQuery(e).validate({
      rules: {
        loginEmail: { required: !0, email: !0 },
        loginPassword: {
          required: !0,
          minlength: 6,
          regex: /[a-z].*[0-9]|[0-9].*[a-z]/i,
        },
      },
      messages: {
        loginEmail: { email: "Your email address must be in correct format!" },
        loginPassword: {
          minlength: "Password must be at least {0} characters!",
          regex: "Password must contain a letter and a number!",
        },
      },
    }),
      e.addEventListener("submit", (r) => {
        if ((r.preventDefault(), r.stopPropagation(), jQuery(e).valid())) {
          const r = {
            loginEmail: e.querySelector('[name="loginEmail"]').value,
            loginPassword: e.querySelector('[name="loginPassword"]').value,
          };
          console.log(r);
        }
      });
  }
  _initSignUp() {
    const e = document.getElementById("signUpForm");
    if (!e) return void console.log("signUpForm is null");
    jQuery(e).validate({
      rules: {
        signUpName: { required: !0, regex: /^[a-z\s]+$/i },
        signUpEmail: { required: !0, email: !0 },
        signUpPassword: {
          required: !0,
          minlength: 6,
          regex: /[a-z].*[0-9]|[0-9].*[a-z]/i,
        },
        signUpCheck: { required: !0 },
      },
      messages: {
        signUpName: { regex: "Only letters are accepted!" },
        signUpEmail: { email: "Your email address must be in correct format!" },
        signUpPassword: {
          minlength: "Password must be at least {0} characters!",
          regex: "Password must contain a letter and a number!",
        },
        signUpCheck: { required: "Please read and accept terms!" },
      },
    }),
      e.addEventListener("submit", (r) => {
        if ((r.preventDefault(), r.stopPropagation(), jQuery(e).valid())) {
          const r = {
            signUpName: e.querySelector('[name="signUpName"]').value,
            signUpEmail: e.querySelector('[name="signUpEmail"]').value,
            signUpPassword: e.querySelector('[name="signUpPassword"]').value,
            signUpCheck: e.querySelector('[name="signUpCheck"]').value,
          };
          console.log(r);
        }
      });
  }
  _initContact() {
    const e = document.getElementById("contactForm");
    if (!e) return void console.log("contactForm is null");
    jQuery().select2 &&
      (jQuery("#contactDepartment").select2({
        minimumResultsForSearch: 1 / 0,
        placeholder: "",
      }),
      jQuery("#contactDepartment").on("change", function () {
        jQuery(this).valid();
      }));
    jQuery(e).validate({
      rules: {
        contactName: { required: !0, regex: /^[a-z\s]+$/i },
        contactEmail: { required: !0, email: !0 },
        contactPhone: {
          required: !0,
          number: !0,
          minlength: 10,
          maxlength: 10,
        },
        contactDepartment: { required: !0 },
        contactMessage: { required: !0 },
      },
      messages: {
        contactName: { regex: "Only letters are accepted!" },
        contactEmail: {
          email: "Your email address must be in correct format!",
        },
        contactPhone: {
          number: "Only numbers are accepted!",
          minlength: "Phone must be {0} characters!",
          maxlength: "Phone must be {0} characters!",
        },
      },
    }),
      e.addEventListener("submit", (r) => {
        if ((r.preventDefault(), r.stopPropagation(), jQuery(e).valid())) {
          const r = {
            contactName: e.querySelector('[name="contactName"]').value,
            contactEmail: e.querySelector('[name="contactEmail"]').value,
            contactPhone: e.querySelector('[name="contactPhone"]').value,
            contactDepartment: e.querySelector('[name="contactDepartment"]')
              .value,
            contactMessage: e.querySelector('[name="contactMessage"]').value,
          };
          console.log(r);
        }
      });
  }
  _initPersonal() {
    const e = document.getElementById("personalForm");
    if (!e) return void console.log("personalForm is null");
    jQuery().select2 &&
      (jQuery("#personalGender").select2({
        minimumResultsForSearch: 1 / 0,
        placeholder: "",
      }),
      jQuery("#personalGender").on("change", function () {
        jQuery(this).valid();
      }),
      jQuery("#personalFiling").select2({
        minimumResultsForSearch: 1 / 0,
        placeholder: "",
      }),
      jQuery("#personalFiling").on("change", function () {
        jQuery(this).valid();
      })),
      jQuery().datepicker &&
        (jQuery("#personalBirthday").datepicker({ autoclose: !0 }),
        jQuery("#personalBirthday").on("change", function () {
          jQuery(this).valid();
        }));
    jQuery(e).validate({
      rules: {
        personalName: { required: !0, regex: /^[a-z\s]+$/i },
        personalEmail: { required: !0, email: !0 },
        personalPhone: {
          required: !0,
          number: !0,
          minlength: 10,
          maxlength: 10,
        },
        personalGender: { required: !0 },
        personalFiling: { required: !0 },
        personalBirthday: { required: !0 },
        personalSocialSecurityNumber: {
          required: !0,
          regex: /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/,
        },
      },
      messages: {
        personalName: { regex: "Only letters are accepted!" },
        personalEmail: {
          email: "Your email address must be in correct format!",
        },
        personalPhone: {
          number: "Only numbers are accepted!",
          minlength: "Id must be {0} characters!",
          maxlength: "Id must be {0} characters!",
        },
        personalSocialSecurityNumber: {
          regex: "Must be in correct format with dashes!",
        },
      },
    }),
      e.addEventListener("submit", (r) => {
        if ((r.preventDefault(), r.stopPropagation(), jQuery(e).valid())) {
          const r = {
            personalName: e.querySelector('[name="personalName"]').value,
            personalEmail: e.querySelector('[name="personalEmail"]').value,
            personalPhone: e.querySelector('[name="personalPhone"]').value,
            personalGender: e.querySelector('[name="personalGender"]').value,
            personalFiling: e.querySelector('[name="personalFiling"]').value,
            personalBirthday: e.querySelector('[name="personalBirthday"]')
              .value,
            personalSocialSecurityNumber: e.querySelector(
              '[name="personalSocialSecurityNumber"]'
            ).value,
          };
          console.log(r);
        }
      });
  }
  _initAddress() {
    const e = document.getElementById("addressForm");
    if (!e) return void console.log("addressForm is null");
    jQuery().select2 && (this._initStateSelect(), this._initCitySelectEmpty());
    jQuery(e).validate({
      rules: {
        addressFirstName: { required: !0, regex: /^[a-z\s]+$/i },
        addressLastName: { required: !0, regex: /^[a-z\s]+$/i },
        addressCompany: { required: !1 },
        addressPhone: {
          required: !0,
          number: !0,
          minlength: 10,
          maxlength: 10,
        },
        addressState: { required: !0 },
        addressCity: { required: !0 },
        addressZipCode: { required: !0 },
        addressDetail: { required: !0 },
      },
      messages: {
        addressFirstName: { regex: "Only letters are accepted!" },
        addressLastName: { regex: "Only letters are accepted!" },
        addressPhone: {
          number: "Only numbers are accepted!",
          minlength: "Id must be {0} characters!",
          maxlength: "Id must be {0} characters!",
        },
      },
    }),
      e.addEventListener("submit", (r) => {
        if ((r.preventDefault(), r.stopPropagation(), jQuery(e).valid())) {
          const r = {
            addressFirstName: e.querySelector('[name="addressFirstName"]')
              .value,
            addressLastName: e.querySelector('[name="addressLastName"]').value,
            addressCompany: e.querySelector('[name="addressCompany"]').value,
            addressPhone: e.querySelector('[name="addressPhone"]').value,
            addressCountry: e.querySelector('[name="addressState"]').value,
            addressCity: e.querySelector('[name="addressCity"]').value,
            addressZipCode: e.querySelector('[name="addressZipCode"]').value,
            addressDetail: e.querySelector('[name="addressDetail"]').value,
          };
          console.log(r);
        }
      });
  }
  _initStateSelect() {
    var e = this;
    this.stateSelect = jQuery("#addressState")
      .select2({
        ajax: {
          url: "https://node-api.coloredstrategies.com/products",
          dataType: "json",
          delay: 50,
          data: function (e) {
            return { search: { value: e.term }, page: e.page };
          },
          processResults: function (e, r) {
            return { results: e.data };
          },
          cache: !0,
        },
        language: {
          searching: function () {
            return "Retrieving...";
          },
        },
        theme: "bootstrap4",
        placeholder: "Search",
        escapeMarkup: function (e) {
          return e;
        },
        minimumInputLength: 0,
        minimumResultsForSearch: 1 / 0,
        templateResult: e._formatResult,
        templateSelection: e._formatResultSelection,
        dropdownCssClass: "hide-search-searching",
      })
      .on("select2:select", function (r) {
        e._initCitySelect();
      })
      .on("change", function () {
        jQuery(this).valid();
      });
  }
  _initCitySelect() {
    this.stateSelect.val();
    this.citySelect.select2("destroy"),
      (this.citySelect = jQuery("#addressCity")
        .select2({
          ajax: {
            url: "https://node-api.coloredstrategies.com/products",
            dataType: "json",
            delay: 50,
            data: function (e) {
              return { search: { value: e.term }, page: e.page };
            },
            processResults: function (e, r) {
              return { results: e.data };
            },
            cache: !0,
          },
          language: {
            searching: function () {
              return "Retrieving...";
            },
          },
          placeholder: "Search",
          escapeMarkup: function (e) {
            return e;
          },
          minimumInputLength: 0,
          minimumResultsForSearch: 1 / 0,
          dropdownCssClass: "hide-search-searching",
          templateResult: this._formatResult,
          templateSelection: this._formatResultSelection,
          disabled: !1,
        })
        .on("change", function () {
          jQuery(this).valid();
        }));
  }
  _initCitySelectEmpty() {
    this.citySelect = jQuery("#addressCity").select2({
      minimumResultsForSearch: 1 / 0,
      language: {
        searching: function () {
          return "Retrieving...";
        },
        noResults: function () {
          return "Please select your state!";
        },
      },
      minimumResultsForSearch: 1 / 0,
    });
  }
  _formatResult(e) {
    return e.loading
      ? e.text
      : "<div class='clearfix'><div>" + e.Name + "</div>";
  }
  _formatResultSelection(e) {
    return e.Name;
  }
  _initReservation() {
    const e = document.getElementById("reservationForm");
    if (!e) return;
    jQuery().datepicker &&
      (jQuery("#reservationRangePicker").datepicker({
        weekStart: 1,
        autoclose: !0,
      }),
      jQuery("#reservationRangePicker input").on("change", function () {
        jQuery(this).valid();
      })),
      jQuery().select2 &&
        (jQuery("#reservationRoom").select2({
          minimumResultsForSearch: 1 / 0,
          placeholder: "",
        }),
        jQuery("#reservationRoom").on("change", function () {
          jQuery(this).valid();
        }),
        jQuery("#reservationAdults").select2({
          minimumResultsForSearch: 1 / 0,
          placeholder: "",
        }),
        jQuery("#reservationAdults").on("change", function () {
          jQuery(this).valid();
        }),
        jQuery("#reservationChildren").select2({
          minimumResultsForSearch: 1 / 0,
          placeholder: "",
        }),
        jQuery("#reservationChildren").on("change", function () {
          jQuery(this).valid();
        }));
    jQuery(e).validate({
      rules: {
        reservationCheckIn: { required: !0 },
        reservationCheckOut: { required: !0 },
        reservationRoom: { required: !0 },
        reservationAdults: { required: !0 },
        reservationChildren: { required: !0 },
      },
      messages: {},
    }),
      e.addEventListener("submit", (r) => {
        if ((r.preventDefault(), r.stopPropagation(), jQuery(e).valid())) {
          const r = {
            reservationCheckIn: e.querySelector('[name="reservationCheckIn"]')
              .value,
            reservationCheckOut: e.querySelector('[name="reservationCheckOut"]')
              .value,
            reservationRoom: e.querySelector('[name="reservationRoom"]').value,
            reservationAdults: e.querySelector('[name="reservationAdults"]')
              .value,
            reservationChildren: e.querySelector('[name="reservationChildren"]')
              .value,
          };
          console.log(r);
        }
      });
  }
}
