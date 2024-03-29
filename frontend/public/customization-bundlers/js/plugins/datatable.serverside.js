class RowsServerSide {
  constructor() {
    jQuery().DataTable
      ? (this._rowToEdit,
        this._datatable,
        this._currentState,
        this._datatableExtend,
        this._addEditModal,
        (this._staticHeight = 62),
        (this._apiPath = "https://node-api.coloredstrategies.com"),
        this._createInstance(),
        this._addListeners(),
        this._extend(),
        this._initBootstrapModal())
      : console.log("DataTable is null!");
  }
  _createInstance() {
    const t = this;
    this._datatable = jQuery("#datatableRowsServerSide").DataTable({
      scrollX: !0,
      buttons: ["copy", "excel", "csv", "print"],
      info: !1,
      processing: !0,
      serverSide: !0,
      ajax: this._apiPath + "/products",
      sDom: '<"row"<"col-sm-12"<"table-container"t>r>><"row"<"col-12"p>>',
      pageLength: 10,
      columns: [
        { data: "Name" },
        { data: "Sales" },
        { data: "Stock" },
        { data: "Category" },
        { data: "Tag" },
        { data: "Check" },
      ],
      language: {
        paginate: {
          previous: '<i class="cs-chevron-left"></i>',
          next: '<i class="cs-chevron-right"></i>',
        },
      },
      initComplete: function (e, a) {
        t._setInlineHeight();
      },
      drawCallback: function (e) {
        t._setInlineHeight();
      },
      columnDefs: [
        {
          targets: 0,
          render: function (t, e, a, d) {
            return '<a class="list-item-heading body" href="#">' + t + "</a>";
          },
        },
        {
          targets: 4,
          render: function (t, e, a, d) {
            return '<span class="badge bg-outline-primary">' + t + "</span>";
          },
        },
        {
          targets: 5,
          render: function (t, e, a, d) {
            return '<div class="form-check float-end mt-1"><input type="checkbox" class="form-check-input"></div>';
          },
        },
      ],
    });
  }
  _addListeners() {
    document
      .getElementById("addEditConfirmButton")
      .addEventListener("click", this._addEditFromModalClick.bind(this)),
      document
        .querySelectorAll(".add-datatable")
        .forEach((t) =>
          t.addEventListener("click", this._onAddRowClick.bind(this))
        ),
      document
        .querySelectorAll(".delete-datatable")
        .forEach((t) =>
          t.addEventListener("click", this._onDeleteClick.bind(this))
        ),
      document
        .querySelectorAll(".edit-datatable")
        .forEach((t) =>
          t.addEventListener("click", this._onEditButtonClick.bind(this))
        ),
      document
        .querySelectorAll(".tag-done")
        .forEach((t) =>
          t.addEventListener("click", () => this._updateTag("Done"))
        ),
      document
        .querySelectorAll(".tag-new")
        .forEach((t) =>
          t.addEventListener("click", () => this._updateTag("New"))
        ),
      document
        .querySelectorAll(".tag-sale")
        .forEach((t) =>
          t.addEventListener("click", () => this._updateTag("Sale"))
        ),
      document
        .getElementById("addEditModal")
        .addEventListener("hidden.bs.modal", this._clearModalForm);
  }
  _extend() {
    this._datatableExtend = new DatatableExtend({
      datatable: this._datatable,
      editRowCallback: this._onEditRowClick.bind(this),
      singleSelectCallback: this._onSingleSelect.bind(this),
      multipleSelectCallback: this._onMultipleSelect.bind(this),
      anySelectCallback: this._onAnySelect.bind(this),
      noneSelectCallback: this._onNoneSelect.bind(this),
    });
  }
  _initBootstrapModal() {
    this._addEditModal = new bootstrap.Modal(
      document.getElementById("addEditModal")
    );
  }
  _setInlineHeight() {
    if (!this._datatable) return;
    const t = this._datatable.page.len();
    document.querySelector(".dataTables_scrollBody").style.height =
      this._staticHeight * t + "px";
  }
  _addSpinner() {
    document.body.classList.add("spinner");
  }
  _removeSpinner() {
    document.body.classList.remove("spinner");
  }
  _addEditFromModalClick(t) {
    "add" === this._currentState
      ? this._addNewRowFromModal()
      : this._editRowFromModal(),
      this._addEditModal.hide();
  }
  _onEditButtonClick(t) {
    if (t.currentTarget.classList.contains("disabled")) return;
    const e = this._datatableExtend.getSelectedRows();
    this._onEditRowClick(this._datatable.row(e[0][0]));
  }
  _onEditRowClick(t) {
    (this._rowToEdit = t),
      this._showModal("edit", "Edit", "Done"),
      this._setForm();
  }
  _editRowFromModal() {
    const t = this._rowToEdit.data();
    Object.assign(t, this._getFormData());
    this._addSpinner(),
      fetch(this._apiPath + "/products/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t),
      })
        .then((t) => {
          t.json(), this._removeSpinner();
        })
        .then((t) => {
          this._datatable.draw();
        })
        .catch((t) => {
          console.error("Error:", t);
        }),
      this._datatableExtend.unCheckAllRows(),
      this._datatableExtend.controlCheckAll();
  }
  _addNewRowFromModal() {
    const t = this._getFormData();
    this._addSpinner(),
      fetch(this._apiPath + "/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t),
      })
        .then((t) => {
          t.json(), this._removeSpinner();
        })
        .then((t) => {
          this._datatable.draw();
        })
        .catch((t) => {
          console.error("Error:", t);
        }),
      this._datatableExtend.unCheckAllRows(),
      this._datatableExtend.controlCheckAll();
  }
  _onDeleteClick() {
    const t = this._datatableExtend.getSelectedRows().data();
    this._addSpinner();
    const e = { ids: [] };
    for (let a = 0; a < t.length; a++) e.ids.push(t[a].id);
    fetch(this._apiPath + "/products/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    })
      .then((t) => {
        t.json(), this._removeSpinner();
      })
      .then((t) => {
        console.log("Success:", t), this._datatable.draw();
      })
      .catch((t) => {
        console.error("Error:", t);
      }),
      this._datatableExtend.unCheckAllRows(),
      this._datatableExtend.controlCheckAll();
  }
  _onAddRowClick() {
    this._showModal("add", "Add New", "Add");
  }
  _showModal(t, e, a) {
    this._addEditModal.show(),
      (this._currentState = t),
      (document.getElementById("modalTitle").innerHTML = e),
      (document.getElementById("addEditConfirmButton").innerHTML = a);
  }
  _setForm() {
    const t = this._rowToEdit.data();
    (document.querySelector("#addEditModal input[name=Name]").value = t.Name),
      (document.querySelector("#addEditModal input[name=Sales]").value =
        t.Sales),
      (document.querySelector("#addEditModal input[name=Stock]").value =
        t.Stock),
      document.querySelector(
        '#addEditModal input[name=Category][value="' + t.Category + '"]'
      ) &&
        (document.querySelector(
          '#addEditModal input[name=Category][value="' + t.Category + '"]'
        ).checked = !0),
      document.querySelector(
        '#addEditModal input[name=Tag][value="' + t.Tag + '"]'
      ) &&
        (document.querySelector(
          '#addEditModal input[name=Tag][value="' + t.Tag + '"]'
        ).checked = !0);
  }
  _getFormData() {
    const t = {};
    return (
      (t.Name = document.querySelector("#addEditModal input[name=Name]").value),
      (t.Sales = document.querySelector(
        "#addEditModal input[name=Sales]"
      ).value),
      (t.Stock = document.querySelector(
        "#addEditModal input[name=Stock]"
      ).value),
      (t.Category =
        (document.querySelector("#addEditModal input[name=Category]:checked") &&
          document.querySelector("#addEditModal input[name=Category]:checked")
            .value) ||
        ""),
      (t.Tag =
        (document.querySelector("#addEditModal input[name=Tag]:checked") &&
          document.querySelector("#addEditModal input[name=Tag]:checked")
            .value) ||
        ""),
      (t.Check = ""),
      t
    );
  }
  _clearModalForm() {
    document.querySelector("#addEditModal form").reset();
  }
  _updateTag(t) {
    const e = this._datatableExtend.getSelectedRows(),
      a = this;
    e.every(function (e, d, o) {
      const l = this.data();
      (l.Tag = t), a._datatable.row(this).data(l).draw();
    }),
      this._datatableExtend.unCheckAllRows(),
      this._datatableExtend.controlCheckAll();
  }
  _onSingleSelect() {
    document
      .querySelectorAll(".edit-datatable")
      .forEach((t) => t.classList.remove("disabled"));
  }
  _onMultipleSelect() {
    document
      .querySelectorAll(".edit-datatable")
      .forEach((t) => t.classList.add("disabled"));
  }
  _onAnySelect() {
    document
      .querySelectorAll(".delete-datatable")
      .forEach((t) => t.classList.remove("disabled")),
      document
        .querySelectorAll(".tag-datatable")
        .forEach((t) => t.classList.remove("disabled"));
  }
  _onNoneSelect() {
    document
      .querySelectorAll(".delete-datatable")
      .forEach((t) => t.classList.add("disabled")),
      document
        .querySelectorAll(".tag-datatable")
        .forEach((t) => t.classList.add("disabled"));
  }
}
