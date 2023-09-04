class Icons {
  get options() {
    return {
      acornInterfaceContainerId: "acornInterfaceIconsContainer",
      acornInterfaceInputId: "acornInterfaceIconsSearch",
      acornCommerceContainerId: "acornCommerceIconsContainer",
      acornCommerceInputId: "acornCommerceIconsSearch",
      acornMedicalContainerId: "acornMedicalIconsContainer",
      acornMedicalInputId: "acornMedicalIconsSearch",
      acornLearningContainerId: "acornLearningIconsContainer",
      acornLearningInputId: "acornLearningIconsSearch",
      bootstrapContainerId: "bootstrapIconsContainer",
      bootstrapInputId: "bootstrapIconsSearch",
      datapath: Helpers.UrlFix("json/icons.json"),
    };
  }
  constructor(t = {}) {
    (this.settings = Object.assign(this.options, t)), this._init();
  }
  _init() {
    Helpers.FetchJSON(this.settings.datapath, (t) => {
      (this._data = t), this._initAfterLoad();
    });
  }
  _initAfterLoad() {
    document.getElementById(this.settings.acornInterfaceContainerId) &&
      (new IconLibrary({
        containerId: this.settings.acornInterfaceContainerId,
        inputId: this.settings.acornInterfaceInputId,
        data: this._data.acornInterface,
        isSvg: !0,
      }),
      new AcornIcons().replace()),
      document.getElementById(this.settings.acornCommerceContainerId) &&
        (new IconLibrary({
          containerId: this.settings.acornCommerceContainerId,
          inputId: this.settings.acornCommerceInputId,
          data: this._data.acornCommerce,
          isSvg: !0,
        }),
        new AcornIcons().replace()),
      document.getElementById(this.settings.acornMedicalContainerId) &&
        (new IconLibrary({
          containerId: this.settings.acornMedicalContainerId,
          inputId: this.settings.acornMedicalInputId,
          data: this._data.acornMedical,
          isSvg: !0,
        }),
        new AcornIcons().replace()),
      document.getElementById(this.settings.acornLearningContainerId) &&
        (new IconLibrary({
          containerId: this.settings.acornLearningContainerId,
          inputId: this.settings.acornLearningInputId,
          data: this._data.acornLearning,
          isSvg: !0,
        }),
        new AcornIcons().replace()),
      document.getElementById(this.settings.bootstrapContainerId) &&
        new IconLibrary({
          containerId: this.settings.bootstrapContainerId,
          inputId: this.settings.bootstrapInputId,
          data: this._data.bootstrap,
          isSvg: !1,
        });
  }
}
class IconLibrary {
  get options() {
    return { containerId: "", inputId: "", data: null };
  }
  constructor(t = {}) {
    (this.settings = Object.assign(this.options, t)), this._init();
  }
  _init() {
    (this.fuse = new Fuse(this.settings.data, {
      includeScore: !0,
      keys: ["t", "c"],
      threshold: 0.2,
    })),
      (this.foundNothing =
        '<div class="col-12 small-gutter-col flex-grow-1 mw-100"> <div class="card h-100"> <div class="card-body text-center"><i class="mb-3 d-inline-block text-primary cs-warning-hexagon"></i><p class="mb-0">Nothing found!</p></div></div></div>'),
      this._addIcons(this.settings.data),
      this._addListeners();
  }
  _addIcons(t) {
    const n = document.getElementById(this.settings.containerId);
    if (n)
      if (((n.innerHTML = ""), 0 !== t.length)) {
        for (var e = "", i = 0; i < t.length; i++) {
          let n = t[i].c || t[i].item.c;
          this.settings.isSvg
            ? (e +=
                '<div class="col small-gutter-col"> <div class="card h-100"> <div class="card-body text-center"><i class="mb-3 d-inline-block text-primary" data-acorn-icon="' +
                n +
                '" data-acorn-size="20"></i><p class="text-medium text-muted mb-0">' +
                n +
                "</p></div></div></div>")
            : (e +=
                '<div class="col small-gutter-col"> <div class="card h-100"> <div class="card-body text-center"><i class="mb-3 d-inline-block text-primary icon-20 ' +
                n +
                '"></i><p class="text-medium text-muted mb-0">' +
                n +
                "</p></div></div></div>");
        }
        n.insertAdjacentHTML("beforeend", e),
          "undefined" != typeof AcornIcons && new AcornIcons().replace();
      } else n.insertAdjacentHTML("beforeend", this.foundNothing);
  }
  _addListeners() {
    const t = document.getElementById(this.settings.inputId);
    t &&
      t.addEventListener(
        "keyup",
        Helpers.Debounce(this._search.bind(this), 500).bind(this)
      );
  }
  _search() {
    const t = document.getElementById(this.settings.inputId).value;
    if ("" === t) return void this._addIcons(this.settings.data);
    const n = this.fuse.search(t);
    this._addIcons(n);
  }
}
