class EditableRows {
  constructor() {
     // Check if the element with the ID "addEditConfirmButton" exists before adding the event listener
     const confirmButton = document.getElementById("addEditConfirmButton");
     if (confirmButton) {
       confirmButton.addEventListener("click", this._addEditFromModalClick.bind(this));
     }
    jQuery().DataTable
      ? (this._rowToEdit,
        this._datatable,
        this._currentState,
        this._datatableExtend,
        this._addEditModal,
        (this._staticHeight = 62),
        this._createInstance(),
        this._addListeners(),
        this._extend(),
        this._initBootstrapModal())
      : console.log("DataTable is null!");
  }
  _createInstance() {
    const t = this;
    (this._datatable = jQuery("#datatableRows").DataTable({
      scrollX: !0,
      buttons: ["copy", "excel", "csv", "print"],
      info: !1,
      order: [],
      sDom: '<"row"<"col-sm-12"<"table-container"t>r>><"row"<"col-12"p>>',
      pageLength: 10,
      columns: [
        { data: "Name" },
        { data: "Category" },
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
    })),
      t._setInlineHeight();
  }
  _addListeners() {
    // Check if the element with ID "addEditConfirmButton" exists before adding the event listener
    const confirmButton = document.getElementById("addEditConfirmButton");
    if (confirmButton) {
      confirmButton.addEventListener("click", this._addEditFromModalClick.bind(this));
    }

    // Check if any elements with class "add-datatable" exist before adding event listeners
    const addButtons = document.querySelectorAll(".add-datatable");
    addButtons.forEach((t) => {
      t.addEventListener("click", this._onAddRowClick.bind(this));
    });

    // Check if any elements with class "delete-datatable" exist before adding event listeners
    const deleteButtons = document.querySelectorAll(".delete-datatable");
    deleteButtons.forEach((t) => {
      t.addEventListener("click", this._onDeleteClick.bind(this));
    });

    // Check if any elements with class "edit-datatable" exist before adding event listeners
    const editButtons = document.querySelectorAll(".edit-datatable");
    editButtons.forEach((t) => {
      t.addEventListener("click", this._onEditButtonClick.bind(this));
    });

    // Check if any elements with class "tag-done" exist before adding event listeners
    const tagDoneButtons = document.querySelectorAll(".tag-done");
    tagDoneButtons.forEach((t) => {
      t.addEventListener("click", () => this._updateTag("Done"));
    });

    // Check if any elements with class "tag-new" exist before adding event listeners
    const tagNewButtons = document.querySelectorAll(".tag-new");
    tagNewButtons.forEach((t) => {
      t.addEventListener("click", () => this._updateTag("New"));
    });

    // Check if any elements with class "tag-sale" exist before adding event listeners
    const tagSaleButtons = document.querySelectorAll(".tag-sale");
    tagSaleButtons.forEach((t) => {
      t.addEventListener("click", () => this._updateTag("Sale"));
    });

    // Check if the element with ID "addEditModal" exists before adding the event listener
    const addEditModal = document.getElementById("addEditModal");
    if (addEditModal) {
      addEditModal.addEventListener("hidden.bs.modal", this._clearModalForm);
    }
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
    const scrollBody = document.querySelector(".dataTables_scrollBody");
  
    if (scrollBody) {
      scrollBody.style.height = this._staticHeight * t + "px";
    }
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
    const t = this._rowToEdit.data(),
      e = Object.assign(t, this._getFormData());
    this._datatable.row(this._rowToEdit).data(e).draw(),
      this._datatableExtend.unCheckAllRows(),
      this._datatableExtend.controlCheckAll();
  }
  _addNewRowFromModal() {
    const t = this._getFormData();
    this._datatable.row.add(t).draw(),
      this._datatableExtend.unCheckAllRows(),
      this._datatableExtend.controlCheckAll();
  }
  _onDeleteClick() {
    this._datatableExtend.getSelectedRows().remove().draw(),
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
    e.every(function (e, d, l) {
      const o = this.data();
      (o.Tag = t), a._datatable.row(this).data(o).draw();
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
