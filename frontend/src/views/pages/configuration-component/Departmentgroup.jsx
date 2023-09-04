import React, { useState, useEffect } from "react";
import axios from "axios";

const Departmentgroup = () => {
  const [departmentGroups, setDepartmentGroups] = useState([]);
  const [editData, setEditData] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const [formData, setFormData] = useState({
    departmentGroup: "",
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    // Fetch department group data from the API
    async function fetchDepartmentGroups() {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/departmentgroup"
        );
        setDepartmentGroups(response.data);
      } catch (error) {
        console.error("Error fetching department groups:", error);
      }
    }

    fetchDepartmentGroups();
  }, []);

  const openEditModal = (departmentGroup) => {
    // Set the initial editData values from the selected departmentGroup
    setEditData({
      departmentGroup: departmentGroup.departmentGroup,
      title: departmentGroup.title,
      description: departmentGroup.description,
      status: departmentGroup.status,
      _id: departmentGroup._id, // Make sure to include the _id field
    });
    setEditItemId(departmentGroup._id); // Set the ID of the item to edit
  };

  // Function to open the delete confirmation modal
  const openDeleteConfirmation = (id) => {
    setDeleteId(id);
    // Additional logic to open the modal goes here
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setEditData({});
    // Additional logic to close the modal goes here
  };

  // Function to close the delete confirmation modal
  const closeDeleteModal = () => {
    setDeleteId(null);
    // Additional logic to close the modal goes here
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3002/api/departmentgroup/${editData._id}`,
        editData
      );

      // Handle success, update the departmentGroups state with the updated data
      const updatedGroups = departmentGroups.map((group) =>
        group._id === response.data._id ? response.data : group
      );
      setDepartmentGroups(updatedGroups);
      // Close the edit modal
      closeEditModal();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3002/api/departmentgroup/${deleteId}`
      );

      // Handle success, remove the deleted department group from the state
      const updatedGroups = departmentGroups.filter(
        (group) => group._id !== deleteId
      );
      setDepartmentGroups(updatedGroups);
      // Close the delete modal
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3002/api/departmentgroup",
        formData
      );
      console.log("Data submitted:", response.data);

      // Add the newly added department group to the local state
      setDepartmentGroups([...departmentGroups, response.data]);

      // If the POST request is successful, you can reset the form or perform other actions
      setFormData({
        departmentGroup: "",
        title: "",
        description: "",
        status: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div>
      <div id="root">
        <main>
          <div className="container">
            <div className="row">
              <div className="col">
                <section className="scroll-section" id="title">
                  <div className="page-title-container">
                    <h1 className="mb-0 pb-0 display-4">
                      Student's Information System
                    </h1>
                    <nav
                      className="breadcrumb-container d-inline-block"
                      aria-label="breadcrumb"
                    >
                      <ul className="breadcrumb pt-0">
                        <li className="breadcrumb-item">
                          <a href="#">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                          <a href="#">Interface</a>
                        </li>
                        <li className="breadcrumb-item">
                          <a href="#">Forms</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </section>
                <div className="row">
                  <section className="scroll-section col-12 col-md-4">
                    <h2 className="small-title">Department Group</h2>
                    <div className="card mb-5">
                      <div className="card-body">
                        <form onSubmit={handleSubmit}>
                          <div className="row g-3">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Department Group
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Department Group"
                                  name="departmentGroup"
                                  value={formData.departmentGroup}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Title"
                                  name="title"
                                  value={formData.title}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row g-3">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Description
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Description"
                                  name="description"
                                  value={formData.description}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Status</label>
                              <select
                                className="form-select"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                              >
                                <option value="">--Select Status--</option>
                                <option value="Active">Active</option>
                                <option value="Deactive">Deactive</option>
                              </select>
                            </div>
                          </div>
                          <button className="btn btn-primary end" type="submit">
                            Save
                          </button>
                        </form>
                      </div>
                    </div>
                  </section>
                  <section className="col-12 col-md-8">
                    <div>
                      <section
                        className="scroll-section"
                        id="buttons overlayScroll floaing-label closeButtonOut"
                      >
                        <div className="d-flex justify-content-between">
                          <h2 className="small-title">
                            Manage Department Group Details
                          </h2>
                          <button
                            class="btn btn-icon btn-icon-only btn-sm btn-background-alternate mt-n2 shadow"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            aria-haspopup="true"
                          >
                            <i data-acorn-icon="more-horizontal"></i>
                          </button>
                          <div class="dropdown-menu dropdown-menu-sm dropdown-menu-end shadow">
                            <a class="dropdown-item" href="#">
                              Reload
                            </a>
                            <a class="dropdown-item" href="#">
                              Stats
                            </a>
                            <a class="dropdown-item" href="#">
                              Details
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">
                              Delete
                            </a>
                          </div>
                        </div>
                        <div className="scroll-out card">
                          <div className="scroll-by-count card-body">
                            <table className="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>
                                    Department Group
                                    <button className="btn btn-link btn-sm">
                                      <i className="fas fa-sort"></i>
                                    </button>
                                  </th>
                                  <th>
                                    Title
                                    <button className="btn btn-link btn-sm">
                                      <i className="fas fa-sort"></i>
                                    </button>
                                  </th>
                                  <th>
                                    Status
                                    <button className="btn btn-link btn-sm">
                                      <i className="fas fa-sort"></i>
                                    </button>
                                  </th>
                                  <th className="text-center">
                                    Action
                                    <button className="btn btn-link btn-sm">
                                      <i className="fas fa-sort"></i>
                                    </button>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {departmentGroups.map(
                                  (departmentGroup, index) => (
                                    <tr key={index}>
                                      <td>{departmentGroup.departmentGroup}</td>
                                      <td>{departmentGroup.title}</td>
                                      <td>{departmentGroup.status}</td>
                                      <td className="text-center">
                                        <button
                                          data-bs-toggle="modal"
                                          data-bs-target="#staticBackdropEdittype"
                                          className="btn btn-sm btn-outline-primary ms-1"
                                          onClick={() =>
                                            openEditModal(departmentGroup)
                                          } 
                                          type="button"
                                        >
                                          <i
                                            data-acorn-icon="edit-square"
                                            data-acorn-size="15"
                                          ></i>
                                          Edit
                                        </button>

                                        <button
                                          data-bs-toggle="modal"
                                          data-bs-target="#staticBackdropDeleteType"
                                          className="btn btn-sm btn-outline-primary ms-1"
                                          onClick={() =>
                                            openDeleteConfirmation(
                                              departmentGroup._id
                                            )
                                          }
                                          type="button"
                                        >
                                          <i
                                            data-acorn-icon="bin"
                                            data-acorn-size="15"
                                          ></i>
                                          <span>Delete</span>
                                        </button>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </section>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
          {/* Edit modal */}
          <section className="scroll-section" id="staticBackdrop">
            <div className="card-body">
              <div
                className={`modal fade ${editItemId ? "show" : "hidden"}`}
                id="staticBackdropEdittype"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form
                      className="modal-body tooltip-end-top"
                      id="validationFloatingLabel basic basicSingle autoSizing range"
                    >
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Department Group
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Department Group"
                              required
                              value={editData.departmentGroup}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  departmentGroup: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Title"
                              required
                              value={editData.title}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Description"
                              required
                              value={editData.description}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  description: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Status</label>
                          <select
                            className="form-select"
                            value={editData.status}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                status: e.target.value,
                              })
                            }
                            required
                          >
                            <option value="">--Select Status--</option>
                            <option value="Active">Active</option>
                            <option value="Deactive">Deactive</option>
                          </select>
                        </div>
                      </div>
                    </form>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={closeEditModal}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={handleEdit}
                        data-bs-dismiss="modal"
                        className="btn btn-primary"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Delete Modal  students */}
          <section className="scroll-section " id="staticBackdrop">
            <div className="card-body">
              <div
                className={`modal fade ${
                  deleteConfirmationOpen ? "show" : "hidden"
                }`}
                id="staticBackdropDeleteType"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                role="dialog"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="staticBackdropLabel">
                        Delete Operation
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Are you sure you want to delete this User Role Type?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirmDelete}
                        data-bs-dismiss="modal"
                        className="btn btn-primary"
                      >
                        Confirm Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Departmentgroup;
