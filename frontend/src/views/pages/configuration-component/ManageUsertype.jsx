import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_STATUS } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRoles, userroleSelector } from "../../../store/reducers/userroleReducer";
import { fetchUserTypes, usertypeSelector } from "../../../store/reducers/usertypeReducer";


const ManageUsertype = () => {
  const [userRoles, setUserRoles] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [selectedUserRole, setSelectedUserRole] = useState("");
  const [roleType, setRoleType] = useState("");
  const [status, setStatus] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editData, setEditData] = useState({
    _id: "",
    userRole: "",
    roleType: "",
    status: "",
  });

  const userroleloading = useSelector(userroleSelector).userroleloading
  const userroleLoadData = useSelector(userroleSelector).loadData
  const usertypeloading = useSelector(usertypeSelector).usertypeloading
  const usertypeLoadData = useSelector(usertypeSelector).loadData
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserRoles());
    dispatch(fetchUserTypes())
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

  useEffect(() => {
    console.log(usertypeloading, "usertypeloading");
    if (usertypeloading === API_STATUS.FULFILLED) {
      setUserTypes(usertypeLoadData)
     
    }
    if (usertypeloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [usertypeloading]);


  const openEditModal = (userType) => {
    setEditData({
      _id: userType._id,
      userRole: userType.userRole,
      roleType: userType.roleType,
      status: userType.status,
    });
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };
  const openDeleteConfirmation = (userTypeId) => {
    setDeleteId(userTypeId);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setDeleteId("");
    setDeleteConfirmationOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3002/api/usertype/${deleteId}`);
      console.log("User type deleted:", deleteId);

      // Update the userTypes state after deletion
      const updatedUserTypes = userTypes.filter(
        (userType) => userType._id !== deleteId
      );
      setUserTypes(updatedUserTypes);

      // Close the delete confirmation modal
      closeDeleteConfirmation();
    } catch (error) {
      console.error("Error deleting user type:", error);
      // Handle error here, show an error message, etc.
    }
  };
  const handleEdit = async () => {
    try {
      // Optimistically update the UI with edited data
      const updatedUserTypes = userTypes.map((userType) =>
        userType._id === editData._id ? editData : userType
      );
      setUserTypes(updatedUserTypes);

      // Send the PUT request to the server
      const response = await axios.put(
        `http://localhost:3002/api/usertype/${editData._id}`,
        editData
      );
      console.log("Data updated:", response.data);

      // Close the edit modal
      closeEditModal();
    } catch (error) {
      console.error("Error updating data:", error);
      // If the request fails, revert the UI to the previous state
      const originalUserTypes = userTypes.map((userType) =>
        userType._id === editData._id ? userType : userType
      );
      setUserTypes(originalUserTypes);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      userRole: selectedUserRole,
      roleType: roleType,
      status: status,
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/api/usertype",
        data
      );
      console.log("Data submitted:", response.data);

      // Update the userTypes state with the new user type
      setUserTypes([...userTypes, response.data]);

      setSelectedUserRole("");
      setRoleType("");
      setStatus("");
    } catch (error) {
      console.error("Error submitting data:", error);
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
                  <h2 className="small-title">Manage User Type</h2>
                  <div className="card mb-5">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <div className=" mb-3">
                              <label className="form-label">User Role</label>
                              <select
                                className="form-select"
                                value={selectedUserRole}
                                onChange={(e) =>
                                  setSelectedUserRole(e.target.value)
                                }
                                required
                              >
                                <option value="">--Select role--</option>
                                {userRoles.map((userRole) => (
                                  <>
                                    <option
                                      key={userRole._id}
                                      value={userRole.userRole}
                                    >
                                      {userRole.userRole}
                                    </option>
                                  </>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className=" mb-3">
                              <label className="form-label">Role Type</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Role Type"
                                value={roleType}
                                onChange={(e) => setRoleType(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
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
                          Manage User Type Details
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
                                  Role Type
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
                              {userTypes.map((userType) => (
                                <tr key={userType._id}>
                                  <td>{userType.userRole}</td>
                                  <td>{userType.roleType}</td>
                                  <td>{userType.status}</td>
                                  <td className="text-center">
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#staticBackdropEdittype"
                                      className="btn btn-sm btn-outline-primary ms-1"
                                      onClick={() => openEditModal(userType)}
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
                                        openDeleteConfirmation(userType._id)
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

          <section className="scroll-section" id="staticBackdrop">
            <div className="card-body">
              <div
                className={`modal fade ${editModalOpen ? "show" : "hidden"}`}
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
                            <label className="form-label">User Role</label>
                            <select
                              className="form-select"
                              value={editData.userRole}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  userRole: e.target.value,
                                })
                              }
                              required
                            >
                              {" "}
                              {userRoles.map((userRole) => (
                                <>
                                  <option
                                    key={userRole._id}
                                    value={userRole.userRole}
                                  >
                                    {userRole.userRole}
                                  </option>
                                </>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Role Type</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Role Type"
                              required
                              value={editData.roleType}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  roleType: e.target.value,
                                })
                              }
                            />
                          </div>
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
        </div>
      </main>
    </div>
  );
};

export default ManageUsertype;
