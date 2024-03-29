class Chat {
  get options() {
    return {};
  }
  constructor(t = {}) {
    (this.settings = Object.assign(this.options, t)),
      (this.messagesListContainer = document.getElementById(
        "messagesListContainer"
      )),
      (this.contactsListContainer = document.getElementById(
        "contactsListContainer"
      )),
      (this.userProfileTabs = document.getElementById("userProfileTabs")),
      (this.chatContentContainer = document.getElementById(
        "chatContentContainer"
      )),
      (this.listItemTemplate = document.getElementById("listItemTemplate")),
      (this.chatContentScroll = null),
      (this.mobileBreakpoint = Globals.md.replace("px", "")),
      (this.respondContainerTemplate = document.getElementById(
        "respondContainerTemplate"
      )),
      (this.respondAttachmentContentTemplate = document.getElementById(
        "respondAttachmentContentTemplate"
      )),
      (this.respondTextContentTemplate = document.getElementById(
        "respondTextContentTemplate"
      )),
      (this.messageContainerTemplate = document.getElementById(
        "messageContainerTemplate"
      )),
      (this.messageAttachmentContentTemplate = document.getElementById(
        "messageAttachmentContentTemplate"
      )),
      (this.messageTextContentTemplate = document.getElementById(
        "messageTextContentTemplate"
      )),
      (this.currentMode = "chat"),
      (this.currentView = null),
      (this.chatView = document.getElementById("chatView")),
      (this.listView = document.getElementById("listView")),
      (this.chatInput = document.querySelector("#chatInput")),
      (this.currentChatData = null),
      Helpers.FetchJSON(Helpers.UrlFix("json/chat.json"), (t) => {
        (this.chatData = t.map((t) => {
          const e = { ...t, thumb: Helpers.UrlFix(t.thumb) };
          return (
            e.messages &&
              (e.messages = e.messages.map((t) =>
                t.attachments
                  ? {
                      ...t,
                      attachments: t.attachments.map((t) => Helpers.UrlFix(t)),
                    }
                  : t
              )),
            e
          );
        })),
          this._init();
      });
  }
  _init() {
    this._initView(),
      this._initMode(),
      this._initScrollbars(),
      this._renderContacts(),
      this._initTextArea(),
      this._addListeners(),
      "desktop" === this.currentView &&
        this._renderChatMessagesById(this.chatData[0].id),
      this._updateChatScrollDelayed();
  }
  _initView() {
    const t = window.innerWidth;
    let e = null;
    (e = this.mobileBreakpoint > t ? "mobile" : "desktop"),
      e !== this.currentView &&
        ("mobile" === this.currentView &&
          null === this.currentChatData &&
          this._renderChatMessagesById(this.chatData[0].id),
        (this.currentView = e),
        this._updateView());
  }
  _updateView() {
    "mobile" === this.currentView
      ? (this.currentChatData
          ? (this._showChatView(), this._enableBackButton())
          : (this._showListView(), this._disableBackButton()),
        this._showChatBackButton())
      : (this._showBothViews(), this._hideChatBackButton());
  }
  _showChatView() {
    this.chatView.classList.remove("d-none"),
      this.chatView.classList.add("d-flex"),
      this.listView.classList.remove("d-flex"),
      this.listView.classList.add("d-none");
  }
  _showListView() {
    this.chatView.classList.add("d-none"),
      this.chatView.classList.remove("d-flex"),
      this.listView.classList.add("d-flex"),
      this.listView.classList.remove("d-none");
  }
  _showBothViews() {
    this.chatView.classList.remove("d-none"),
      this.chatView.classList.add("d-flex"),
      this.listView.classList.add("d-flex"),
      this.listView.classList.remove("d-none");
  }
  _enableBackButton() {
    document.getElementById("backButton").classList.remove("disabled");
  }
  _disableBackButton() {
    document.getElementById("backButton").classList.add("disabled");
  }
  _initMode() {
    "chat" === this.currentMode
      ? (document.getElementById("chatMode").classList.remove("d-none"),
        document.getElementById("chatMode").classList.add("d-flex"),
        document.getElementById("callMode").classList.remove("d-flex"),
        document.getElementById("callMode").classList.add("d-none"),
        this._endTimer())
      : (document.getElementById("callMode").classList.remove("d-none"),
        document.getElementById("callMode").classList.add("d-flex"),
        document.getElementById("chatMode").classList.remove("d-flex"),
        document.getElementById("chatMode").classList.add("d-none"),
        this._renderCall());
  }
  _addListeners() {
    this.chatInput.addEventListener(
      "keydown",
      this._onChatInputKeyDown.bind(this)
    ),
      document.getElementById("chatSendButton") &&
        document
          .getElementById("chatSendButton")
          .addEventListener("click", this._inputSend.bind(this)),
      document.getElementById("chatAttachButton") &&
        document
          .getElementById("chatAttachButton")
          .addEventListener("click", this._attachmentSend.bind(this)),
      document.getElementById("chatAttachmentInput") &&
        document
          .getElementById("chatAttachmentInput")
          .addEventListener("change", this._onAttachmentChange.bind(this)),
      document.getElementById("backButton") &&
        document
          .getElementById("backButton")
          .addEventListener("click", this._onBackClick.bind(this)),
      document.getElementById("endCallButton") &&
        document
          .getElementById("endCallButton")
          .addEventListener("click", this._onEndCallClick.bind(this)),
      document.getElementById("callButton") &&
        document
          .getElementById("callButton")
          .addEventListener("click", this._onCallClick.bind(this)),
      document.getElementById("videoCallButton") &&
        document
          .getElementById("videoCallButton")
          .addEventListener("click", this._onCallClick.bind(this)),
      this.userProfileTabs &&
        this.userProfileTabs.addEventListener(
          "click",
          this._onContactListClick.bind(this)
        ),
      window.addEventListener(
        "resize",
        Helpers.Debounce(this._onResizeDebounced.bind(this), 200).bind(this)
      ),
      window.addEventListener("resize", this._onResize.bind(this));
  }
  _showChatBackButton() {
    document.getElementById("backButton").classList.remove("d-none");
  }
  _hideChatBackButton() {
    document.getElementById("backButton").classList.add("d-none");
  }
  _onResizeDebounced(t) {
    this._updateChatScroll();
  }
  _onResize(t) {
    this._initView();
  }
  _onEndCallClick(t) {
    (this.currentMode = "chat"), this._initMode();
  }
  _onCallClick(t) {
    (this.currentMode = "call"), this._initMode();
  }
  _renderCall() {
    const t = document.getElementById("callMode");
    (t.querySelector(".name").innerHTML = this.currentChatData.name),
      t
        .querySelector(".profile")
        .setAttribute("src", this.currentChatData.thumb),
      this._startTimer(t.querySelector(".time"));
  }
  _startTimer(t) {
    t.innerHTML = "00:00:00";
    var e = moment().startOf("day");
    this.timerInterval = setInterval(function () {
      e.add(1, "second"), (t.innerHTML = e.format("HH:mm:ss"));
    }, 1e3);
  }
  _endTimer() {
    this.timerInterval && clearInterval(this.timerInterval);
  }
  _onBackClick(t) {
    (this.currentChatData = null),
      this._renderContacts(),
      this._showListView(),
      this._disableBackButton(),
      "chat" !== this.currentMode &&
        ((this.currentMode = "chat"), this._initMode());
  }
  _renderContacts() {
    (this.messagesListContainer.querySelector(".os-content").innerHTML = ""),
      (this.contactsListContainer.querySelector(".os-content").innerHTML = ""),
      this.chatData.map((t) => {
        t.messages.length > 0 &&
          this._renderContact(
            t,
            this.messagesListContainer.querySelector(".os-content")
          ),
          this._renderContact(
            t,
            this.contactsListContainer.querySelector(".os-content")
          );
      });
  }
  _renderContact(t, e) {
    var n = this.listItemTemplate.content.cloneNode(!0).querySelector("a");
    n.setAttribute("data-id", t.id),
      (n.querySelector("#contactName").innerHTML = t.name),
      (n.querySelector("#contactLastSeen").innerHTML = t.last),
      n.querySelector("#contactImage").setAttribute("src", t.thumb),
      "Online" !== t.status &&
        n.querySelector("#contactStatus").classList.add("d-none"),
      t.unread > 0 &&
        ((n.querySelector("#contactUnread").innerHTML = t.unread),
        n.querySelector("#contactUnread").classList.remove("d-none")),
      e.append(n);
  }
  _renderContactTitle() {
    const t = document.getElementById("contactTitle");
    (t.querySelector(".name").innerHTML = this.currentChatData.name),
      (t.querySelector(".last").innerHTML = this.currentChatData.last),
      t
        .querySelector(".profile")
        .setAttribute("src", this.currentChatData.thumb),
      "Online" !== this.currentChatData.status &&
        t.querySelector(".status").classList.add("d-none");
  }
  _setActiveContact() {
    this.userProfileTabs.querySelectorAll(".contact-list-item").forEach((t) => {
      t.classList.remove("active"),
        parseInt(t.getAttribute("data-id")) ===
          parseInt(this.currentChatData.id) && t.classList.add("active");
    });
  }
  _setAsRead() {
    this.currentChatData.unread > 0 &&
      ((this.currentChatData.unread = 0),
      this._renderContacts(),
      this._setActiveContact());
  }
  _renderChatMessagesById(t) {
    (this.currentChatData = this._getDataById(t)),
      (this.chatContentContainer.querySelector(".os-content").innerHTML = ""),
      this.currentChatData.messages.map((t) => {
        this._renderChatMessage(
          t,
          this.chatContentContainer.querySelector(".os-content")
        );
      }),
      this._renderContactTitle(),
      baguetteBox.run(".lightbox"),
      this._updateChatScroll(),
      this._setActiveContact(),
      this._setAsRead();
  }
  _renderChatMessage(t, e) {
    var n = null,
      a = null;
    "response" === t.type
      ? ((a = this.respondContainerTemplate.content
          .cloneNode(!0)
          .querySelector("div"))
          .querySelector(".chat-profile")
          .setAttribute("src", this.currentChatData.thumb),
        "" !== t.text
          ? (((n = this.respondTextContentTemplate.content
              .cloneNode(!0)
              .querySelector("div")).querySelector(".text").innerHTML = t.text),
            (n.querySelector(".time").innerHTML = t.time),
            a.querySelector(".content-container").append(n),
            e.append(a))
          : t.attachments.map((t) => {
              (n = this.respondAttachmentContentTemplate.content
                .cloneNode(!0)
                .querySelector("div"))
                .querySelector(".attachment img")
                .setAttribute("src", t),
                n.querySelector(".attachment").setAttribute("href", t),
                a.querySelector(".content-container").append(n),
                e.append(a);
            }))
      : ((a = this.messageContainerTemplate.content
          .cloneNode(!0)
          .querySelector("div")),
        "" !== t.text
          ? (((n = this.messageTextContentTemplate.content
              .cloneNode(!0)
              .querySelector("div")).querySelector(".text").innerHTML = t.text),
            (n.querySelector(".time").innerHTML = t.time),
            a.querySelector(".content-container").append(n),
            e.append(a))
          : t.attachments.map((t) => {
              (n = this.messageAttachmentContentTemplate.content
                .cloneNode(!0)
                .querySelector("div"))
                .querySelector(".attachment img")
                .setAttribute("src", t),
                n.querySelector(".attachment").setAttribute("href", t),
                a.querySelector(".content-container").append(n),
                e.append(a);
            }));
  }
  _getDataById(t) {
    return this.chatData.find((e) => {
      if (e.id === t) return e;
    });
  }
  _initTextArea() {
    autosize(this.chatInput),
      this.chatInput.addEventListener(
        "autosize:resized",
        this._chatInputResize.bind(this)
      );
  }
  _chatInputResize() {
    this._updateChatScroll();
  }
  _inputSend(t) {
    const e = {
      type: "message",
      text: this.chatInput.value,
      time: new moment().format("hh:mm"),
      attachments: [],
    };
    (this.chatInput.value = ""),
      this.chatInput.focus(),
      this._renderChatMessage(
        e,
        this.chatContentContainer.querySelector(".os-content")
      ),
      this._updateChatScroll(),
      this._updateChatData(e);
  }
  _updateChatData(t) {
    const e = this.currentChatData.messages.length;
    this.currentChatData.messages.push(t),
      0 === e && (this._renderContacts(), this._setActiveContact());
  }
  _attachmentSend(t) {
    document
      .getElementById("chatAttachmentInput")
      .dispatchEvent(new MouseEvent("click"));
  }
  _onAttachmentChange(t) {
    const e = document.getElementById("chatAttachmentInput");
    if (e.files && e.files[0]) {
      var n = new FileReader();
      (n.onload = (t) => {
        const e = {
          type: "message",
          text: "",
          time: new moment().format("hh:mm"),
          attachments: [t.target.result + "#.webp"],
        };
        this._renderChatMessage(
          e,
          this.chatContentContainer.querySelector(".os-content")
        ),
          baguetteBox.destroy(),
          baguetteBox.run(".lightbox"),
          this._updateChatScroll(),
          this._updateChatData(e);
      }),
        n.readAsDataURL(e.files[0]);
    }
  }
  _onChatInputKeyDown(t) {
    if (13 == t.keyCode)
      if ((t.preventDefault(), t.shiftKey)) {
        var e = this.chatInput.value;
        (e += "\n"),
          (this.chatInput.value = e),
          autosize.update(this.chatInput),
          this._updateChatScroll();
      } else this._inputSend();
  }
  _onContactListClick(t) {
    if ("chat" !== this.currentMode) return;
    const e = t.target.closest(".contact-list-item");
    if (e) {
      const t = e.getAttribute("data-id");
      (this.currentChatData = this._getDataById(parseInt(t))),
        this._updateView(),
        this._renderChatMessagesById(parseInt(t));
    }
  }
  _initScrollbars() {
    "undefined" != typeof OverlayScrollbars &&
      (OverlayScrollbars(this.messagesListContainer, {
        scrollbars: { autoHide: "leave", autoHideDelay: 600 },
        overflowBehavior: { x: "hidden", y: "scroll" },
      }),
      OverlayScrollbars(this.contactsListContainer, {
        scrollbars: { autoHide: "leave", autoHideDelay: 600 },
        overflowBehavior: { x: "hidden", y: "scroll" },
      }),
      (this.chatContentScroll = OverlayScrollbars(this.chatContentContainer, {
        scrollbars: { autoHide: "leave", autoHideDelay: 600 },
        overflowBehavior: { x: "hidden", y: "scroll" },
      })));
  }
  _updateChatScroll() {
    this.chatContentScroll.scroll(
      {
        el: this.chatContentContainer.querySelector(
          ".card-content:last-of-type"
        ),
        scroll: { x: "never" },
        block: "end",
      },
      0
    );
  }
  _updateChatScrollDelayed() {
    setTimeout(() => {
      this._updateChatScroll(),
        this.chatContentContainer.classList.remove("opacity-0");
    }, 100);
  }
}
