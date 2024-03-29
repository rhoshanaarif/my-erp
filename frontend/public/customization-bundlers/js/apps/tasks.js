class Tasks {
  get options() {
    return {};
  }
  constructor(e = {}) {
    (this.settings = Object.assign(this.options, e)),
      (this.taskItemTemplate = document.getElementById("taskItemTemplate")),
      (this.taskTagTemplate = document.getElementById("taskTagTemplate")),
      (this.tasksContainer = document.getElementById("tasksContainer")),
      (this.noTasksFoundTemplate = document.getElementById("noTasksFound")),
      (this.tasksMenuButton = document.getElementById("tasksMenuButton")),
      (this.tasksMenuModal = new bootstrap.Modal(
        document.getElementById("tasksMenuModal")
      )),
      (this.newTaskButton = document.getElementById("newTaskButton")),
      (this.newTaskModal = new bootstrap.Modal(
        document.getElementById("newTaskModal")
      )),
      (this.currentShowSettings = { deleted: !1, status: "All", tags: "All" }),
      (this.activeMenuId = 1),
      (this.currentData = null),
      (this.fuse = null),
      (this.fuseOptions = {
        includeScore: !0,
        keys: ["title"],
        threshold: 0.4,
      }),
      Helpers.FetchJSON(Helpers.UrlFix("json/tasks.json"), (e) => {
        (this.taskData = e.tasks), (this.tagsData = e.tags), this._init();
      });
  }
  _init() {
    this._addListeners(),
      this._initMoveContent(),
      this._initTagsSelect2(),
      this._initStatusSelect2(),
      this._renderItems();
  }
  _renderItems() {
    this.tasksContainer.innerHTML = "";
    const e = this.currentShowSettings;
    (this.currentData = []),
      this.taskData.map((t) => {
        const s = this._getTagStringByTask(t);
        t.deleted === e.deleted &&
          (e.status.includes(t.status) || e.status.includes("All")) &&
          (s.includes(e.tags) || e.tags.includes("All")) &&
          (this._renderItem(t), this.currentData.push(t));
      }),
      this._renderDropdownButtons(e),
      this._renderNoResult(this.currentData),
      new AcornIcons().replace();
  }
  _renderSearchResults(e) {
    this.tasksContainer.innerHTML = "";
    const t = this.currentShowSettings;
    e.map((e) => {
      const s = this._getTagStringByTask(e);
      e.deleted === t.deleted &&
        (t.status.includes(e.status) || t.status.includes("All")) &&
        (s.includes(t.tags) || t.tags.includes("All")) &&
        this._renderItem(e);
    }),
      this._renderDropdownButtons(t),
      this._renderNoResult(e);
  }
  _renderNoResult(e) {
    if (0 === e.length) {
      var t = this.noTasksFoundTemplate.content
        .cloneNode(!0)
        .querySelector("div");
      this.tasksContainer.append(t);
    }
  }
  _renderDropdownButtons(e) {
    e.deleted
      ? this._showDeletedDropdownItems()
      : this._showRegularDropdownItems();
  }
  _renderItem(e) {
    var t = this.taskItemTemplate.content.cloneNode(!0).querySelector("div");
    t.setAttribute("data-id", e.id),
      (t.querySelector(".title").innerHTML = e.title),
      (t.querySelector(".detail").innerHTML = e.detail),
      "Active" !== e.status && (t.querySelector(".check-input").checked = !0),
      e.tags.map((e) => {
        var s = this.taskTagTemplate.content
          .cloneNode(!0)
          .querySelector("span");
        (s.innerHTML = e.title),
          s.classList.add(e.class),
          t.querySelector(".tags").append(s);
      }),
      this.tasksContainer.append(t),
      t
        .querySelector(".check-input")
        .addEventListener("change", this._onCheckChange.bind(this));
  }
  _initMoveContent() {
    if (document.querySelector("#tasksMenuMoveContent")) {
      const e = document.querySelector("#tasksMenuMoveContent"),
        t = e.getAttribute("data-move-target"),
        s = e.getAttribute("data-move-breakpoint");
      new MoveContent(e, {
        targetSelector: t,
        moveBreakpoint: s,
        afterMove: (e) => {
          this._hideTasksMenuModal(),
            this._addMenuListeners(),
            this._setActiveMenuItemAfterMove();
        },
      });
    }
  }
  _hideTasksMenuModal() {
    this.tasksMenuModal.hide();
  }
  _showTasksMenuModal() {
    this.tasksMenuModal.show();
  }
  _addListeners() {
    this._addMenuListeners(),
      document.getElementById("newTaskAddButton") &&
        document
          .getElementById("newTaskAddButton")
          .addEventListener("click", this._addNewTaskClick.bind(this)),
      this.newTaskButton &&
        this.newTaskButton.addEventListener(
          "click",
          this._showNewTaskModal.bind(this)
        ),
      this.tasksMenuButton &&
        this.tasksMenuButton.addEventListener(
          "click",
          this._showTasksMenuModal.bind(this)
        ),
      document.getElementById("saveTaskButton") &&
        document
          .getElementById("saveTaskButton")
          .addEventListener("click", this._saveTaskClick.bind(this)),
      document.getElementById("taskSearch") &&
        document
          .getElementById("taskSearch")
          .addEventListener(
            "keydown",
            Helpers.Debounce(this._onSearchKeyDown.bind(this), 500).bind(this)
          ),
      this.tasksContainer &&
        this.tasksContainer.addEventListener(
          "click",
          this._onTaskDropdownButtonClick.bind(this)
        );
  }
  _addMenuListeners() {
    document.querySelector(".menu-items") &&
      document
        .querySelector(".menu-items")
        .addEventListener("click", this._onMenuClick.bind(this));
  }
  _onSearchKeyDown(e) {
    const t = document.getElementById("taskSearch").value;
    if ("" !== t) {
      this.fuse = new Fuse(this.currentData, this.fuseOptions);
      var s = this.fuse.search(t);
      (s = s.map((e) => e.item)), this._renderSearchResults(s);
    } else this._renderItems();
  }
  _onMenuClick(e) {
    e.target;
    const t = e.target.closest(".task-menu-item");
    if (!t) return;
    e.preventDefault();
    const s = JSON.parse(t.getAttribute("data-show"));
    (this.currentShowSettings = s),
      this._renderItems(),
      this._setActiveMenuItem(t),
      this._hideTasksMenuModal();
  }
  _setActiveMenuItem(e) {
    document.querySelectorAll(".task-menu-item").forEach((e) => {
      e.classList.remove("active");
    }),
      e.classList.add("active"),
      (this.activeMenuId = parseInt(e.getAttribute("data-menuid")));
  }
  _setActiveMenuItemAfterMove() {
    document.querySelectorAll(".task-menu-item").forEach((e) => {
      e.classList.remove("active"),
        parseInt(e.getAttribute("data-menuid")) === this.activeMenuId &&
          e.classList.add("active");
    });
  }
  _getTagStringByTask(e) {
    var t = "";
    return (
      e.tags.map((e) => {
        t += e.title;
      }),
      t
    );
  }
  _getTagsWithClasses(e) {
    var t = [];
    return (
      e.map((e) => {
        t.push(this._findTagObjectByTitle(e));
      }),
      t
    );
  }
  _findTagObjectByTitle(e) {
    return this.tagsData.find((t) => {
      if (t.title === e) return t;
    });
  }
  _getTagsWithoutClasses(e) {
    var t = [];
    return (
      e.map((e) => {
        t.push(e.title);
      }),
      t
    );
  }
  _onCheckChange(e) {
    const t = e.target,
      s = e.target.closest(".task-item");
    if (!s) return;
    const a = parseInt(s.getAttribute("data-id"));
    var n = this._getDataById(a);
    t.checked ? (n.status = "Done") : (n.status = "Active"),
      setTimeout(() => {
        this._renderItems();
      }, 500);
  }
  _initTagsSelect2() {
    jQuery("#newTaskTags") &&
      jQuery().select2 &&
      jQuery("#newTaskTags").select2({
        minimumResultsForSearch: 1 / 0,
        templateSelection: function (e) {
          if (jQuery(e.element).val())
            return jQuery(
              '<span><span class="align-middle d-inline-block ms-1 ' +
                jQuery(e.element).data("selectionColor") +
                '">' +
                e.text +
                "</span></span>"
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
  _initStatusSelect2() {
    jQuery("#newTaskStatus") &&
      jQuery().select2 &&
      jQuery("#newTaskStatus").select2({ minimumResultsForSearch: 1 / 0 });
  }
  _addNewTaskClick(e) {
    const t = {
      id: Helpers.NextId(this.taskData, "id"),
      title: document.getElementById("newTaskTitle").value,
      detail: document.getElementById("newTaskDetail").value,
      status: document.getElementById("newTaskStatus").value,
      deleted: !1,
      tags: this._getTagsWithClasses(jQuery("#newTaskTags").val()),
    };
    this.taskData.unshift(t),
      this._renderItems(),
      this._clearAddNewForm(),
      this.newTaskModal.hide();
  }
  _showNewTaskModal(e) {
    this.newTaskModal.show(),
      this._clearAddNewForm(),
      document.getElementById("newTaskAddButton").classList.remove("d-none"),
      document.getElementById("saveTaskButton").classList.add("d-none"),
      (document.getElementById("taskModalTitle").innerHTML = "New Task");
  }
  _clearAddNewForm() {
    (document.getElementById("newTaskTitle").value = ""),
      (document.getElementById("newTaskDetail").value = ""),
      (document.getElementById("newTaskStatus").value = null),
      (document.getElementById("newTaskTags").value = null),
      jQuery("#newTaskStatus").trigger("change"),
      jQuery("#newTaskTags").trigger("change");
  }
  _deleteTaskById(e) {
    (this._getDataById(e).deleted = !0), this._renderItems();
  }
  _undoDeleteTaskById(e) {
    (this._getDataById(e).deleted = !1), this._renderItems();
  }
  _removeTaskById(e) {
    const t = this.taskData.findIndex((t) => t.id === e);
    this.taskData.splice(t, 1), this._renderItems();
  }
  _editTaskById(e) {
    const t = this._getDataById(e);
    (document.getElementById("newTaskTitle").value = t.title),
      (document.getElementById("newTaskDetail").value = t.detail),
      (document.getElementById("newTaskStatus").value = t.status),
      document.getElementById("newTaskModal").setAttribute("data-id", t.id),
      jQuery("#newTaskStatus").trigger("change"),
      jQuery("#newTaskTags")
        .val(this._getTagsWithoutClasses(t.tags))
        .trigger("change"),
      this.newTaskModal.show(),
      document.getElementById("newTaskAddButton").classList.add("d-none"),
      document.getElementById("saveTaskButton").classList.remove("d-none"),
      (document.getElementById("taskModalTitle").innerHTML = "Edit Task");
  }
  _saveTaskClick(e) {
    const t = {
      id: parseInt(
        document.getElementById("newTaskModal").getAttribute("data-id")
      ),
      title: document.getElementById("newTaskTitle").value,
      detail: document.getElementById("newTaskDetail").value,
      status: document.getElementById("newTaskStatus").value,
      deleted: !1,
      tags: this._getTagsWithClasses(jQuery("#newTaskTags").val()),
    };
    this._updateData(t.id, t),
      this._renderItems(),
      this._clearAddNewForm(),
      this.newTaskModal.hide();
  }
  _updateData(e, t) {
    this.taskData = this.taskData.map((s) =>
      parseInt(s.id) === parseInt(e) ? t : s
    );
  }
  _onTaskDropdownButtonClick(e) {
    const t = e.target.closest(".dropdown-item"),
      s = e.target.closest(".task-item");
    t &&
      s &&
      (t.classList.contains("edit-task") &&
        this._editTaskById(parseInt(s.getAttribute("data-id"))),
      t.classList.contains("delete-task") &&
        this._deleteTaskById(parseInt(s.getAttribute("data-id"))),
      t.classList.contains("undo-delete-task") &&
        this._undoDeleteTaskById(parseInt(s.getAttribute("data-id"))),
      t.classList.contains("delete-permanently-task") &&
        this._removeTaskById(parseInt(s.getAttribute("data-id"))));
  }
  _showRegularDropdownItems() {
    document.querySelectorAll(".dropdown-item.edit-task").forEach((e) => {
      e.classList.remove("d-none");
    }),
      document.querySelectorAll(".dropdown-item.delete-task").forEach((e) => {
        e.classList.remove("d-none");
      });
  }
  _showDeletedDropdownItems() {
    document
      .querySelectorAll(".dropdown-item.undo-delete-task")
      .forEach((e) => {
        e.classList.remove("d-none");
      }),
      document
        .querySelectorAll(".dropdown-item.delete-permanently-task")
        .forEach((e) => {
          e.classList.remove("d-none");
        });
  }
  _getDataById(e) {
    return this.taskData.find((t) => {
      if (t.id === e) return t;
    });
  }
}
