import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_STATUS } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {fetchYears, yearSelector} from "../../../store/reducers/yearReducer";

const ManageYear = () => {
  const [studentYear, setStudentYear] = useState("");
  const [status, setStatus] = useState("");
  const [yearList, setYearList] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedYearIdToDelete, setSelectedYearIdToDelete] = useState("");
  const [editData, setEditData] = useState({
    studentYear: "",
    status: "",
    _id: "",
  });
  const yearloading = useSelector(yearSelector).yearloading;
  const yearLoadData = useSelector(yearSelector).loadData;
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchYears())
  }, []);

  useEffect(() => {
    console.log(yearloading, "yearloading");
    if (yearloading === API_STATUS.FULFILLED) {
      setYearList(yearLoadData);
    }
    if (yearloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [yearloading]);
  // Function to open the edit modal
  const handleEditButtonClick = (yearId) => {
    const selectedYear = yearList.find((year) => year._id === yearId);
    if (selectedYear) {
      setEditData({
        studentYear: selectedYear.studentYear,
        status: selectedYear.status,
        _id: selectedYear._id,
      });
      setEditModalOpen(true);
    }
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditData({
      studentYear: "",
      status: "",
      _id: "",
    });
  };
  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:3002/api/year/${editData._id}`, {
        studentYear: editData.studentYear,
        status: editData.status,
      });
      closeEditModal();
      dispatch(fetchYears())
    } catch (error) {
      console.error("Error editing year:", error);
    }
  };
  const openDeleteConfirmationModal = (yearId) => {
    setSelectedYearIdToDelete(yearId);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationModal = () => {
    setSelectedYearIdToDelete("");
    setDeleteConfirmationOpen(false);
  };
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3002/api/year/${selectedYearIdToDelete}`
      );
      closeDeleteConfirmationModal();
      dispatch(fetchYears())
    } catch (error) {
      console.error("Error deleting year:", error);
    }
  };

  // const fetchYearList = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3002/api/year");
  //     setYearList(response.data);
  //   } catch (error) {
  //     console.error("Error fetching years:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3002/api/year", {
        studentYear: studentYear,
        status: status,
      });
      // Clear the form fields
      setStudentYear("");
      setStatus("");
      // Refresh the year list
      dispatch(fetchYears())
    } catch (error) {
      console.error("Error creating year:", error);
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
                  <h2 className="small-title">Manage Student Year</h2>
                  <div className="card mb-5">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Student Year</label>
                              <input
                                type="text"
                                placeholder="Student Year"
                                className="form-control year-input"
                                value={studentYear}
                                onChange={(e) => setStudentYear(e.target.value)}
                                required
                              />
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
                        <h2 className="small-title">Manage Student Year Details</h2>
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
                                  Student Year
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
                              {yearList.map((yearItem, index) => (
                                <tr key={index}>
                                  <td>{yearItem.studentYear}</td>
                                  <td>{yearItem.status}</td>
                                  <td className="text-center">
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#staticBackdropEditBatch"
                                      className="btn btn-sm btn-outline-primary ms-1"
                                      type="button"
                                      onClick={() =>
                                        handleEditButtonClick(yearItem._id)
                                      }
                                    >
                                      <i
                                        data-acorn-icon="edit-square"
                                        data-acorn-size="15"
                                      ></i>
                                      Edit
                                    </button>
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#staticBackdropDeleteBatch"
                                      onClick={() =>
                                        openDeleteConfirmationModal(
                                          yearItem._id
                                        )
                                      }
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
        </div>

        {/* Edit modal */}
        <section className="scroll-section" id="staticBackdrop">
          <div className="card-body">
            <div
              className={`modal fade ${editModalOpen ? "show" : "hidden"}`}
              id="staticBackdropEditBatch"
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
                          <label className="form-label">Student Year</label>
                          <input
                            type="text"
                            placeholder="Student Year"
                            className="form-control year-input"
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                studentYear: e.target.value,
                              })
                            }
                            value={editData.studentYear}
                            required
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

        {/* Delete Modal */}
        <section className="scroll-section " id="staticBackdrop">
          <div className="card-body">
            <div
              className={`modal fade ${
                deleteConfirmationOpen ? "show" : "hidden"
              }`}
              id="staticBackdropDeleteBatch"
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
  );
};

export default ManageYear;
