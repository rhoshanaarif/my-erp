import React, { useState, useEffect } from "react";
import { API_STATUS } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  departmentSelector,
  fetchDepartments,
} from "../../../store/reducers/departmentReducer";
import {
  fetchClasses,
  classSelector,
  addClassAsync,
  deleteClassAsync,
  updateClassAsync,
} from "../../../store/reducers/classReducer";
import {
  studentSelector,
  assignStudentsAsync,
  getStudents,
  removeStudentFromClassAsync,
} from "../../../store/reducers/studentReducer";
import Header from "../../../layout/Mainlayout/Header/Header.jsx";
import Footer from "../../../layout/Mainlayout/Footer/Footer.jsx";

const AddClass = () => {
  const [className, setClassName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [semester, setSemester] = useState("");
  const [classesList, setClassesList] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editClass, setEditClass] = useState("");
  const [editClassId, setEditClassId] = useState("");
  const [editSemester, setEditSemester] = useState("");
  const [editFromDate, setEditFromDate] = useState("");
  const [editToDate, setEditToDate] = useState("");
  const [studentsList, setStudentsList] = useState([]);
  const [unassignedStudents, setUnAssignedStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [viewStudentsModalOpen, setViewStudentsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departmentsList, setDepartmentsList] = useState([]);
  const [deleteClassId, setDeleteClassId] = useState("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const departmentsloading = useSelector(departmentSelector).departmentsloading;
  const classesloading = useSelector(classSelector).classesloading;
  const updateclassloading = useSelector(classSelector).updateclassloading;
  const deleteclassloading = useSelector(classSelector).deleteclassloading;
  const assignstudentloading =
    useSelector(studentSelector).assignstudentloading;
  const studentsloading = useSelector(studentSelector).studentsloading;
  const removestudentloading =
    useSelector(studentSelector).removingstudentloading;

  const loadData = useSelector(studentSelector).loadData;
  const departmentLoadData = useSelector(departmentSelector).loadData;
  const classLoadData = useSelector(classSelector).loadData;
  const addclassloading = useSelector(classSelector).addclassloading;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchClasses());
    dispatch(getStudents());
  }, [
    dispatch,
    addclassloading,
    deleteclassloading,
    updateclassloading,
    assignstudentloading,
    removestudentloading,
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
    console.log(classesloading, "classesloading");
    if (classesloading === API_STATUS.FULFILLED) {
      console.log("hi");
      setClassesList(classLoadData);
    }
    if (classesloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [classesloading]);

  useEffect(() => {
    console.log(assignstudentloading, "assignstudentloading");
    if (assignstudentloading === API_STATUS.FULFILLED) {
      handleCloseAssignModal();
    }
    if (assignstudentloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [assignstudentloading]);
  useEffect(() => {
    console.log(addclassloading, "addclassloading");
    if (addclassloading === API_STATUS.FULFILLED) {
      // Reset the class field
      setClassName("");
      setFromDate("");
      setToDate("");
      setSemester("");
      setSelectedDepartment("");
    }
    if (addclassloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [addclassloading]);

  useEffect(() => {
    console.log(studentsloading, "loading");
    if (studentsloading === API_STATUS.FULFILLED) {
      setStudentsList(loadData);
      const unassignedStudentsName = loadData.filter(
        (student) => !student.classId
      );
      setUnAssignedStudents(unassignedStudentsName);
    }
    if (studentsloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [studentsloading]);

  useEffect(() => {
    console.log(deleteclassloading, "deleteclassloading");
    if (deleteclassloading === API_STATUS.FULFILLED) {
    }
    if (deleteclassloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [deleteclassloading]);

  useEffect(() => {
    console.log(updateclassloading, "updateclassloading");
    if (updateclassloading === API_STATUS.FULFILLED) {
      handleCloseEditModal();
    }
    if (updateclassloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [updateclassloading]);

  useEffect(() => {
    console.log(removestudentloading, "removestudentloading");
    if (removestudentloading === API_STATUS.FULFILLED) {
      handleCloseViewStudentsModal();
    }
    if (removestudentloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [removestudentloading]);

  const handleAssignStudents = (classId) => {
    setSelectedStudents([]); // Clear previously selected students
    setEditClassId(classId); // Set the classId to which students will be assigned
    setAssignModalOpen(true);
  };

  const handleCloseAssignModal = () => {
    setAssignModalOpen(false);
  };

  const handleAssignStudentsConfirm = () => {
    dispatch(
      assignStudentsAsync({ classId: editClassId, students: selectedStudents })
    );
  };

  const handleViewStudents = (classId) => {
    setEditClassId(classId);

    setViewStudentsModalOpen(true);
  };
  const handleCloseViewStudentsModal = () => {
    setViewStudentsModalOpen(false);
  };

  const handleRemoveStudentFromClass = (studentId) => {
    dispatch(removeStudentFromClassAsync({ studentId, classId: editClassId }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      className.trim() === "" ||
      fromDate.trim() === "" ||
      toDate.trim() === "" ||
      semester.trim() === "" ||
      selectedDepartment.trim() === ""
    ) {
      return; // Prevent adding empty classes
    }

    const newClass = {
      name: className,
      fromDate: new Date(fromDate), // Convert fromDate to Date object
      toDate: new Date(toDate),
      semester: semester,
      department: selectedDepartment, // Use the selected department ID here
    };
    dispatch(addClassAsync(newClass));
  };
  const handleDelete = (classId) => {
    setDeleteClassId(classId);
    setDeleteConfirmationOpen(true);
  };
  const handleDeleteConfirmed = (classId) => {
    dispatch(deleteClassAsync(classId));
    setDeleteClassId(""); // Clear the stored class ID
  };

  const handleOpenEditModal = (classes) => {
    setEditClass(classes.name);
    setEditClassId(classes._id);
    // Convert string dates to Date objects
    const fromDate = new Date(classes.fromDate);
    const toDate = new Date(classes.toDate);

    // Convert Date objects to string format (YYYY-MM-DD)
    setEditFromDate(fromDate.toISOString().split("T")[0]);
    setEditToDate(toDate.toISOString().split("T")[0]);
    setEditSemester(classes.semester);
    setSelectedDepartment(classes.department);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditClass("");
    setEditClassId("");
  };

  const handleEdit = () => {
    const classData = {
      name: editClass,
      semester: editSemester,
      fromDate: editFromDate,
      toDate: editToDate,
      department: selectedDepartment,
    };
    const _id = editClassId;
    dispatch(updateClassAsync({ _id, classData }));
  };

  return (
    <div>
      <main>
        <div className="container">
          <div className="row">
            <div className="col">
              <section className="scroll-section" id="title">
                <div className="page-title-container">
                  <h1 className="mb-0 pb-0 display-4">Add Classes</h1>
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
                  <h2 className="small-title">Manage Class</h2>
                  <div className="card mb-5">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          <div className="col-md-4">
                            <div className=" mb-3">
                              <label className="form-label">Class Name</label>
                              <input
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Class Name"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className=" mb-3">
                              <label className="form-label">Semester</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="semester"
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className=" mb-3 w-100">
                              <label className="form-label">Department</label>
                              <select
                                className="form-select"
                                value={selectedDepartment}
                                onChange={(e) =>
                                  setSelectedDepartment(e.target.value)
                                }
                              >
                                <option selected>--Select Department--</option>
                                {departmentsList.map((department) => (
                                  <option
                                    key={department._id}
                                    value={department._id}
                                  >
                                    {department.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row g-3">
                          <div className="col-md-4">
                            <div className=" mb-3">
                              <label class="form-label">From Date</label>
                              <input
                                type="date"
                                className="form-control"
                                placeholder="Start"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className=" mb-3">
                              <label class="form-label">To Date</label>
                              <input
                                type="date"
                                className="form-control"
                                placeholder="End"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-primary" type="submit">
                          Add Class
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
                        <div className="scroll-by-count card-body">
                          <table className="table table-striped table-bordered">
                            <thead>
                              <tr>
                                <th>
                                  Class Name
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
                              {classesList.map((classes) => (
                                <tr key={classes._id}>
                                  <td>{classes.name}</td>
                                  <td className="text-center">
                                    <button
                                      onClick={() =>
                                        handleOpenEditModal(classes)
                                      }
                                      data-bs-toggle="modal"
                                      data-bs-target="#staticBackdropExample"
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
                                      data-bs-target="#staticBackdropDelete"
                                      onClick={() => {
                                        handleDelete(classes._id);
                                        setDeleteConfirmationOpen(true);
                                      }}
                                      className="btn btn-sm btn-outline-primary ms-1"
                                      type="button"
                                    >
                                      <i
                                        data-acorn-icon="bin"
                                        data-acorn-size="15"
                                      ></i>
                                      <span class="">Delete</span>
                                    </button>
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#overlayScrollMedium"
                                      onClick={() =>
                                        handleViewStudents(classes._id)
                                      }
                                      className="btn btn-sm btn-outline-primary ms-1"
                                      type="button"
                                    >
                                      View
                                    </button>
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#overlayScrollLong"
                                      onClick={() =>
                                        handleAssignStudents(classes._id)
                                      }
                                      className="btn btn-sm btn-outline-primary ms-1"
                                      type="button"
                                    >
                                      Assign students
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
              {/* Edit modal */}

              <section className="scroll-section " id="staticBackdrop">
                <div className="card-body">
                  <div
                    className={`modal fade scroll-out ${
                      editModalOpen ? "show" : "hidden"
                    }`}
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
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">Class</label>
                                <input
                                  value={editClass}
                                  onChange={(e) => setEditClass(e.target.value)}
                                  type="text"
                                  className="form-control"
                                  placeholder="Student Name"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">Semester</label>
                                <input
                                  className="form-control"
                                  placeholder="Password"
                                  value={editSemester}
                                  type="number"
                                  onChange={(e) =>
                                    setEditSemester(e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row g-3 ">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">From Date</label>
                                <input
                                  type="date"
                                  name="start"
                                  className="form-control"
                                  placeholder="Start"
                                  value={editFromDate}
                                  onChange={(e) =>
                                    setEditFromDate(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">To Date</label>
                                <input
                                  type="date"
                                  name="end"
                                  className="form-control"
                                  placeholder="End"
                                  value={editToDate}
                                  onChange={(e) =>
                                    setEditToDate(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row g-3">
                            <div className="col-md-10">
                              <div className="mb-3 w-100">
                                <label className="form-label">Department</label>
                                <select
                                  id="select2Basic"
                                  className="form-select"
                                  value={selectedDepartment}
                                  onChange={(e) =>
                                    setSelectedDepartment(e.target.value)
                                  }
                                >
                                  {departmentsList.map((department) => (
                                    <option
                                      key={department._id}
                                      value={department._id}
                                    >
                                      {department.name}
                                    </option>
                                  ))}
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
                            onClick={handleCloseAssignModal}
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

              {/* Assign modal */}

              <div
                className={`modal fade scroll-out ${
                  assignModalOpen ? "show" : "hidden"
                }`}
                id="overlayScrollLong"
                tabindex="-1"
                role="dialog"
                aria-labelledby="overlayScrollLongLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-scrollable long modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="overlayScrollLongLabel">
                        Assigning Student
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="scroll-track-visible table-body-container">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Student Name</th>
                              <th className="text-center">Assign</th>
                            </tr>
                          </thead>
                          <tbody>
                            {unassignedStudents.map((student) => (
                              <tr key={student._id}>
                                <td>{student.studentName}</td>
                                <td className="text-center">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={selectedStudents.includes(
                                      student._id
                                    )}
                                    onChange={(e) => {
                                      const studentId = student._id;
                                      setSelectedStudents((prevSelected) =>
                                        e.target.checked
                                          ? [...prevSelected, studentId]
                                          : prevSelected.filter(
                                              (id) => id !== studentId
                                            )
                                      );
                                    }}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={handleCloseAssignModal}
                      >
                        Cancel
                      </button>{" "}
                      <button
                        data-bs-dismiss="modal"
                        className="btn btn-primary me-2"
                        onClick={handleAssignStudentsConfirm}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Display list of students */}

              <div
                className={`modal fade scroll-out ${
                  viewStudentsModalOpen ? "show" : "hidden"
                }`}
                id="overlayScrollMedium"
                tabindex="-1"
                role="dialog"
                aria-labelledby="overlayScrollLongLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-scrollable long modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="overlayScrollLongLabel">
                        View Students
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div className="scroll-track-visible table-body-container">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Student Name</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {studentsList
                              .filter(
                                (student) => student.classId === editClassId
                              )
                              .map((student) => (
                                <tr key={student._id}>
                                  <td>{student.studentName}</td>
                                  <td className="text-center">
                                    <button
                                      data-bs-dismiss="modal"
                                      onClick={() =>
                                        handleRemoveStudentFromClass(
                                          student._id
                                        )
                                      }
                                      className="btn btn-danger btn-sm me-2"
                                    >
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delete Modal  students */}

              <section className="scroll-section " id="staticBackdrop">
                <div className="card-body">
                  <div
                    className={`modal fade ${
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
                              handleDeleteConfirmed(deleteClassId);
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddClass;
