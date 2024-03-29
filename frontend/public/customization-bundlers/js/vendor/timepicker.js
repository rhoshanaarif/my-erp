class TimePicker {
  get options() {
    return {
      hours24:
        "0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23",
      hours12: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12",
      minutes: "0, 15, 30, 45",
      format: "24",
      delimiter: ":",
      addZeros: "true",
      output: "string",
      classname: "",
      containerClassname: "",
    };
  }
  constructor(e, t = {}) {
    (this.settings = Object.assign(this.options, t)),
      (this.settings = Object.assign(this.settings, e.dataset)),
      (this.element = e),
      (this.parent = e.parentNode),
      this.hoursSelect,
      this.minutesSelect,
      this.amPmSelect,
      this._init(),
      this._initStartValue();
  }
  _initStartValue() {
    if ("" === this.element.value) return;
    let e = this.element.value.split(this.settings.delimiter),
      t = e[0] + "",
      s = e[1] + "";
    this.hoursSelect.val(t).trigger("change"),
      this.minutesSelect.val(s).trigger("change"),
      "12" === this.settings.format &&
        this.amPmSelect.val(e[2]).trigger("change");
  }
  _init() {
    "12" === this.settings.format
      ? (this.hoursArray = this.settings.hours12.replace(/\s/g, "").split(","))
      : (this.hoursArray = this.settings.hours24.replace(/\s/g, "").split(",")),
      (this.minutesArray = this.settings.minutes.replace(/\s/g, "").split(",")),
      this._addSelects(),
      this._addListeners();
  }
  _addListeners() {
    this.minutesSelect.on("change", (e) => {
      this._updateInput();
    }),
      this.hoursSelect.on("change", (e) => {
        this._updateInput();
      }),
      this.minutesSelect.on("select2:open", (e) => {
        this._onOpen();
      }),
      this.hoursSelect.on("select2:close", (e) => {
        this._onClose();
      }),
      this.minutesSelect.on("select2:close", (e) => {
        this._onClose();
      }),
      this.hoursSelect.on("select2:open", (e) => {
        this._onOpen();
      }),
      this.amPmSelect &&
        (this.amPmSelect.on("change", (e) => {
          this._updateInput();
        }),
        this.amPmSelect.on("select2:open", (e) => {
          this._onOpen();
        }),
        this.amPmSelect.on("select2:close", (e) => {
          this._onClose();
        }));
  }
  _updateInput() {
    let e,
      t = parseInt(this.hoursSelect.val() || 0),
      s = parseInt(this.minutesSelect.val() || 0);
    if (
      ("12" === this.settings.format &&
        ((e = this.amPmSelect.val()), "PM" === e && (t = parseInt(t) + 12)),
      "date" === this.settings.output)
    ) {
      var i = new Date();
      i.setHours(t), i.setMinutes(s), i.setSeconds(0), (this.element.value = i);
    } else {
      if (
        ((this.element.value = t + this.settings.delimiter + s),
        "true" === this.settings.addZeros)
      ) {
        let e = t < 10 ? "0" + t : t,
          i = s < 10 ? "0" + s : s;
        this.element.value = e + this.settings.delimiter + i;
      }
      "12" === this.settings.format &&
        e &&
        (this.element.value += this.settings.delimiter + e);
    }
    this.element.dispatchEvent(new CustomEvent("UPDATE"));
  }
  _addSelects() {
    this._addHours(),
      this._addMinutes(),
      "12" === this.settings.format && this._addAmPm();
  }
  _addHours() {
    var e = document.createElement("select");
    e.classList.add("time-picker-select"), e.classList.add("time-picker-hour");
    var t = document.createElement("option");
    e.appendChild(t);
    const s = this.hoursArray;
    for (var i = 0; i < s.length; i++) {
      ((t = document.createElement("option")).text = s[i]),
        (t.value = s[i]),
        "true" === this.settings.addZeros &&
          parseInt(s[i]) < 10 &&
          ((t.text = "0" + s[i]), (t.value = "0" + s[i])),
        e.appendChild(t);
    }
    this.parent.insertBefore(e, this.element),
      (this.hoursSelect = jQuery(e).select2({
        minimumResultsForSearch: 1 / 0,
        dropdownCssClass:
          "time-picker-dropdown " + this.settings.dropdownClassname,
        placeholder: "",
      })),
      this.hoursSelect
        .data("select2")
        .$container.addClass(this.settings.classname);
  }
  _addMinutes() {
    var e = document.createElement("select");
    e.classList.add("time-picker-select"),
      e.classList.add("time-picker-minute");
    var t = document.createElement("option");
    e.appendChild(t);
    const s = this.minutesArray;
    for (var i = 0; i < s.length; i++) {
      ((t = document.createElement("option")).text = s[i]),
        (t.value = s[i]),
        "true" === this.settings.addZeros &&
          parseInt(s[i]) < 10 &&
          ((t.text = "0" + s[i]), (t.value = "0" + s[i])),
        e.appendChild(t);
    }
    this.parent.insertBefore(e, this.element),
      (this.minutesSelect = jQuery(e).select2({
        minimumResultsForSearch: 1 / 0,
        dropdownCssClass:
          "time-picker-dropdown " + this.settings.dropdownClassname,
        placeholder: "",
      })),
      this.minutesSelect
        .data("select2")
        .$container.addClass(this.settings.classname);
  }
  _addAmPm() {
    var e = document.createElement("select");
    e.classList.add("time-picker-select"), e.classList.add("time-picker-ampm");
    var t = document.createElement("option");
    e.appendChild(t),
      ((t = document.createElement("option")).text = "AM"),
      (t.value = "AM"),
      e.appendChild(t),
      ((t = document.createElement("option")).text = "PM"),
      (t.value = "PM"),
      e.appendChild(t),
      this.parent.insertBefore(e, this.element),
      (this.amPmSelect = jQuery(e).select2({
        minimumResultsForSearch: 1 / 0,
        dropdownCssClass:
          "time-picker-dropdown am-pm " + this.settings.dropdownClassname,
        placeholder: "",
      })),
      this.amPmSelect
        .data("select2")
        .$container.addClass(this.settings.classname);
  }
  setTime(e) {
    (this.element.value = e), this._initStartValue();
  }
  setTimeFromDateObject(e) {
    this.setTime(
      ("0" + e.getHours()).substr(-2) + ":" + ("0" + e.getMinutes()).substr(-2)
    );
  }
  getTime() {
    return this.element.value;
  }
  getTimeAsDateObject() {
    let e = this.element.value.split(this.settings.delimiter),
      t = e[0] + "",
      s = e[1] + "",
      i = new Date();
    return i.setHours(t), i.setMinutes(s), i.setSeconds(0), i;
  }
  reset() {
    this.hoursSelect.val(null).trigger("change"),
      this.minutesSelect.val(null).trigger("change"),
      (this.element.value = ""),
      this._initStartValue();
  }
  _onOpen() {
    this.element.parentNode.classList.add("focus");
  }
  _onClose() {
    this.element.parentNode.classList.remove("focus");
  }
}
