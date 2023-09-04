import React, { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import { API_STATUS } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  departmentSelector,
  fetchDepartments,
  updateDepartmentAsync,
  deleteDepartmentAsync,
  addDepartmentAsync,
  updateDepartmentClassesAsync,
} from "../../../store/reducers/departmentReducer";
import {
  fetchClasses,
  classSelector,
  updateClassDepartmentAsync,
} from "../../../store/reducers/classReducer";
import Header from "../../../layout/Mainlayout/Header/Header.jsx";
import Footer from "../../../layout/Mainlayout/Footer/Footer.jsx";
import axios from "axios";

const AddDepartment = () => {
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [departmentType, setDepartmentType] = useState("");
  const [institution, setInstitution] = useState("");
  const [semester, setSemester] = useState("");
  const [duration, setDuration] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState("");
  const [status, setStatus] = useState("");
  const [departmentsList, setDepartmentsList] = useState([]);
  const [departmentGroups, setDepartmentGroups] = useState([]);
  const [depid, setDepartmentId] = useState([]);
  const [deleteDeptId, setDeleteDeptId] = useState("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editDepartment, setEditDepartment] = useState("");
  const [editDepartmentId, setEditDepartmentId] = useState("");
  const [showClassesModal, setShowClassesModal] = useState(false);
  const [classesForDepartment, setClassesForDepartment] = useState([]);
  const departmentsloading = useSelector(departmentSelector).departmentsloading;
  const adddepartmentloading =
    useSelector(departmentSelector).adddepartmentloading;
  const updatedepartmentloading =
    useSelector(departmentSelector).updatedepartmentloading;
  const deletedepartmentloading =
    useSelector(departmentSelector).deletedepartmentloading;
  const updatedepartmentclassloading =
    useSelector(departmentSelector).updatedepartmentclassloading;
  const classesloading = useSelector(classSelector).classesloading;
  const updateclassdepartmentloading =
    useSelector(classSelector).updateclassdepartmentloading;
  const departmentLoadData = useSelector(departmentSelector).loadData;
  const classLoadData = useSelector(classSelector).loadData;

  console.log(editModalOpen);
  console.log(showClassesModal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDepartments());
  }, [
    dispatch,
    adddepartmentloading,
    deletedepartmentloading,
    updatedepartmentloading,
    updatedepartmentclassloading,
  ]);

  useEffect(() => {
    console.log(departmentsloading, "departmentsloading");
    if (departmentsloading === API_STATUS.FULFILLED) {
      console.log("hi");
      setDepartmentsList(departmentLoadData);
    }
    if (departmentsloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [departmentsloading]);
  useEffect(() => {
    console.log(adddepartmentloading, "adddepartmentloading");
    if (adddepartmentloading === API_STATUS.FULFILLED) {
      setDepartment("");
    }
    if (adddepartmentloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [adddepartmentloading]);

  useEffect(() => {
    console.log(deletedepartmentloading, "deletedepartmentloading");
    if (deletedepartmentloading === API_STATUS.FULFILLED) {
    }
    if (deletedepartmentloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [deletedepartmentloading]);

  useEffect(() => {
    console.log(updatedepartmentloading, "updatedepartmentloading");
    if (updatedepartmentloading === API_STATUS.FULFILLED) {
      handleCloseEditModal();
    }
    if (updatedepartmentloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [updatedepartmentloading]);

  useEffect(() => {
    console.log(classesloading, "classesloading");
    if (classesloading === API_STATUS.FULFILLED) {
      const filteredClasses = classLoadData.filter(
        (cls) => cls.department === depid
      );
      setClassesForDepartment(filteredClasses);
    }
    if (classesloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [classesloading]);

  useEffect(() => {
    console.log(updateclassdepartmentloading, "updateclassdepartmentloading");
    if (updateclassdepartmentloading === API_STATUS.FULFILLED) {
    }
    if (updateclassdepartmentloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [updateclassdepartmentloading]);

  useEffect(() => {
    console.log(updatedepartmentclassloading, "updatedepartmentclassloading");
    if (updatedepartmentclassloading === API_STATUS.FULFILLED) {
    }
    if (updatedepartmentclassloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [updatedepartmentclassloading]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (department.trim() === "") {
      return; // Prevent adding empty departments
    }
    // Create an object with all the form data
    const formData = {
      name: department,
      category,
      departmentType,
      institution,
      semester,
      duration,
      numberOfSeats,
      status,
    };

    // Dispatch the action with the form data
    dispatch(addDepartmentAsync(formData));
    // Clear form fields after submission
    setDepartment("");
    setCategory("");
    setDepartmentType("");
    setInstitution("");
    setSemester(0);
    setDuration(0);
    setNumberOfSeats(0);
    setStatus("");
  };

  const handleDelete = (id) => {
    setDeleteDeptId(id);
    setDeleteConfirmationOpen(true);
  };
  const handleDeleteConfirmed = (id) => {
    dispatch(deleteDepartmentAsync(id));
    setDeleteDeptId("");
  };
  const handleOpenEditModal = (dept) => {
    setEditDepartment(dept.name);
    setEditDepartmentId(dept._id);
    setEditModalOpen(true);
    setShowClassesModal(false);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditDepartment("");
    setEditDepartmentId("");
  };

  const handleShowClasses = (departmentId) => {
    setShowClassesModal(true);
    setEditModalOpen(false);
    setDepartmentId(departmentId);
    dispatch(fetchClasses());
  };
  useEffect(() => {
    axios
      .get("http://localhost:3002/api/departmentgroup")
      .then((response) => {
        const data = response.data;
        setDepartmentGroups(data);
      })
      .catch((error) => {
        console.error("Error fetching department groups:", error);
      });
  }, []);
  const handleRemoveClassFromDepartment = (classId) => {
    // Send a PUT request to the class API to remove the department from the class
    const _id = classId;
    dispatch(updateClassDepartmentAsync({ _id, department: null }));
    setClassesForDepartment((prevClasses) => {
      return prevClasses.filter((cls) => cls._id !== classId);
    });

    const deptId = classesForDepartment[0].department;
    const classes = {
      classes: classesForDepartment
        .filter((cls) => cls._id !== classId)
        .map((cls) => cls._id),
    };
    dispatch(updateDepartmentClassesAsync({ deptId, classes }));
  };
  const handleCloseClassesModal = () => {
    setShowClassesModal(false);
    setClassesForDepartment([]);
  };

  const handleEdit = () => {
    const name = { name: editDepartment };
    const _id = editDepartmentId;
    dispatch(updateDepartmentAsync({ _id, name }));
  };

  return (
    <div>
      <main>
        <div className="container">
          <div className="row">
            <div className="col">
              <section className="scroll-section" id="title">
                <div className="page-title-container">
                  <h1 className="mb-0 pb-0 display-4">Student's Information System</h1>
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
                  <h2 className="small-title">Manage Department</h2>
                  <div className="card mb-5">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3 d-flex align-items-center gap-2">
                          <label
                            className="form-label"
                            style={{ minWidth: "110px" }}
                          >
                            Department
                          </label>
                          <input
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Department Name"
                            required
                          />
                        </div>
                        <div className="mb-3 d-flex align-items-center gap-2">
                          <label
                            className="form-label"
                            style={{ minWidth: "110px" }}
                          >
                            Category
                          </label>
                          <select
                            className="form-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            name="Category"
                            required
                          >
                            <option value="">--Select Category--</option>
                            {departmentGroups.map((group) => (
                              <option key={group._id} value={group.departmentGroup}>
                                {group.departmentGroup}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3 d-flex align-items-center gap-2">
                          <label
                            className="form-label"
                            style={{ minWidth: "110px" }}
                          >
                            Department Type
                          </label>
                          <select
                            className="form-select"
                            value={departmentType}
                            onChange={(e) => setDepartmentType(e.target.value)}
                            name="Department Type"
                            required
                          >
                            <option value="">--Select Type--</option>
                            <option value="UG">UG</option>
                            <option value="PG">PG</option>
                            <option value="Ph.D">Ph.D</option>
                            <option value="M.Phil">M.Phil</option>
                          </select>
                        </div>
                        <div className="mb-3 d-flex align-items-center gap-2">
                          <label
                            className="form-label"
                            style={{ minWidth: "110px" }}
                          >
                            Institution
                          </label>
                          <select
                            className="form-select"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            name="Institution"
                            required
                          >
                            <option value="">--Select Institute--</option>
                            <option value="Active">Aided</option>
                            <option value="Deactive">ACET</option>
                          </select>
                        </div>
                        <div className="mb-3 d-flex align-items-center gap-2">
                          <label
                            className="form-label"
                            style={{ minWidth: "110px" }}
                          >
                            Semester
                          </label>
                          <input
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            type="number"
                            className="form-control"
                            placeholder="Semester"
                            required
                          />
                        </div>
                        <div className="mb-3 d-flex align-items-center gap-2">
                          <label
                            className="form-label"
                            style={{ minWidth: "110px" }}
                          >
                            Duration
                          </label>
                          <input
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            type="number"
                            className="form-control"
                            placeholder="Duration"
                            required
                          />
                        </div>
                        <div className="mb-3 d-flex align-items-center gap-2">
                          <label
                            className="form-label"
                            style={{ minWidth: "110px" }}
                          >
                            No Of Seats
                          </label>
                          <input
                            value={numberOfSeats}
                            onChange={(e) => setNumberOfSeats(e.target.value)}
                            type="number"
                            className="form-control"
                            placeholder="No. of Seats"
                            required
                          />
                        </div>
                        <div className="mb-3 d-flex align-items-center gap-2">
                          <label
                            className="form-label"
                            style={{ minWidth: "110px" }}
                          >
                            Status
                          </label>

                          <select
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            name="Status"
                            required
                          >
                            <option value="">--Select Status--</option>
                            <option value="Active">Active</option>
                            <option value="Deactive">DeActive</option>
                          </select>
                        </div>
                        <button className="btn btn-primary" type="submit">
                          Save
                        </button>
                      </form>
                    </div>
                  </div>
                </section>
                {departmentsloading === API_STATUS.PENDING ? (
                  // Show skeleton loading while departments are loading
                  <div style={{ width: "50%" }}>
                    <Skeleton
                      style={{ marginBottom: "20px", borderRadius: 20 }}
                      variant="rectangular"
                      width="100%"
                      height={30}
                      animation="wave"
                    />
                    <Skeleton
                      style={{ marginBottom: "20px", borderRadius: 20 }}
                      variant="rectangular"
                      width="100%"
                      height={250}
                      animation="wave"
                    />
                  </div>
                ) : (
                  <section className="col-12 col-md-8">
                    <div>
                      <section
                        className="scroll-section"
                        id="buttons overlayScroll closeButtonOut"
                      >
                        <div className="d-flex justify-content-between">
                          <h2 className="small-title">Added credentials</h2>
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
                          <div className="scroll-by-count card-body ">
                            <div className="table-responsive">
                              <table className="table table-striped table-bordered">
                                <thead>
                                  <tr>
                                    <th>
                                      <div className="d-flex align-items-center">
                                        Department
                                        <button className="btn btn-link btn-sm">
                                          <i className="fas fa-sort"></i>
                                        </button>
                                      </div>
                                    </th>
                                    <th>
                                      <div className="d-flex align-items-center">
                                        Category
                                        <button className="btn btn-link btn-sm">
                                          <i className="fas fa-sort"></i>
                                        </button>
                                      </div>
                                    </th>
                                    <th>
                                      <div className="d-flex align-items-center">
                                        Type
                                        <button className="btn btn-link btn-sm">
                                          <i className="fas fa-sort"></i>
                                        </button>
                                      </div>
                                    </th>
                                    <th>
                                      <div className="d-flex align-items-center">
                                        Institution
                                        <button className="btn btn-link btn-sm">
                                          <i className="fas fa-sort"></i>
                                        </button>
                                      </div>
                                    </th>
                                    <th>
                                      <div className="d-flex align-items-center">
                                        Semester
                                        <button className="btn btn-link btn-sm">
                                          <i className="fas fa-sort"></i>
                                        </button>
                                      </div>
                                    </th>
                                    <th>
                                      <div className="d-flex align-items-center">
                                        Duration
                                        <button className="btn btn-link btn-sm">
                                          <i className="fas fa-sort"></i>
                                        </button>
                                      </div>
                                    </th>
                                    <th>
                                      <div className="d-flex align-items-center">
                                        No.of Seat
                                        <button className="btn btn-link btn-sm">
                                          <i className="fas fa-sort"></i>
                                        </button>
                                      </div>
                                    </th>
                                    <th>
                                      <div className="d-flex align-items-center">
                                        Status
                                        <button className="btn btn-link btn-sm">
                                          <i className="fas fa-sort"></i>
                                        </button>
                                      </div>
                                    </th>
                                    <th className="text-center">
                                      <div className="d-flex align-items-center justify-content-center">
                                        Action
                                        <button className="btn btn-link btn-sm">
                                          <i className="fas fa-sort"></i>
                                        </button>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {departmentsList.map((dept) => (
                                    <tr key={dept._id}>
                                      <td>{dept.name}</td>
                                      <td>{dept.category}</td>
                                      <td>{dept.departmentType}</td>
                                      <td>{dept.institution}</td>
                                      <td>{dept.semester}</td>
                                      <td>{dept.duration}</td>
                                      <td>{dept.numberOfSeats}</td>
                                      <td>{dept.status}</td>
                                      <td className="text-center">
                                        <div className="d-flex align-items-center">
                                          <button
                                            onClick={() =>
                                              handleOpenEditModal(dept)
                                            }
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdropExample"
                                            className="btn btn-sm btn-outline-primary ms-1"
                                            type="button"
                                          >
                                            <i className="fas fa-edit"></i>
                                          </button>
                                          <button
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdropDelete"
                                            onClick={() => {
                                              handleDelete(dept._id);
                                              setDeleteConfirmationOpen(true);
                                            }}
                                            className="btn btn-sm btn-outline-primary ms-1"
                                            type="button"
                                          >
                                            <i className="fas fa-trash-alt"></i>
                                          </button>
                                          <button
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackClassExample"
                                            onClick={() =>
                                              handleShowClasses(dept._id)
                                            }
                                            className="btn btn-sm font-weight-bold  btn-outline-primary ms-1"
                                            type="button"
                                          >
                                            view classes
                                            <i className="fas fa-eye mx-2"></i>
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Edit modal */}

        <section className="scroll-section " id="staticBackdrop">
          <div className="card-body">
            <div
              className={`modal fade  ${editModalOpen ? "show" : "hidden"}`}
              id="staticBackdropExample"
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
                      Editing Class
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <form
                    className="modal-body tooltip-end-top"
                    id="validationFloatingLabel basic basicSingle autoSizing range"
                  >
                    <div className="row g-3">
                      <div className="col-md-10">
                        <div className="mb-3">
                          <label className="form-label">Department</label>
                          <input
                            value={editDepartment}
                            onChange={(e) => setEditDepartment(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Student Name"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={handleCloseEditModal}
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
        {/* Display list of class NAmes*/}
        <section className="scroll-section " id="staticBackdrop">
          <div className="card-body">
            <div
              className={`modal fade scroll-out ${
                showClassesModal ? "show" : "hidden"
              }`}
              id="staticBackClassExample"
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
                      Classes for Department
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div
                    className="modal-body tooltip-end-top"
                    id="validationFloatingLabel basic basicSingle autoSizing range"
                  >
                    <div className="table-body-container">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Class Name</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {classesForDepartment.length !== 0 ? (
                            classesForDepartment.map((cls) => (
                              <tr key={cls._id}>
                                <td>{cls.name}</td>
                                <td className="text-center">
                                  <button
                                    data-bs-dismiss="modal"
                                    onClick={() =>
                                      handleRemoveClassFromDepartment(cls._id)
                                    }
                                    className="btn btn-danger btn-sm me-2"
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <p className="p-3">
                              No classes have yet been assigned to this
                              department
                            </p>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
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
              className={`modal fade  ${
                deleteConfirmationOpen ? "show" : "hidden"
              }`}
              id="staticBackdropDelete"
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
                    Are you sure you want to delete this class?
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
                      onClick={() => {
                        setDeleteConfirmationOpen(false);
                        handleDeleteConfirmed(deleteDeptId);
                      }}
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

export default AddDepartment;
