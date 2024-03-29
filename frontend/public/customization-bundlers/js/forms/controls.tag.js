class TagControls {
  constructor() {
    "undefined" != typeof Tagify
      ? (this._initTagsBasic(),
        this._initTagsTextArea(),
        this._initTagsCustomLook(),
        this._initTagsAdvanced(),
        this._initTagsOutside(),
        this._initUsersListTags(),
        this._initTagsWithProps(),
        this._initTagsReadonly(),
        this._initTagsReadonlyMix(),
        this._initTagsSelectMode(),
        this._initTagsTopLabel(),
        this._initTagsFilled(),
        this._initTagsFloatingLabel())
      : console.log("Tagify is undefined!");
  }
  _initTagsBasic() {
    document.querySelector("#tagsBasic") &&
      new Tagify(document.querySelector("#tagsBasic"));
  }
  _initTagsOutside() {
    document.querySelector("#tagsOutside") &&
      new Tagify(document.querySelector("#tagsOutside"), {
        whitelist: [
          "Anpan",
          "Breadstick",
          "Biscotti",
          "Cholermüs",
          "Dorayaki",
          "Fougasse",
          "Kifli",
          "Lefse",
          "Melonpan",
          "Naan",
          "Qistibi",
          "Panbrioche",
          "Rewena",
          "Shirmal",
          "Tunnbröd",
          "Vánočka",
          "Zopf",
        ],
        dropdown: { position: "input", enabled: 0 },
      });
  }
  _initTagsTextArea() {
    document.querySelector("#tagsTextArea") &&
      new Tagify(document.querySelector("#tagsTextArea"), {
        enforceWhitelist: !0,
        delimiters: null,
        whitelist: [
          "Anpan",
          "Breadstick",
          "Biscotti",
          "Cholermüs",
          "Dorayaki",
          "Fougasse",
          "Kifli",
          "Lefse",
          "Melonpan",
          "Naan",
          "Qistibi",
          "Panbrioche",
          "Rewena",
          "Shirmal",
          "Tunnbröd",
          "Vánočka",
          "Zopf",
        ],
        callbacks: { add: console.log, remove: console.log },
      });
  }
  _initTagsReadonly() {
    document.querySelector("#tagsReadonly") &&
      new Tagify(document.querySelector("#tagsReadonly"));
  }
  _initTagsReadonlyMix() {
    document.querySelector("#tagsReadonlyMix") &&
      new Tagify(document.querySelector("#tagsReadonlyMix"));
  }
  _initTagsTopLabel() {
    document.querySelector("#tagsTopLabel") &&
      new Tagify(document.querySelector("#tagsTopLabel"));
  }
  _initTagsFilled() {
    document.querySelector("#tagsFilled") &&
      new Tagify(document.querySelector("#tagsFilled"));
  }
  _initTagsFloatingLabel() {
    document.querySelector("#tagsFloatingLabel") &&
      new Tagify(document.querySelector("#tagsFloatingLabel"));
  }
  _initTagsSelectMode() {
    if (document.querySelector("#tagsSelectMode"))
      new Tagify(document.querySelector("#tagsSelectMode"), {
        mode: "select",
        whitelist: ["first option", "second option", "third option"],
        blacklist: ["foo", "bar"],
        keepInvalidTags: !0,
        dropdown: {},
      });
  }
  _initTagsWithProps() {
    if (document.querySelector("#tagsWithProps")) {
      var e = new Tagify(document.querySelector("#tagsWithProps"), {
        delimiters: null,
        templates: {
          tag: function (e) {
            try {
              return `<tag title='${
                e.value
              }' contenteditable='false' spellcheck="false" class='tagify__tag ${
                e.class ? e.class : ""
              }' ${this.getAttributes(
                e
              )}>\n                                  <x title='remove tag' class='tagify__tag__removeBtn'></x>\n                                  <div>\n                                      ${
                e.code
                  ? `<img onerror="this.style.visibility = 'hidden'" src='https://lipis.github.io/flag-icon-css/flags/4x3/${e.code.toLowerCase()}.svg' />`
                  : ""
              }\n                                      <span class='tagify__tag-text'>${
                e.value
              }</span>\n                                  </div>\n                              </tag>`;
            } catch (e) {}
          },
          dropdownItem: function (e) {
            try {
              return `<div class='tagify__dropdown__item ${
                e.class ? e.class : ""
              }' tagifySuggestionIdx="${
                e.tagifySuggestionIdx
              }">\n                                      <img onerror="this.style.visibility = 'hidden'"\n                                           src='https://lipis.github.io/flag-icon-css/flags/4x3/${e.code.toLowerCase()}.svg' />\n                                      <span>${
                e.value
              }</span>\n                                  </div>`;
            } catch (e) {}
          },
        },
        enforceWhitelist: !0,
        whitelist: [
          { value: "Afghanistan", code: "AF" },
          { value: "Åland Islands", code: "AX" },
          { value: "Albania", code: "AL" },
          { value: "Algeria", code: "DZ" },
          { value: "American Samoa", code: "AS" },
          { value: "Andorra", code: "AD" },
          { value: "Angola", code: "AO" },
          { value: "Anguilla", code: "AI" },
          { value: "Antarctica", code: "AQ" },
          { value: "Antigua and Barbuda", code: "AG" },
          { value: "Argentina", code: "AR" },
          { value: "Armenia", code: "AM" },
          { value: "Aruba", code: "AW" },
          { value: "Australia", code: "AU", searchBy: "beach, sub-tropical" },
          { value: "Austria", code: "AT" },
          { value: "Azerbaijan", code: "AZ" },
        ],
        dropdown: { enabled: 1, classname: "extra-properties" },
      });
      e.on("click", function (e) {}),
        e.on("remove", function (e) {}),
        e.on("add", function (e) {});
      var a = e.settings.whitelist.slice(0, 2);
      e.addTags(a);
    }
  }
  _initTagsCustomLook() {
    if (document.querySelector("#tagsCustomLook")) {
      var e = Array.apply(null, Array(100)).map(function () {
          return (
            Array.apply(null, Array(~~(10 * Math.random() + 3)))
              .map(function () {
                return String.fromCharCode(26 * Math.random() + 97);
              })
              .join("") + "@gmail.com"
          );
        }),
        a = document.querySelector("#tagsCustomLook"),
        t = new Tagify(a, {
          pattern:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          whitelist: e,
          callbacks: { invalid: function (e) {} },
          dropdown: { position: "text", enabled: 1 },
        });
      a.nextElementSibling.addEventListener("click", function () {
        t.addEmptyTag();
      });
    }
  }
  _initUsersListTags() {
    if (document.querySelector("#usersListTags")) {
      var e,
        a = new Tagify(document.querySelector("#usersListTags"), {
          enforceWhitelist: !0,
          skipInvalid: !0,
          dropdown: {
            closeOnSelect: !1,
            enabled: 0,
            classname: "users-list",
            searchKeys: ["name", "email"],
          },
          templates: {
            tag: function (e) {
              return `\n                    <tag title="${
                e.email
              }"\n                            contenteditable='false'\n                            spellcheck='false'\n                            tabIndex="-1"\n                            class="tagify__tag ${
                e.class ? e.class : ""
              }"\n                            ${this.getAttributes(
                e
              )}>\n                        <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>\n                        <div>\n                            <div class='tagify__tag__avatar-wrap'>\n                                <img src="${
                e.avatar
              }" />\n                            </div>\n                            <span class='tagify__tag-text'>${
                e.name
              }</span>\n                        </div>\n                    </tag>`;
            },
            dropdownItem: function (e) {
              return `\n                    <div ${this.getAttributes(
                e
              )}\n                        class='tagify__dropdown__item ${
                e.class ? e.class : ""
              }'\n                        tabindex="0"\n                        role="option">\n                        ${
                e.avatar
                  ? `<div class='tagify__dropdown__item__avatar-wrap'>\n                            <img src="${e.avatar}" />\n                        </div>`
                  : ""
              }\n                        <strong>${
                e.name
              }</strong>\n                        <span>${
                e.email
              }</span>\n                    </div>`;
            },
          },
          whitelist: [
            {
              value: 1,
              name: "Justinian Hattersley",
              avatar: "img/profile/profile-1.webp",
              email: "jhattersley0@ucsd.edu",
            },
            {
              value: 2,
              name: "Antons Esson",
              avatar: "img/profile/profile-2.webp",
              email: "aesson1@ning.com",
            },
            {
              value: 3,
              name: "Ardeen Batisse",
              avatar: "img/profile/profile-3.webp",
              email: "abatisse2@nih.gov",
            },
            {
              value: 4,
              name: "Graeme Yellowley",
              avatar: "img/profile/profile-4.webp",
              email: "gyellowley3@behance.net",
            },
            {
              value: 5,
              name: "Dido Wilford",
              avatar: "img/profile/profile-5.webp",
              email: "dwilford4@jugem.jp",
            },
            {
              value: 6,
              name: "Celesta Orwin",
              avatar: "img/profile/profile-6.webp",
              email: "corwin5@meetup.com",
            },
            {
              value: 7,
              name: "Sally Main",
              avatar: "img/profile/profile-7.webp",
              email: "smain6@techcrunch.com",
            },
            {
              value: 8,
              name: "Grethel Haysman",
              avatar: "img/profile/profile-8.webp",
              email: "ghaysman7@mashable.com",
            },
          ],
        });
      a.on("dropdown:show dropdown:updated", function (t) {
        var i = t.detail.tagify.DOM.dropdown.content;
        a.suggestedListItems.length > 1 &&
          ((e = a.parseTemplate("dropdownItem", [
            {
              class: "addAll",
              name: "Add all",
              email:
                a.settings.whitelist.reduce(function (e, t) {
                  return a.isTagDuplicate(t.value) ? e : e + 1;
                }, 0) + " Members",
            },
          ])),
          i.insertBefore(e, i.firstChild));
      }),
        a.on("dropdown:select", function (t) {
          t.detail.elm == e && a.dropdown.selectAll.call(a);
        });
    }
  }
  _initTagsAdvanced() {
    if (document.querySelector("#tagsAdvanced")) {
      var e = [
          "Anpan",
          "Breadstick",
          "Biscotti",
          "Cholermüs",
          "Dorayaki",
          "Fougasse",
          "Kifli",
          "Lefse",
          "Melonpan",
          "Naan",
          "Qistibi",
          "Panbrioche",
          "Rewena",
          "Shirmal",
          "Tunnbröd",
          "Vánočka",
          "Zopf",
        ],
        a = new Tagify(document.querySelector("#tagsAdvanced"), {
          enforceWhitelist: !0,
          dropdown: { enabled: 1 },
          whitelist: document
            .querySelector("#tagsAdvanced")
            .value.trim()
            .split(/\s*,\s*/),
        });
      document
        .querySelector("#removeAllTags")
        .addEventListener("click", a.removeAllTags.bind(a)),
        a
          .on("add", function e(t) {
            console.log("onAddTag: ", t.detail),
              console.log(
                "original input value: ",
                document.querySelector("#tagsAdvanced").value
              ),
              a.off("add", e);
          })
          .on("remove", function (e) {
            console.log(
              "onRemoveTag:",
              e.detail,
              "tagify instance value:",
              a.value
            );
          })
          .on("input", function (e) {
            console.log("onInput: ", e.detail),
              (a.settings.whitelist.length = 0),
              a.loading(!0).dropdown.hide.call(a),
              t().then(function (t) {
                a.settings.whitelist.push(...t, ...a.value),
                  a.loading(!1).dropdown.show.call(a, e.detail.value);
              });
          })
          .on("edit", function (e) {})
          .on("invalid", function (e) {})
          .on("click", function (e) {})
          .on("focus", i)
          .on("blur", i)
          .on("dropdown:hide dropdown:show", (e) => console.log(e.type))
          .on("dropdown:select", function (e) {});
      var t = function (a) {
        return (
          clearTimeout(n),
          new Promise(function (t, i) {
            n = setTimeout(t, a || 700, e);
          })
        );
      };
      function i(e) {}
    }
    var n;
  }
}
