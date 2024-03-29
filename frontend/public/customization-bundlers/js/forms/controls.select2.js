class Select2Controls {
  constructor() {
    jQuery().select2
      ? (this._initSelect2Basic(),
        this._initSelect2Multiple(),
        this._initTags(),
        this._initSearchHidden(),
        this._initAjax(),
        this._initDataApi(),
        this._initTemplating(),
        this._initTopLabel(),
        this._initFilled(),
        this._initFloatingLabel())
      : console.log("select2 is null!");
  }
  _initSelect2Basic() {
    jQuery("#select2Basic").select2({ placeholder: "" });
  }
  _initSelect2Multiple() {
    jQuery("#select2Multiple").select2({});
  }
  _initTags() {
    jQuery("#select2Tags").select2({});
  }
  _initSearchHidden() {
    jQuery("#select2SearchHidden").select2({
      minimumResultsForSearch: 1 / 0,
      placeholder: "",
    });
  }
  _initAjax() {
    jQuery("#select2Ajax").select2({
      ajax: {
        url: "https://node-api.coloredstrategies.com/products",
        dataType: "json",
        delay: 250,
        data: function (e) {
          return { search: { value: e.term }, page: e.page };
        },
        processResults: function (e, l) {
          return { results: e.data };
        },
        cache: !0,
      },
      placeholder: "Search",
      escapeMarkup: function (e) {
        return e;
      },
      minimumInputLength: 1,
      templateResult: function (e) {
        if (e.loading) return e.text;
        var l = '<div class="clearfix"><div>' + e.Name + "</div>";
        return (
          e.Description &&
            (l += '<div class="text-muted">' + e.Description + "</div>"),
          l
        );
      },
      templateSelection: function (e) {
        return e.Name;
      },
    });
  }
  _initDataApi() {
    jQuery("#selectDataApi").select2({
      minimumResultsForSearch: 1 / 0,
      placeholder: "",
    });
  }
  _initTemplating() {
    jQuery("#selectTemplating").select2({
      minimumResultsForSearch: 1 / 0,
      placeholder: "",
      templateSelection: function (e) {
        if (jQuery(e.element).val())
          return jQuery(
            '<div><span class="align-middle d-inline-block option-circle me-2 rounded-xl ' +
              jQuery(e.element).data("class") +
              '"></span> <span class="align-middle d-inline-block lh-1">' +
              e.text +
              "</span></div>"
          );
      },
      templateResult: function (e) {
        if (jQuery(e.element).val())
          return jQuery(
            '<div><span class="align-middle d-inline-block option-circle me-2 rounded-xl ' +
              jQuery(e.element).data("class") +
              '"></span> <span class="align-middle d-inline-block lh-1">' +
              e.text +
              "</span></div>"
          );
      },
    });
  }
  _initTopLabel() {
    jQuery("#selectTopLabel").select2({
      minimumResultsForSearch: 1 / 0,
      placeholder: "",
    });
  }
  _initFilled() {
    jQuery("#selectFilled").select2({ minimumResultsForSearch: 1 / 0 });
  }
  _initFloatingLabel() {
    const e = this;
    jQuery("#selectFloating")
      .select2({ minimumResultsForSearch: 1 / 0, placeholder: "" })
      .on("select2:open", function (e) {
        jQuery(this).addClass("show");
      })
      .on("select2:close", function (l) {
        e._addFullClassToSelect2(this), jQuery(this).removeClass("show");
      }),
      this._addFullClassToSelect2(jQuery("#selectFloating"));
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
