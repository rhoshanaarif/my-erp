var Globals = Globals || {};
(Globals.menuPlacementChange = "MENU_PLACEMENT_CHANGE"),
  (Globals.menuBehaviourChange = "MENU_BEHAVIOUR_CHANGE"),
  (Globals.layoutChange = "LAYOUT_CHANGE"),
  (Globals.colorAttributeChange = "COLOR_ATTRIBUTE_CHANGE"),
  (Globals.borderRadiusChange = "BORDER_RADIUS_CHANGE"),
  (Globals.lightDarkModeClick = "LIGHT_DARK_MODE_CLICK"),
  (Globals.pinButtonClick = "PIN_BUTTON_CLICK"),
  (Globals.switchedToMobile = "SWITCHED_TO_MOBILE"),
  (Globals.switchedToDesktop = "SWITCHED_TO_DESKTOP");
class Variables {
  constructor() {
    this._addListeners(), this._initVariables();
  }
  _addListeners() {
    document.documentElement.addEventListener(
      Globals.colorAttributeChange,
      (r) => {
        this._initVariables();
      }
    ),
      document.documentElement.addEventListener(
        Globals.borderRadiusChange,
        (r) => {
          this._initVariables();
        }
      );
  }
  _initVariables() {
    var r = getComputedStyle(document.body);
    (Globals.primary = r.getPropertyValue("--primary").trim()),
      (Globals.secondary = r.getPropertyValue("--secondary").trim()),
      (Globals.tertiary = r.getPropertyValue("--tertiary").trim()),
      (Globals.quaternary = r.getPropertyValue("--quaternary").trim()),
      (Globals.body = r.getPropertyValue("--body").trim()),
      (Globals.alternate = r.getPropertyValue("--alternate").trim()),
      (Globals.lightText = r.getPropertyValue("--light-text").trim()),
      (Globals.warning = r.getPropertyValue("--warning").trim()),
      (Globals.danger = r.getPropertyValue("--danger").trim()),
      (Globals.success = r.getPropertyValue("--success").trim()),
      (Globals.info = r.getPropertyValue("--info").trim()),
      (Globals.font = r.getPropertyValue("--font").trim()),
      (Globals.fontHeading = r.getPropertyValue("--font-heading").trim()),
      (Globals.background = r.getPropertyValue("--background").trim()),
      (Globals.foreground = r.getPropertyValue("--foreground").trim()),
      (Globals.separator = r.getPropertyValue("--separator").trim()),
      (Globals.separatorLight = r.getPropertyValue("--separator-light").trim()),
      (Globals.transitionTimeShort = r
        .getPropertyValue("--transition-time-short")
        .trim()
        .replace("ms", "")),
      (Globals.transitionTime = r
        .getPropertyValue("--transition-time")
        .trim()
        .replace("ms", "")),
      (Globals.navSizeSlim = r.getPropertyValue("--nav-size-slim").trim()),
      (Globals.primaryrgb = r.getPropertyValue("--primary-rgb").trim()),
      (Globals.secondaryrgb = r.getPropertyValue("--secondary-rgb").trim()),
      (Globals.tertiaryrgb = r.getPropertyValue("--tertiary-rgb").trim()),
      (Globals.quaternaryrgb = r.getPropertyValue("--quaternary-rgb").trim()),
      (Globals.borderRadiusXl = r
        .getPropertyValue("--border-radius-xl")
        .trim()),
      (Globals.borderRadiusLg = r
        .getPropertyValue("--border-radius-lg")
        .trim()),
      (Globals.borderRadiusMd = r
        .getPropertyValue("--border-radius-md")
        .trim()),
      (Globals.borderRadiusSm = r
        .getPropertyValue("--border-radius-sm")
        .trim()),
      (Globals.sm = r.getPropertyValue("--sm").trim()),
      (Globals.md = r.getPropertyValue("--md").trim()),
      (Globals.lg = r.getPropertyValue("--lg").trim()),
      (Globals.xl = r.getPropertyValue("--xl").trim()),
      (Globals.xxl = r.getPropertyValue("--xxl").trim()),
      (Globals.direction = "ltr");
  }
}
