class BlocksList {
  constructor() {
    (this._progressBars = []),
      "undefined" != typeof ProgressBar
        ? this._initProgressBars()
        : console.error("[CS] ProgressBar is undefined."),
      this._initEvents();
  }
  _initProgressBars() {
    document.querySelectorAll(".progress-bar-line").forEach((t, r) => {
      const e = t.getAttribute("aria-valuenow"),
        a = Globals[t.getAttribute("data-color")] || Globals.primary,
        s = Globals[t.getAttribute("data-trail-color")] || Globals.separator,
        o = t.getAttribute("aria-valuemax") || 100,
        i = t.getAttribute("data-show-percent"),
        l = t.getAttribute("data-hide-all-text"),
        n = t.getAttribute("data-stroke-width") || 1,
        u = t.getAttribute("data-trail-width") || 1,
        g = parseInt(t.getAttribute("data-duration")) || 20,
        d = t.getAttribute("data-easing") || "easeInOut";
      this._progressBars.push(
        new ProgressBar.Line(t, {
          color: a,
          duration: g,
          easing: d,
          strokeWidth: n,
          trailColor: s,
          trailWidth: u,
          val: e,
          max: o,
          text: { autoStyleContainer: !1 },
          step: function (t, r) {
            "false" === l &&
              ("true" === i
                ? r.setText(Math.round(100 * r.value()) + "%")
                : r.setText(Math.round(r.value() * o) + "/" + o));
          },
        })
      );
    }),
      document.querySelectorAll(".progress-bar-circle").forEach((t, r) => {
        const e = t.getAttribute("aria-valuenow"),
          a = Globals[t.getAttribute("data-color")] || Globals.primary,
          s = Globals[t.getAttribute("data-trail-color")] || Globals.separator,
          o = t.getAttribute("aria-valuemax") || 100,
          i = t.getAttribute("data-show-percent"),
          l = t.getAttribute("data-hide-all-text"),
          n = t.getAttribute("data-stroke-width") || 1,
          u = t.getAttribute("data-trail-width") || 1,
          g = parseInt(t.getAttribute("data-duration")) || 20,
          d = t.getAttribute("data-easing") || "easeInOut";
        this._progressBars.push(
          new ProgressBar.Circle(t, {
            color: a,
            duration: g,
            easing: d,
            strokeWidth: n,
            trailColor: s,
            trailWidth: u,
            val: e,
            max: o,
            text: { autoStyleContainer: !1 },
            step: function (t, r) {
              "false" === l &&
                ("true" === i
                  ? r.setText(Math.round(100 * r.value()) + "%")
                  : r.setText(e + "/" + o));
            },
          })
        );
      });
    for (let t = 0; t < this._progressBars.length; t++)
      this._progressBars[t].animate(
        this._progressBars[t]._opts.val / this._progressBars[t]._opts.max
      );
  }
  _progressBarsDestroy() {
    for (let t = 0; t < this._progressBars.length; t++)
      this._progressBars[t].destroy();
    this._progressBars = [];
  }
  _progressBarsUpdate() {
    this._progressBarsDestroy(), this._initProgressBars();
  }
  _initEvents() {
    document.documentElement.addEventListener(
      Globals.colorAttributeChange,
      (t) => {
        this._progressBarsUpdate();
      }
    );
  }
}
