class Calendar {
  get options() {
    return {};
  }
  constructor(e = {}) {
    (this.settings = Object.assign(this.options, e)),
      (this.colorMap = this._getColorMap()),
      (this.calendar = null),
      (this.eventStartTime = null),
      (this.eventEndTime = null),
      (this.currentEventId = null),
      (this.newEventModal = new bootstrap.Modal(
        document.getElementById("newEventModal")
      )),
      (this.deleteConfirmModal = new bootstrap.Modal(
        document.getElementById("deleteConfirmModal")
      )),
      Helpers.FetchJSON(Helpers.UrlFix("json/events.json"), (e) => {
        (this.events = e),
          this._addColors(),
          this._alterEventsForDemo(),
          this._initTimepicker(),
          this._initCategory(),
          this._init(),
          this._addListeners();
      });
  }
  _init() {
    document.getElementById("calendar") &&
      document.getElementById("calendarTitle") &&
      "undefined" != typeof FullCalendar &&
      ((this.calendar = new FullCalendar.Calendar(
        document.getElementById("calendar"),
        {
          timeZone: "local",
          themeSystem: "bootstrap",
          slotMinTime: "08:00:00",
          slotMaxTime: "20:00:00",
          editable: !0,
          dayMaxEvents: !0,
          eventTimeFormat: {
            hour: "2-digit",
            minute: "2-digit",
            meridiem: !1,
            hour12: !1,
          },
          headerToolbar: { left: "", center: "", right: "" },
          viewDidMount: (e) => {
            this._updateTitle();
          },
          eventClick: this._eventClick.bind(this),
          eventAdd: this._eventAddCallback.bind(this),
          eventChange: this._eventChangeCallback.bind(this),
          eventRemove: this._eventRemoveCallback.bind(this),
          events: this.events,
        }
      )),
      this.calendar.render());
  }
  _addListeners() {
    document.getElementById("goToday") &&
      document.getElementById("goToday").addEventListener("click", () => {
        this.calendar.today(), this._updateTitle();
      }),
      document.getElementById("goPrev") &&
        document.getElementById("goPrev").addEventListener("click", () => {
          this.calendar.prev(), this._updateTitle();
        }),
      document.getElementById("goNext") &&
        document.getElementById("goNext").addEventListener("click", () => {
          this.calendar.next(), this._updateTitle();
        }),
      document.getElementById("monthView") &&
        document.getElementById("monthView").addEventListener("click", () => {
          this.calendar.changeView("dayGridMonth"), this._updateTitle();
        }),
      document.getElementById("weekView") &&
        document.getElementById("weekView").addEventListener("click", () => {
          this.calendar.changeView("timeGridWeek"), this._updateTitle();
        }),
      document.getElementById("dayView") &&
        document.getElementById("dayView").addEventListener("click", () => {
          this.calendar.changeView("timeGridDay"), this._updateTitle();
        }),
      document.documentElement.addEventListener(
        Globals.colorAttributeChange,
        this._updateAllColors.bind(this)
      ),
      document.getElementById("addNewEvent") &&
        document
          .getElementById("addNewEvent")
          .addEventListener("click", this._addNewEvent.bind(this)),
      document.getElementById("addEvent") &&
        document
          .getElementById("addEvent")
          .addEventListener("click", this._addEventConfirm.bind(this)),
      document.getElementById("saveEvent") &&
        document
          .getElementById("saveEvent")
          .addEventListener("click", this._updateEventConfirm.bind(this)),
      document.getElementById("deleteEvent") &&
        document
          .getElementById("deleteEvent")
          .addEventListener("click", this._deleteEventClick.bind(this)),
      document.getElementById("deleteConfirmButton") &&
        document
          .getElementById("deleteConfirmButton")
          .addEventListener("click", this._deleteConfirmClick.bind(this));
  }
  _updateTitle() {
    document.getElementById("calendarTitle").innerHTML =
      this.calendar.view.title;
  }
  _eventClick(e) {
    const t = e.event;
    if ("" != t.url)
      return window.open(t.url, "_blank"), void e.jsEvent.preventDefault();
    this._clearForm(),
      (this.currentEventId = t.id),
      t.allDay ||
        (this.eventEndTime.setTimeFromDateObject(new Date(t.end)),
        this.eventStartTime.setTimeFromDateObject(new Date(t.start))),
      jQuery("#eventStartDate").datepicker("update", t.start),
      jQuery("#eventEndDate").datepicker("update", t.end),
      (document.getElementById("eventTitle").value = t.title),
      (document.getElementById("eventCategory").value =
        t.extendedProps.category),
      (document.getElementById("modalTitle").innerHTML = "Edit Event"),
      jQuery("#eventCategory").trigger("change"),
      this.newEventModal.show(),
      this._enableEdit();
  }
  _updateEventConfirm() {
    const e = this.calendar.getEventById(this.currentEventId),
      t = new Date(jQuery("#eventStartDate").datepicker("getDate")),
      n = new Date(this.eventStartTime.getTimeAsDateObject()),
      d = new Date(jQuery("#eventEndDate").datepicker("getDate")),
      i = new Date(this.eventEndTime.getTimeAsDateObject());
    t.setHours(n.getHours()),
      t.setMinutes(n.getMinutes()),
      e.title !== document.getElementById("eventTitle").value &&
        e.setProp("title", document.getElementById("eventTitle").value),
      e.start.getTime() !== t.getTime() && e.setStart(t),
      e.extendedProps.category !==
        document.getElementById("eventCategory").value &&
        (e.setExtendedProp(
          "category",
          document.getElementById("eventCategory").value
        ),
        this._setColor(e)),
      jQuery("#eventEndDate").datepicker("getDate") &&
        "" !== this.eventEndTime.getTime() &&
        (d.setHours(i.getHours()), d.setMinutes(i.getMinutes())),
      jQuery("#eventEndDate").datepicker("getDate") &&
        e.end.getTime() !== d.getTime() &&
        e.setEnd(d),
      this.newEventModal.hide();
  }
  _addNewEvent() {
    this._clearForm(),
      (this.currentEventId = null),
      this._enableAdd(),
      (document.getElementById("modalTitle").innerHTML = "Add Event"),
      this.newEventModal.show();
  }
  _addEventConfirm() {
    let e = new Date(jQuery("#eventStartDate").datepicker("getDate")),
      t = new Date(jQuery("#eventEndDate").datepicker("getDate")),
      n = new Date(this.eventStartTime.getTimeAsDateObject()),
      d = new Date(this.eventEndTime.getTimeAsDateObject()),
      i = document.getElementById("eventCategory").value;
    "" !== this.eventStartTime.getTime()
      ? (e.setHours(n.getHours()), e.setMinutes(n.getMinutes()))
      : (e = moment(e).format("YYYY-MM-DD")),
      "" !== this.eventEndTime.getTime()
        ? (t.setHours(d.getHours()), t.setMinutes(d.getMinutes()))
        : (t = moment(t).format("YYYY-MM-DD"));
    const a = document.getElementById("eventTitle").value;
    this.calendar.addEvent({
      title: a,
      start: e,
      end: t,
      id: Helpers.NextId(this.calendar.getEvents(), "id"),
      category: i,
      color: this._getColorByCategory(i),
    }),
      this.newEventModal.hide();
  }
  _deleteEventClick() {
    const e = this.calendar.getEventById(this.currentEventId);
    (document.getElementById("deleteConfirmDetail").innerHTML = e.title),
      this.deleteConfirmModal.show();
  }
  _deleteConfirmClick() {
    this.calendar.getEventById(this.currentEventId).remove(),
      this.newEventModal.hide(),
      this.deleteConfirmModal.hide();
  }
  _clearForm() {
    this.eventStartTime.reset(),
      this.eventEndTime.reset(),
      (document.getElementById("eventTitle").value = ""),
      (document.getElementById("eventCategory").value = null),
      jQuery("#eventCategory").trigger("change"),
      jQuery("#eventStartDate").datepicker("update", ""),
      jQuery("#eventEndDate").datepicker("update", "");
  }
  _enableEdit() {
    this._showElement("saveEvent"),
      this._showElement("deleteEvent"),
      this._hideElement("addEvent");
  }
  _enableAdd() {
    this._hideElement("saveEvent"),
      this._hideElement("deleteEvent"),
      this._showElement("addEvent");
  }
  _showElement(e) {
    document.getElementById(e) &&
      document.getElementById(e).classList.add("d-inline-block"),
      document.getElementById(e) &&
        document.getElementById(e).classList.remove("d-none");
  }
  _hideElement(e) {
    document.getElementById(e) &&
      document.getElementById(e).classList.remove("d-inline-block"),
      document.getElementById(e) &&
        document.getElementById(e).classList.add("d-none");
  }
  _getColorByCategory(e) {
    const t = this.colorMap.find((t) => t.category === e);
    if (t) return t.color;
    this.colorMap[0].color;
  }
  _getColorMap() {
    return [
      { color: Globals.primary, category: "Work" },
      { color: Globals.secondary, category: "Education" },
      { color: Globals.tertiary, category: "Personal" },
    ];
  }
  _setColor(e) {
    const t = this._getColorByCategory(e.extendedProps.category);
    e.setProp("color", t);
  }
  _addColors() {
    this.events.map((e) => {
      e.color = this._getColorByCategory(e.category);
    });
  }
  _updateAllColors() {
    this.colorMap = this._getColorMap();
    this.calendar.getEvents().map((e) => {
      this._setColor(e);
    });
  }
  _initTimepicker() {
    (this.eventStartTime = new TimePicker(
      document.getElementById("eventStartTime"),
      { dropdownClassname: "time-top-label-dropdown" }
    )),
      (this.eventEndTime = new TimePicker(
        document.getElementById("eventEndTime"),
        { dropdownClassname: "time-top-label-dropdown" }
      ));
  }
  _initCategory() {
    function e(e) {
      if (jQuery(e.element).val())
        return jQuery(
          '<div><span class="align-middle d-inline-block option-circle me-2 rounded-xl ' +
            jQuery(e.element).data("class") +
            '"></span> <span class="align-middle d-inline-block lh-1">' +
            e.text +
            "</span></div>"
        );
    }
    jQuery().select2 &&
      jQuery("#eventCategory").select2({
        minimumResultsForSearch: 1 / 0,
        dropdownCssClass: "hide-first-option",
        templateSelection: e,
        templateResult: e,
      });
  }
  _alterEventsForDemo() {
    const e = new Date().getMonth() + 1,
      t = new Date().getFullYear(),
      n = e < 10 ? "0" + e : e;
    this.events.map((e) => {
      if (e.start) {
        let d = e.start.split("-");
        (d[0] = t), (d[1] = n), (e.start = d.join("-"));
      }
      if (e.end) {
        let d = e.end.split("-");
        (d[0] = t), (d[1] = n), (e.end = d.join("-"));
      }
    });
  }
  _eventAddCallback(e) {}
  _eventRemoveCallback(e) {}
  _eventChangeCallback(e) {}
}
