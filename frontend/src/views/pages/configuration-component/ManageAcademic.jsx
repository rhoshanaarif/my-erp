import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageAcademic = () => {
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [oddSemStartDate, setOddSemStartDate] = useState("");
  const [oddSemEndDate, setOddSemEndDate] = useState("");
  const [evenSemStartDate, setEvenSemStartDate] = useState("");
  const [evenSemEndDate, setEvenSemEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [academicData, setAcademicData] = useState([]);
  const [academicDataList, setAcademicDataList] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [academicToDeleteId, setAcademicToDeleteId] = useState("");

  // State for edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    fromYear: "",
    toYear: "",
    oddSemStartDate: "",
    oddSemEndDate: "",
    evenSemStartDate: "",
    evenSemEndDate: "",
    status: "",
  });

  // Open delete confirmation modal
  const openDeleteConfirmation = (academicId) => {
    setAcademicToDeleteId(academicId);
    setDeleteConfirmationOpen(true);
  };
  // Function to format date for input field
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };
  // Fetch academic data using GET request
  const fetchAcademicData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/academic");
      setAcademicDataList(response.data);
    } catch (error) {
      console.error("Error fetching academic data:", error);
    }
  };

  useEffect(() => {
    fetchAcademicData();
  }, []);

  // Open edit modal and set data for editing
  const openEditModal = (data) => {
    setEditModalOpen(true);
    setEditData(data);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditData({
      _id: "",
      fromYear: "",
      toYear: "",
      oddSemStartDate: "",
      oddSemEndDate: "",
      evenSemStartDate: "",
      evenSemEndDate: "",
      status: "",
    });
  };

  // Handle update (PUT) request
  const handleEdit = async () => {
    try {
      await axios.put(
        `http://localhost:3002/api/academic/${editData._id}`,
        editData
      );
      fetchAcademicData(); // Fetch updated data
      closeEditModal(); // Close the edit modal
    } catch (error) {
      console.error("Error updating academic data:", error);
    }
  };

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3002/api/academic/${academicToDeleteId}`
      );
      fetchAcademicData();
      setDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting academic data:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const academicData = {
      fromYear,
      toYear,
      oddSemStartDate,
      oddSemEndDate,
      evenSemStartDate,
      evenSemEndDate,
      status,
    };

    try {
      await axios
        .post("http://localhost:3002/api/academic", academicData)
        .then((response) => {
          console.log(response.data);
          console.log("Academic data saved successfully.");
          // You can update state here if needed
          setFromYear("");
          setToYear("");
          setOddSemStartDate("");
          setOddSemEndDate("");
          setEvenSemStartDate("");
          setEvenSemEndDate("");
          setStatus("");
        })
        .catch((error) => {
          console.error("Error saving academic data:", error);
        });
    } catch (error) {
      console.error("Error:", error);
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
                  <h2 className="small-title">Academic Year</h2>
                  <div className="card mb-5">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <div className=" mb-3">
                              <label className="form-label">From Year</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="From Year"
                                required
                                value={fromYear}
                                onChange={(e) => setFromYear(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className=" mb-3">
                              <label className="form-label">To Year</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="To Year"
                                required
                                value={toYear}
                                onChange={(e) => setToYear(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <div className=" mb-3">
                              <label className="form-label">
                                Odd Sem Start Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                required
                                value={oddSemStartDate}
                                onChange={(e) =>
                                  setOddSemStartDate(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className=" mb-3">
                              <label className="form-label">
                                Odd Sem End Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                required
                                value={oddSemEndDate}
                                onChange={(e) =>
                                  setOddSemEndDate(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <div className=" mb-3">
                              <label className="form-label">
                                Even Sem Start Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                required
                                value={evenSemStartDate}
                                onChange={(e) =>
                                  setEvenSemStartDate(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className=" mb-3">
                              <label className="form-label">
                                Even Sem End Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                required
                                value={evenSemEndDate}
                                onChange={(e) =>
                                  setEvenSemEndDate(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <div className=" mb-3">
                              <label className="form-label">Status</label>
                              <select
                                className="form-select"
                                required
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
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
                        <h2 className="small-title">Manage Academic Details</h2>
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
                                  From Year
                                  <button className="btn btn-link btn-sm">
                                    <i className="fas fa-sort"></i>
                                  </button>
                                </th>
                                <th>
                                  To year
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
                              {academicDataList.map((data, index) => (
                                <tr key={index}>
                                  <td>{data.fromYear}</td>
                                  <td>{data.toYear}</td>
                                  <td>{data.status}</td>
                                  <td className="text-center">
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#staticBackdropEditable"
                                      onClick={() => openEditModal(data)}
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
                                      data-bs-target="#staticBackdropDeletable"
                                      onClick={() =>
                                        openDeleteConfirmation(data._id)
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
          {/* Edit modal */}

          <section className="scroll-section " id="staticBackdrop">
            <div className="card-body">
              <div
                className={`modal fade ${editModalOpen ? "show" : "hidden"}`}
                id="staticBackdropEditable"
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
                        <div className="col-md-6">
                          <div className=" mb-3">
                            <label className="form-label">From Year</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="From Year"
                              required
                              value={editData.fromYear}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  fromYear: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className=" mb-3">
                            <label className="form-label">To Year</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="To Year"
                              required
                              value={editData.toYear}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  toYear: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className=" mb-3">
                            <label className="form-label">
                              Odd Sem Start Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              required
                              value={formatDateForInput(
                                editData.oddSemStartDate
                              )}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  oddSemStartDate: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className=" mb-3">
                            <label className="form-label">
                              Odd Sem End Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              required
                              value={formatDateForInput(editData.oddSemEndDate)}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  oddSemEndDate: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className=" mb-3">
                            <label className="form-label">
                              Even Sem Start Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              required
                              value={formatDateForInput(
                                editData.evenSemStartDate
                              )}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  evenSemStartDate: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className=" mb-3">
                            <label className="form-label">
                              Even Sem End Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              required
                              value={formatDateForInput(
                                editData.evenSemEndDate
                              )}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  evenSemEndDate: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row g-3">
                        <div className="col-md-6">
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
                id="staticBackdropDeletable"
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
                      Are you sure you want to delete this Academic?
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

export default ManageAcademic;
