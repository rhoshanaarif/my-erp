class FormLayouts {
  constructor() {
    this._initBasicForm(),
      this._initTopLabelForm(),
      this._initFloatingLabelForm(),
      this._initFilledForm();
  }
  _initBasicForm() {
    jQuery().select2 &&
      jQuery("#selectBasic").select2({
        minimumResultsForSearch: 1 / 0,
        placeholder: "",
      }),
      "undefined" != typeof Tagify &&
        null !== document.querySelector("#tagBasic") &&
        new Tagify(document.querySelector("#tagBasic")),
      jQuery().datepicker &&
        jQuery("#datePickerBasic").datepicker({ autoclose: !0 });
  }
  _initTopLabelForm() {
    jQuery().select2 &&
      jQuery("#select2TopLabel").select2({
        minimumResultsForSearch: 1 / 0,
        placeholder: "",
      }),
      "undefined" != typeof Tagify &&
        null !== document.querySelector("#tagsTopLabel") &&
        new Tagify(document.querySelector("#tagsTopLabel")),
      jQuery().datepicker &&
        jQuery("#dateTopLabel").datepicker({ autoclose: !0 });
  }
  _initFloatingLabelForm() {
    const e = this;
    jQuery().select2 &&
      (jQuery(".select2FloatingLabel")
        .select2({ minimumResultsForSearch: 1 / 0, placeholder: "" })
        .on("select2:open", function (e) {
          jQuery(this).addClass("show");
        })
        .on("select2:close", function (l) {
          e._addFullClassToSelect2(this), jQuery(this).removeClass("show");
        }),
      this._addFullClassToSelect2(jQuery(".select2FloatingLabel"))),
      "undefined" != typeof Tagify &&
        null !== document.querySelector("#tagsFloatingLabel") &&
        new Tagify(document.querySelector("#tagsFloatingLabel")),
      jQuery().datepicker &&
        jQuery("#datePickerFloatingLabel")
          .datepicker({ autoclose: !0 })
          .on("show", function (e) {
            jQuery(this).addClass("show");
          });
  }
  _initFilledForm() {
    jQuery().select2 &&
      jQuery("#select2Filled").select2({ minimumResultsForSearch: 1 / 0 }),
      "undefined" != typeof Tagify &&
        null !== document.querySelector("#tagsFilled") &&
        new Tagify(document.querySelector("#tagsFilled")),
      jQuery().datepicker &&
        jQuery("#datePickerFilled").datepicker({ autoclose: !0 });
  }
  _addFullClassToSelect2(e) {
    "" !== jQuery(e).val() && null !== jQuery(e).val()
      ? jQuery(e).parent().find(".select2.select2-container").addClass("full")
      : jQuery(e)
          .parent()
          .find(".select2.select2-container")
          .removeClass("full");
  }
}
