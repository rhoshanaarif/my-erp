import React, { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@mui/material";


const AddSubjects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [facultyName, setFacultyName] = useState("");
  const [facultyNames, setFacultyNames] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null); // Store the subject to be deleted

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editSubjectData, setEditSubjectData] = useState({
    _id: "",
    subjectName: "",
    subjectCode: "",
    department: "",
    year: "",
    facultyName: "",
  });

  useEffect(() => {
    fetchDepartmentOptions();
    fetchFacultyNames();
    fetchSubjects(); // Fetch subjects
  }, []);
  const handleDeleteConfirmation = (subject) => {
    setSubjectToDelete(subject);
    setIsDeleteModalOpen(true);
  };

  const openEditPopup = (subject) => {
    setEditSubjectData(subject);
    setIsEditPopupOpen(true);
  };
  const handleDeleteSubject = (subject) => {
    if (!subject) return;
  
    axios
      .delete(`http://localhost:3002/api/subject/${subject.id}`)
      .then((response) => {
        // Handle successful deletion
        console.log('Subject deleted successfully');
        // Optionally, update the subjects array in state or refresh the table
        setIsDeleteModalOpen(false); // Close the delete confirmation modal
      })
      .catch((error) => {
        // Handle delete request error
        console.error('Error deleting subject:', error);
        setIsDeleteModalOpen(false); // Close the delete confirmation modal
      });
  };
  

  const fetchDepartmentOptions = () => {
    axios
      .get("http://localhost:3002/api/department?sort=asc")
      .then((response) => {
        const sortedDepartments = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setDepartmentOptions(sortedDepartments);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };
  const fetchSubjects = () => {
    axios
      .get("http://localhost:3002/api/subject") // Use the correct endpoint
      .then((response) => {
        setSubjects(response.data); // Update the state with retrieved subjects
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  // Fetch faculty names from the server
  const fetchFacultyNames = () => {
    axios
      .get("http://localhost:3002/api/faculty")
      .then((response) => {
        const facultyNames = response.data.map(
          (faculty) => faculty.facultyName
        );
        setFacultyNames(facultyNames); // Update the state variable
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };
  const handleUpdateSubject = () => {
    // Make a PUT request using Axios to update the subject data
    axios
      .put(
        `http://localhost:3002/api/subject/${editSubjectData._id}`,
        editSubjectData
      )
      .then((response) => {
        // Handle the response if needed
        console.log(response.data);

        // Close the edit popup modal here (if you are using a modal library).
      })
      .catch((error) => {
        // Handle errors if needed
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      subjectName,
      subjectCode,
      department,
      year,
      facultyName,
    };
    console.log(formData);

    // Make POST request using Axios
    axios
      .post("http://localhost:3002/api/subject", formData)
      .then((response) => {
        // Handle response data if needed
        console.log(response.data);

        // Reset form fields
        setSubjectName("");
        setSubjectCode("");
        setDepartment("");
        setYear("");
        setFacultyName("");
      })
      .catch((error) => {
        // Handle error if needed
        console.error(error);
      });
  };

  return (
    <div>
      <main>
        <div className="container">
          <div className="row">
            <div className="col">
              <section className="scroll-section" id="title">
                <div className="page-title-container">
                  <h1 className="mb-0 pb-0 display-4">Add Subjects</h1>
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
              {isLoading ? (
                <div>
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
                    height={400}
                    animation="wave"
                  />
                </div>
              ) : (
                <>
                  <div className="row">
                    <section className="scroll-section col-12 col-md-6">
                      <section className="scroll-section" id="floatingLabel">
                        <h2 className="small-title">Manage Subjects</h2>
                        <div className="card mb-5">
                          <div className="card-body">
                            <form
                              id="validationFloatingLabel"
                              onSubmit={handleSubmit}
                              className="tooltip-end-top"
                            >
                              <div className="row g-3">
                                <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Subject Name
                                    </label>
                                    <input
                                      value={subjectName}
                                      onChange={(e) =>
                                        setSubjectName(e.target.value)
                                      }
                                      type="text"
                                      className="form-control"
                                      placeholder="Student Name"
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Subject Code
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={subjectCode}
                                      onChange={(e) =>
                                        setSubjectCode(e.target.value)
                                      }
                                      placeholder="Code"
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="mb-3 w-100">
                                    <label className="form-label">
                                      Department
                                    </label>
                                    <select
                                      className="form-select"
                                      value={department}
                                      onChange={(e) =>
                                        setDepartment(e.target.value)
                                      }
                                    >
                                      <option selected>
                                        --Select Subject--
                                      </option>
                                      {departmentOptions.map((dept) => (
                                        <option
                                          key={dept._id}
                                          value={dept.name}
                                        >
                                          {dept.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="row g-3">
                                <div className="col-md-4">
                                  <div className="mb-3 w-100">
                                    <label className="form-label">Year</label>
                                    <select
                                      className="form-select"
                                      value={year}
                                      onChange={(e) => setYear(e.target.value)}
                                    >
                                      <option selected>--Select Year--</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="mb-3 w-100">
                                    <label className="form-label">
                                      Staff Name
                                    </label>
                                    <select
                                      className="form-select"
                                      value={facultyName}
                                      onChange={(e) =>
                                        setFacultyName(e.target.value)
                                      }
                                    >
                                      <option value="">--Select Staff--</option>
                                      {facultyNames.map((facultyName) => (
                                        <option
                                          key={facultyName}
                                          value={facultyName}
                                        >
                                          {facultyName}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>

                              <button className="btn btn-primary" type="submit">
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </section>
                    </section>{" "}
                    <section className="scroll-section col-12 col-md-6">
                      <section
                        className="scroll-section"
                        id="buttons overlayScroll floaing-label closeButtonOut"
                      >
                        <div className="d-flex justify-content-between">
                          <h2 className="small-title">
                            Manage Subjects Details
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
                                    Subject Name
                                    <button className="btn btn-link btn-sm">
                                      <i className="fas fa-sort"></i>
                                    </button>
                                  </th>
                                  <th>
                                    Subject Code
                                    <button className="btn btn-link btn-sm">
                                      <i className="fas fa-sort"></i>
                                    </button>
                                  </th>
                                  <th>
                                    Department
                                    <button className="btn btn-link btn-sm">
                                      <i className="fas fa-sort"></i>
                                    </button>
                                  </th>
                                  <th>
                                    Year
                                    <button className="btn btn-link btn-sm">
                                      <i className="fas fa-sort"></i>
                                    </button>
                                  </th>
                                  <th>
                                    Staff Name
                                    <button className="btn btn-link btn-sm">
                                      <i className="fas fa-sort"></i>
                                    </button>
                                  </th>
                                  <th className="text-center">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {subjects.map((item) => (
                                  <tr key={item.id}>
                                    <td>{item.subjectName}</td>
                                    <td>{item.subjectCode}</td>
                                    <td>{item.department}</td>
                                    <td>{item.year}</td>
                                    <td>{item.facultyName}</td>
                                    <td className="text-center">
                                      <button
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdropEdittype"
                                        className="btn btn-sm btn-outline-primary ms-1"
                                        type="button"
                                        onClick={() => openEditPopup(item)}
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
                                        type="button"
                                        onClick={() =>
                                          handleDeleteConfirmation(item)
                                        }
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
                    </section>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* edit Confirmation Modal */}
        <div
          id="staticBackdropEdittype"
          className={`modal fade ${isEditPopupOpen ? "show" : ""}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="staticBackdropEdittypeLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropEdittypeLabel">
                  Edit Subject
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setIsEditPopupOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="editSubjectName" className="form-label">
                      Subject Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editSubjectName"
                      value={editSubjectData.subjectName}
                      onChange={(e) =>
                        setEditSubjectData({
                          ...editSubjectData,
                          subjectName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editSubjectCode" className="form-label">
                      Subject Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editSubjectCode"
                      value={editSubjectData.subjectCode}
                      onChange={(e) =>
                        setEditSubjectData({
                          ...editSubjectData,
                          subjectCode: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editDepartment" className="form-label">
                      Department
                    </label>
                    <select
                      className="form-select"
                      id="editDepartment"
                      value={editSubjectData.department}
                      onChange={(e) =>
                        setEditSubjectData({
                          ...editSubjectData,
                          department: e.target.value,
                        })
                      }
                    >
                      <option value="">--Select Department--</option>
                      {departmentOptions.map((dept) => (
                        <option key={dept._id} value={dept.name}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editYear" className="form-label">
                      Year
                    </label>
                    <select
                      className="form-select"
                      id="editYear"
                      value={editSubjectData.year}
                      onChange={(e) =>
                        setEditSubjectData({
                          ...editSubjectData,
                          year: e.target.value,
                        })
                      }
                    >
                      <option value="">--Select Year--</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editFacultyName" className="form-label">
                      Staff Name
                    </label>
                    <select
                      className="form-select"
                      id="editFacultyName"
                      value={editSubjectData.facultyName}
                      onChange={(e) =>
                        setEditSubjectData({
                          ...editSubjectData,
                          facultyName: e.target.value,
                        })
                      }
                    >
                      <option value="">--Select Staff--</option>
                      {facultyNames.map((facultyName) => (
                        <option key={facultyName} value={facultyName}>
                          {facultyName}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setIsEditPopupOpen(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateSubject}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Delete Confirmation Modal */}
        <div
          id="staticBackdropDeleteType"
          className={`modal fade ${isDeleteModalOpen ? "show" : "hide"}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="staticBackdropDeleteTypeLabel"
          aria-hidden="true"
        >
          {/* Modal content for delete confirmation */}
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropDeleteTypeLabel">
                  Delete Subject
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setIsDeleteModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                {subjectToDelete && (
                  <p>
                    Are you sure you want to delete the subject:{" "}
                    <strong>{subjectToDelete.subjectName}</strong>?
                  </p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteSubject(subjectToDelete)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddSubjects;
