import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_STATUS } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRoles, userroleSelector } from "../../../store/reducers/userroleReducer";

const ManageUserRole = () => {
  const [userRole, setUserRole] = useState("");
  const [status, setStatus] = useState("");
  const [userRoles, setUserRoles] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ userRole: "", status: "" });
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deletingUserRole, setDeletingUserRole] = useState('');
  const userroleloading = useSelector(userroleSelector).userroleloading
  const userroleLoadData = useSelector(userroleSelector).loadData
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchUserRoles())
  }, []);

  useEffect(() => {
    console.log(userroleloading, "userroleloading");
    if (userroleloading === API_STATUS.FULFILLED) {
      setUserRoles(userroleLoadData)
     
    }
    if (userroleloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [userroleloading]);
  const openEditModal = (role) => {
    setEditModalOpen(true);
    setEditData(role);
  };
  const openDeleteConfirmation = (role) => {
    setDeleteConfirmationOpen(true);
    setDeletingUserRole(role);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
    setDeletingUserRole(null);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditData({ userRole: "", status: "" });
  };

  // const fetchUserRoles = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3002/api/userrole");
  //     setUserRoles(response.data);
  //   } catch (error) {
  //     console.error("Error fetching user roles:", error);
  //   }
  // };
  const handleConfirmDelete = async () => {
    console.log("handleConfirmDelete called");
    try {
      const response = await axios.delete(
        `http://localhost:3002/api/userrole/${deletingUserRole._id}`
      );
      console.log(response.data);
      console.log("User role data deleted successfully.");

      // Close the modal and fetch user roles again to update the table
      closeDeleteConfirmation();
      dispatch(fetchUserRoles());
    } catch (error) {
      console.error("Error deleting user role data:", error);
    }
  };
  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3002/api/userrole/${editData._id}`,
        editData
      );
      console.log(response.data);
      console.log("User role data updated successfully.");

      // Close the modal and fetch user roles again to update the table
      closeEditModal();
      dispatch(fetchUserRoles());
    } catch (error) {
      console.error("Error updating user role data:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      userRole,
      status,
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/api/userrole",
        userData
      );
      console.log(response.data);
      console.log("User role data saved successfully.");

      // Clear the form fields after submission
      setUserRole("");
      setStatus("");

      // Fetch user roles again to update the table
      dispatch(fetchUserRoles());
    } catch (error) {
      console.error("Error saving user role data:", error);
    }
  };

  return (
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
                <section className="scroll-section col-12 col-md-6">
                  <h2 className="small-title">Manage User Role</h2>
                  <div className="card mb-5">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <div className=" mb-3">
                              <label className="form-label">User Role</label>
                              <input
                                type="text"
                                value={userRole}
                                onChange={(e) => setUserRole(e.target.value)}
                                className="form-control"
                                placeholder="User Role"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className=" mb-3">
                              <label className="form-label">Status</label>
                              <select
                                className="form-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required
                              >
                                <option value="">--Select Status--</option>
                                <option value="Active">Active</option>
                                <option value="Deactive">Deactive</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-primary end" type="submit">
                          Save
                        </button>
                      </form>
                    </div>
                  </div>
                </section>
                <section className="col-12 col-md-6">
                  <div>
                    <section
                      className="scroll-section"
                      id="buttons overlayScroll floaing-label closeButtonOut"
                    >
                      <div className="d-flex justify-content-between">
                        <h2 className="small-title">
                          Manage User Role Details
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
                                  User Role
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
                              {userRoles.map((userRole, index) => (
                                <tr key={index}>
                                  <td>{userRole.userRole}</td>
                                  <td>{userRole.status}</td>
                                  <td className="text-center">
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#staticBackdropEdituser"
                                      onClick={() => openEditModal(userRole)} 
                                      className="btn btn-sm btn-outline-primary ms-1"
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
                                      data-bs-target="#staticBackdropDeleteUser"
                                      onClick={() => openDeleteConfirmation(userRole)}  
                                      className="btn btn-sm btn-outline-primary ms-1"
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
                              ))}
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
          {/* Edit modal */}

          <section className="scroll-section " id="staticBackdrop">
            <div className="card-body">
              <div
                className={`modal fade ${editModalOpen ? "show" : "hidden"}`}
                id="staticBackdropEdituser"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
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
                        <div>
                          <div className=" mb-3">
                            <label className="form-label">User Role</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="User Role"
                              required
                              value={editData.userRole}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  userRole: e.target.value,
                                })
                              }
                            />
                          </div>
                         
                        </div>
                        <div className=" mb-3">
                            <label className="form-label">Status</label>
                            <select
                              className="form-select"
                              required
                              value={editData.status}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  status: e.target.value,
                                })
                              }
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
                id="staticBackdropDeleteUser"
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
                      Are you sure you want to delete this UserRole?
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
        </div>
      </main>
    </div>
  );
};

export default ManageUserRole;
