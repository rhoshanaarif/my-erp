class FormValidation {
    constructor() {
      jQuery().validate
        ? (this._initBasicForm(),
          this._initCommonRules(),
          this._initTopLabelValidation(),
          this._initFloatingLabelValidation(),
          this._initFilledValidation(),
          this._initPositions(),
          this._initBootstrapValidation())
        : console.log("validate is undefined!");
    }
    _initBasicForm() {
      jQuery().select2 &&
        (jQuery("#basicValidationSelect2").select2({
          minimumResultsForSearch: 1 / 0,
          placeholder: "",
        }),
        jQuery("#basicValidationSelect2").on("change", function () {
          jQuery(this).valid();
        })),
        jQuery().datepicker &&
          (jQuery("#basicValidationDate").datepicker({ autoclose: !0 }),
          jQuery("#basicValidationDate").on("change", function () {
            jQuery(this).valid();
          })),
        jQuery("#exampleForm").validate();
    }
    _initTopLabelValidation() {
      jQuery().select2 &&
        (jQuery("#select2TopLabel").select2({
          minimumResultsForSearch: 1 / 0,
          placeholder: "",
        }),
        jQuery("#select2TopLabel").on("change", function () {
          jQuery(this).valid();
        })),
        "undefined" != typeof Tagify &&
          (null !== document.querySelector("#tagsTopLabel") &&
            new Tagify(document.querySelector("#tagsTopLabel")),
          jQuery("#tagsTopLabel").on("change", function () {
            jQuery(this).valid();
          })),
        jQuery().datepicker &&
          (jQuery("#dateTopLabel").datepicker({ autoclose: !0 }),
          jQuery("#dateTopLabel").on("change", function () {
            jQuery(this).valid();
          })),
        jQuery("#validationTopLabel").validate();
    }
    _initFloatingLabelValidation() {
      const e = this;
      jQuery().select2 &&
        (jQuery(".select2FloatingLabel")
          .select2({ minimumResultsForSearch: 1 / 0, placeholder: "" })
          .on("select2:open", function (e) {
            jQuery(this).addClass("show");
          })
          .on("select2:close", function (a) {
            e._addFullClassToSelect2(this), jQuery(this).removeClass("show");
          }),
        this._addFullClassToSelect2(jQuery(".select2FloatingLabel")),
        jQuery(".select2FloatingLabel").on("change", function () {
          jQuery(this).valid();
        })),
        "undefined" != typeof Tagify &&
          null !== document.querySelector("#tagsFloatingLabel") &&
          (new Tagify(document.querySelector("#tagsFloatingLabel")),
          jQuery("#tagsFloatingLabel").on("change", function () {
            jQuery(this).valid();
          })),
        jQuery().datepicker &&
          (jQuery("#datePickerFloatingLabel")
            .datepicker({ autoclose: !0 })
            .on("show", function (e) {
              jQuery(this).addClass("show");
            }),
          jQuery("#datePickerFloatingLabel").on("change", function () {
            jQuery(this).valid();
          })),
        jQuery("#validationFloatingLabel").validate();
    }
    _initFilledValidation() {
      jQuery().select2 &&
        (jQuery("#select2Filled").select2({ minimumResultsForSearch: 1 / 0 }),
        this._addFullClassToSelect2(jQuery("#select2Filled")),
        jQuery("#select2Filled").on("change", function () {
          jQuery(this).valid();
        })),
        "undefined" != typeof Tagify &&
          null !== document.querySelector("#tagsFilled") &&
          (new Tagify(document.querySelector("#tagsFilled")),
          jQuery("#tagsFilled").on("change", function () {
            jQuery(this).valid();
          })),
        jQuery().datepicker &&
          (jQuery("#datePickerFilled").datepicker({ autoclose: !0 }),
          jQuery("#datePickerFilled").on("change", function () {
            jQuery(this).valid();
          })),
        jQuery("#validationFilled").validate();
    }
    _initPositions() {
      jQuery().validate && jQuery("#tooltipPositions").validate();
    }
    _addFullClassToSelect2(e) {
      "" !== jQuery(e).val() && null !== jQuery(e).val()
        ? jQuery(e).parent().find(".select2.select2-container").addClass("full")
        : jQuery(e)
            .parent()
            .find(".select2.select2-container")
            .removeClass("full");
    }
    _initCommonRules() {
      jQuery("#rulesForm").validate({
        rules: {
          rulesName: { required: !0, lettersonly: !0 },
          rulesEmail: { required: !0, email: !0 },
          rulesId: { required: !0, minlength: 8, maxlength: 8, number: !0 },
          rulesDetail: { required: !0, maxlength: 20 },
          rulesPassword: { required: !0, minlength: 6 },
          rulesPasswordConfirm: {
            required: !0,
            minlength: 6,
            equalTo: "#rulesPassword",
          },
          rulesCreditCard: { creditcard: !0, nowhitespace: !0, required: !0 },
          rulesAge: { number: !0, min: 18, required: !0 },
        },
        messages: {
          rulesName: { lettersonly: "Only letters are accepted!" },
          rulesEmail: { email: "Your email address must be in correct format!" },
          rulesId: {
            number: "Must be a number!",
            minlength: "Id must be {0} characters!",
            maxlength: "Id must be {0} characters!",
          },
          rulesPassword: {
            minlength: "Password must be at least {0} characters!",
          },
          rulesPasswordConfirm: {
            equalTo: "Passwords must match!",
            minlength: "Password must be at least {0} characters!",
          },
          rulesDetail: { maxlength: "Details must be maximum {0} characters!" },
          rulesCreditCard: {
            creditcard: "Must be a valid credit card number!",
            nowhitespace: "Must not contain whitespace!",
          },
        },
      });
    }
    _initBootstrapValidation() {
      var e = document.querySelectorAll(".needs-validation");
      Array.prototype.slice.call(e).forEach(function (e) {
        e.addEventListener(
          "submit",
          function (a) {
            e.checkValidity() || (a.preventDefault(), a.stopPropagation()),
              e.classList.add("was-validated");
          },
          !1
        );
      });
    }
  }
  