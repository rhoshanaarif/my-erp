class Shortcuts {
  constructor() {
    "undefined" != typeof Mousetrap
      ? (this._initSingleKeys(),
        this._initCombination(),
        this._initOverride(),
        this._initWrapping())
      : console.log("Mousetrap is null!");
  }
  _initSingleKeys() {
    Mousetrap.bind("s", function () {
      new bootstrap.Modal(document.getElementById("searchPagesModal")).show();
    }),
      Mousetrap.bind("o", function () {
        new bootstrap.Modal(document.getElementById("settings")).show();
      }),
      Mousetrap.bind(["d", "l"], function () {
        const t = document.getElementById("colorButton");
        t && t.click();
      });
  }
  _initCombination() {
    Mousetrap.bind(["mod+shift+1"], function (t) {
      document.querySelector("#button1").classList.contains("active")
        ? document.querySelector("#button1").classList.remove("active")
        : document.querySelector("#button1").classList.add("active");
    }),
      Mousetrap.bind(["mod+shift+2"], function (t) {
        document.querySelector("#button2").classList.contains("active")
          ? document.querySelector("#button2").classList.remove("active")
          : document.querySelector("#button2").classList.add("active");
      });
  }
  _initOverride() {
    document.querySelectorAll("#selectAllList li").length > 0 &&
      (Mousetrap.bind(["mod+a"], function (t) {
        t.preventDefault(),
          document.querySelectorAll("#selectAllList li").forEach((t) => {
            t.classList.add("active");
          });
      }),
      Mousetrap.bind(["mod+d"], function (t) {
        t.preventDefault(),
          document.querySelectorAll("#selectAllList li").forEach((t) => {
            t.classList.remove("active");
          });
      }));
  }
  _initWrapping() {
    document.querySelector("#wrapperForm") &&
      Mousetrap(document.querySelector("#wrapperForm")).bind(
        ["mod+s"],
        function (t) {
          t.preventDefault(),
            document
              .querySelector("#submitButton")
              .setAttribute("disabled", !0),
            (document.querySelector("#submitButton .label").innerHTML =
              "Saving..."),
            document
              .querySelector("#submitButton .spinner-border")
              .classList.remove("d-none"),
            setTimeout(() => {
              document
                .querySelector("#submitButton")
                .removeAttribute("disabled"),
                (document.querySelector("#submitButton .label").innerHTML =
                  "Save"),
                document
                  .querySelector("#submitButton .spinner-border")
                  .classList.add("d-none");
            }, 1e3);
        }
      );
  }
}
