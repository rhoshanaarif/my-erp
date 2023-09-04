import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditStudentForm from "../Basic-Information/EditStudentForm/EditStudentForm";

const ManageStudents = () => {
  const [batch, setBatch] = useState([]);
  const [year, setYear] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]); // New state for filtered students
  const [students, setStudents] = useState([]);
  const [department, setDepartment] = useState([]);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] =
    useState("All Institution");
  const [selectedGraduation, setSelectedGraduation] =
    useState("All Graduation");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Department");
  const [selectedBatch, setSelectedBatch] = useState("All Batch");
  const [selectedYear, setSelectedYear] = useState("All Year");
  const [status, setStatus] = useState("All Students status");
  useEffect(() => {
    fetchStudentData();
    fetchDepartment();
    fetchBatch();
    fetchYear();
  }, []);
  const openDeleteConfirmationModal = (studentId) => {
    setStudentToDelete(studentId); // Set the student ID to state
    setDeleteConfirmationOpen(true); // Open the modal
  };
  const handleEditClick = (studentId) => {
    setSelectedStudentId(studentId);
    console.log("Edit button clicked for studentId:", studentId);
  };
  const handleFormClose = () => {
    setSelectedStudentId(null);
  };
  useEffect(() => {
    // Filter students based on selected filter options
    const filtered = students.filter((student) => {
      console.log("Selected Institution:", selectedInstitution);
      console.log("Student Institution:", student.officeDetails.institution);
      console.log("Student Institution:", student.officeDetails.yearAdmitted);
      return (
        (selectedInstitution === "All Institution" ||
          student.officeDetails.institution === selectedInstitution) &&
        (selectedGraduation === "All Graduation" ||
          student.markDetails.graduation === selectedGraduation) &&
        (selectedDepartment === "All Department" ||
          student.officeDetails.programmeAdmittedFor === selectedDepartment) &&
        (selectedBatch === "All Batch" ||
          student.officeDetails.batch === selectedBatch) &&
        (selectedYear === "All Year" ||
          student.officeDetails.yearAdmitted === selectedYear) &&
        (status === "All Students status" ||
          student.officeDetails.promotionStatus === status)
        // ... Add other filter if needed
      );
    });
    setFilteredStudents(filtered);
  }, [
    students,
    selectedInstitution,
    selectedGraduation,
    selectedDepartment,
    selectedBatch,
    selectedYear,
    status,
  ]);

  console.log(filteredStudents)
  const handleConfirmDelete = async () => {
    try {
      // Make the API request to delete the student
      const response = await axios.delete(
        `http://localhost:3002/api/student/${studentToDelete}`
      );
      console.log(response.data);
      // Refresh student data
      fetchStudentData();
      setDeleteConfirmationOpen(false);
      setStudentToDelete(null); // Reset studentToDelete after successful deletion
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const fetchStudentData = async () => {
    console.log("Selected Department:", selectedDepartment);
    try {
      const response = await axios.get("http://localhost:3002/api/student", {
        params: {
          institution: selectedInstitution,
          graduation: selectedGraduation,
          department: selectedDepartment,
          batch: selectedBatch,
          yearAdmitted: selectedYear,
          status: status,
        },
      });
      console.log(response.data);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  const fetchDepartment = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/department");
      setDepartment(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchBatch = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/batches");
      setBatch(response.data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const fetchYear = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/year");
      setYear(response.data);
    } catch (error) {
      console.error("Error fetching years:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchStudentData();
  };
  return (
    <div id="root">
      <main>
        {selectedStudentId ? (
          <>
            <EditStudentForm
              studentId={selectedStudentId}
              onClose={handleFormClose}
            />
          </>
        ) : (
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
                <section className="scroll-section">
                  <h2 className="small-title">Student Details</h2>
                  <div className="card mb-5">
                    <div className="card-body p-4">
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          <div className="col-md-4">
                            <div className=" mb-3">
                              <label className="form-label">Institution</label>
                              <select
                                id="viewSelector"
                                className="form-select"
                                onChange={(e) =>
                                  setSelectedInstitution(e.target.value)
                                }
                                value={selectedInstitution}
                              >
                                <option value="All Institution">
                                  All Institution
                                </option>
                                <option value="Self_Financed">
                                  ACET
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className=" mb-3">
                              <label className="form-label">Graduation</label>
                              <select
                                id="viewSelector"
                                className="form-select"
                                onChange={(e) =>
                                  setSelectedGraduation(e.target.value)
                                }
                                value={selectedGraduation}
                              >
                                <option value="All Graduation">
                                  All Graduation
                                </option>
                                <option>UG</option>
                                <option>PG</option>
                                <option>Phd</option>
                                <option>DOC</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className=" mb-3">
                              <label className="form-label">Department</label>
                              <select
                                id="viewSelector"
                                className="form-select"
                                onChange={(e) =>
                                  setSelectedDepartment(e.target.value)
                                }
                                value={selectedDepartment}
                              >
                                <option value="All Department">
                                  All Department
                                </option>
                                {department.map((dept) => (
                                  <option key={dept._id} value={dept.name}>
                                    {dept.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row g-3">
                          <div className="col-md-4">
                            <div className=" mb-3">
                              <label className="form-label">Batch</label>
                              <select
                                id="viewSelector"
                                className="form-select"
                                onChange={(e) =>
                                  setSelectedBatch(e.target.value)
                                }
                                value={selectedBatch}
                              >
                                <option value="All Batch">All Batch</option>
                                {batch.map((batchItem) => (
                                  <option
                                    key={batchItem._id}
                                    value={`${batchItem.batchStart} - ${batchItem.batchEnd}`}
                                  >
                                    {batchItem.batchStart} -{" "}
                                    {batchItem.batchEnd}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className=" mb-3">
                              <label className="form-label">Year</label>
                              <select
                                id="viewSelector"
                                className="form-select"
                                onChange={(e) =>
                                  setSelectedYear(e.target.value)
                                }
                                value={selectedYear}
                              >
                                <option value="All Year">All Year</option>
                                {year.map((yearItem) => (
                                  <option
                                    key={yearItem._id}
                                    value={yearItem.studentYear}
                                  >
                                    {yearItem.studentYear}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className=" mb-3">
                              <label className="form-label">
                                Promotion Status
                              </label>
                              <select
                                id="viewSelector"
                                className="form-select"
                                required
                                onChange={(e) => setStatus(e.target.value)}
                              >
                                <option value="All Students status">
                                  All Students status
                                </option>
                                <option value="Active">Active</option>
                                <option value="Completed">Completed</option>
                                <option value="Debarred">Debarred</option>
                                <option value="Discontinued">
                                  Discontinued
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-primary end" type="submit">
                          View Students
                        </button>
                      </form>
                    </div>
                  </div>
                </section>
                <section className="">
                  <div>
                    <section
                      className="scroll-section"
                      id="buttons overlayScroll floaing-label closeButtonOut"
                    >
                      <div className="d-flex justify-content-between">
                        <h2 className="small-title">Manage Student Details</h2>
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
                        <div className="scroll-by-count card-body p-4">
                          <table
                            id="studentTable"
                            className="table table-striped table-bordered"
                          >
                            <thead>
                              <tr>
                                <th>
                                  S.No
                                  <button className="btn btn-link btn-sm">
                                    <i className="fas fa-sort"></i>
                                  </button>
                                </th>
                                <th>
                                  Student Name
                                  <button className="btn btn-link btn-sm">
                                    <i className="fas fa-sort"></i>
                                  </button>
                                </th>
                                <th>
                                  Registration Number
                                  <button className="btn btn-link btn-sm">
                                    <i className="fas fa-sort"></i>
                                  </button>
                                </th>
                                <th className="text-center">
                                  Student Mobile No
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
                            <tbody id="tableBody">
                              {filteredStudents.length === 0 ? (
                                <tr>
                                  <td colSpan="5" className="text-center">
                                    No records found.
                                  </td>
                                </tr>
                              ) : (
                                <>
                                  {filteredStudents.map((student, index) => (
                                    <tr key={student._id}>
                                      <td>{index + 1}</td>
                                      <td>
                                        {student.personalDetails.studentName}
                                      </td>
                                      <td>
                                        {
                                          student.officeDetails
                                            .universityRegisterNo
                                        }
                                      </td>
                                      <td className="text-center">
                                        {student.personalDetails.contactNumber}
                                      </td>
                                      <td className="text-center">
                                        <button
                                          data-bs-toggle="modal"
                                          data-bs-target="#staticBackdropEditable"
                                          className="btn btn-sm btn-outline-primary ms-1"
                                          onClick={() =>
                                            handleEditClick(student._id)
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
                                          data-bs-target="#staticBackdropDeleteBatch"
                                          onClick={() => {
                                            openDeleteConfirmationModal(
                                              student._id
                                            ); // Set the student ID for deletion
                                          }}
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
                                </>
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
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageStudents;
