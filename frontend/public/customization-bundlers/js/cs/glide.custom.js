class GlideCustom {
  get options() {
    return {};
  }
  get glide() {
    return this._glide;
  }
  constructor(e, i = {}, t = !0) {
    (this.settings = Object.assign(this.options, i)),
      this._glide,
      (this.addDots = t),
      (this.element = e),
      this._init();
  }
  _init() {
    "undefined" != typeof Glide
      ? ((this._glide = new Glide(this.element, this.settings)),
        this.addDots &&
          this._glide.on(["mount.before"], () => {
            const e =
                this._glide.selector.querySelectorAll(".glide__slide").length,
              i = this._glide.selector.querySelectorAll(".glide__bullets")[0];
            if (i) {
              for (; i.firstChild; ) i.removeChild(i.firstChild);
              for (let t = 0; t < e; t++) {
                const e = document.createElement("button");
                (e.className = "glide__bullet"),
                  e.setAttribute("data-glide-dir", "=" + t),
                  i.appendChild(e);
              }
            }
          }),
        this._glide.on(["resize", "build.after"], () => {
          const e = this._glide.settings.perView,
            i =
              this._glide.selector.querySelectorAll(".glide__slide").length - e;
          this._glide.selector
            .querySelectorAll(".glide__bullet")
            .forEach((e, t) => {
              t > i ? e.classList.add("d-none") : e.classList.remove("d-none");
            }),
            this._glide.index > i && i >= 0 && this._glide.go("=" + i);
        }))
      : console.log("Glide is undefined!");
  }
  mount() {
    this._glide.mount();
  }
  update() {
    this._glide.update();
  }
  destroy() {
    this._glide.destroy();
  }
}
class GlideGallery {
  get glideLarge() {
    return this._glideLarge;
  }
  get glideThumb() {
    return this._glideThumb;
  }
  get optionsLarge() {
    return {};
  }
  get optionsThumb() {
    return {};
  }
  constructor(e, i, t = {}, s = {}, l, h, d) {
    (this.settingsLarge = Object.assign(this.optionsLarge, t)),
      (this.settingsThumb = Object.assign(this.optionsThumb, s)),
      (this.elementLarge = e),
      (this.elementThumb = i),
      this._glideLarge,
      this._glideThumb,
      (this._glideLength = l),
      (this._perView = h),
      (this._thumbWidth = d),
      this._baguetteBox,
      (this._linkAllowClick = !0),
      (this._linkSwipeEnd = !0),
      this._init(),
      this._addActiveThumbClass(0),
      this._addListeners(),
      this._mount(),
      this._onGlideThumbResize(),
      this._initBaguetteBox(),
      window.dispatchEvent(new Event("resize"));
  }
  _init() {
    (this.elementThumb.style.width = this._perView * this._thumbWidth + "px"),
      (this._glideLarge = new Glide(this.elementLarge, this.settingsLarge)),
      (this._glideThumb = new Glide(this.elementThumb, this.settingsThumb));
  }
  _mount() {
    this._glideLarge.mount().update(), this._glideThumb.mount().update();
  }
  _addActiveThumbClass(e) {
    this.elementThumb.querySelectorAll("li").forEach((i, t) => {
      i.classList.remove("active"), t === e && i.classList.add("active");
    });
    var i = this.glideThumb.index + this._perView;
    e >= i && this.glideThumb.go(">"),
      e < this.glideThumb.index && this.glideThumb.go("<");
  }
  _onThumbClick(e) {
    var i = this._getIndex(e.currentTarget);
    this.glideLarge.go("=" + i), this._addActiveThumbClass(i);
  }
  _onGlideThumbResize() {
    (this._perView = Math.min(
      this.glideThumb.settings.perView,
      this._glideLength
    )),
      (this.elementThumb.style.width = this._perView * this._thumbWidth + "px"),
      this._perView >= this.elementThumb.querySelectorAll("li").length
        ? (this.elementThumb.querySelector(".glide__arrows").style.display =
            "none")
        : (this.elementThumb.querySelector(".glide__arrows").style.display =
            "block");
  }
  _onLargeElementAnchorClick(e) {
    if (this._linkAllowClick) return !0;
    e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation();
  }
  _addListeners() {
    this.elementThumb.querySelectorAll("li").forEach((e, i) => {
      e.addEventListener("click", this._onThumbClick.bind(this));
    }),
      this.glideLarge.on(["swipe.end"], this._onGlideLargeSwipeEnd.bind(this)),
      this.glideLarge.on(
        ["swipe.move"],
        this._onGlideLargeSwipeMove.bind(this)
      ),
      this.glideLarge.on(
        ["move.after"],
        this._onGlideLargeMoveAfter.bind(this)
      ),
      this.glideThumb.on(["resize"], this._onGlideThumbResize.bind(this)),
      this.elementLarge.querySelectorAll("a").forEach((e) => {
        e.addEventListener("click", this._onLargeElementAnchorClick.bind(this));
      });
  }
  _getIndex(e) {
    for (var i = 0; null != (e = e.previousElementSibling); ) ++i;
    return i;
  }
  _initBaguetteBox() {
    this.elementLarge.querySelector(".gallery-glide-custom") &&
      "undefined" != typeof baguetteBox &&
      baguetteBox.run(".gallery-glide-custom");
  }
  _onGlideLargeSwipeEnd(e) {
    this._addActiveThumbClass(this.glideLarge.index), (this._linkSwipeEnd = !0);
  }
  _onGlideLargeSwipeMove() {
    (this._linkSwipeEnd = !1), (this._linkAllowClick = !1);
  }
  _onGlideLargeMoveAfter() {
    this._linkSwipeEnd && (this._linkAllowClick = !0);
  }
  destroy() {
    this._glideLarge.destroy(), this._glideThumb.destroy();
  }
  update() {
    this._glideLarge.update(), this._glideThumb.update();
  }
}
