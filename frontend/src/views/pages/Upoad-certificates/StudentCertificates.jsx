import React, { useEffect, useState } from "react";
import { API_STATUS } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { 
  fetchClasses,
  classSelector,
} from "../../../store/reducers/classReducer";
import {
  studentSelector,
  fetchStudentsByClassAsync
} from "../../../store/reducers/studentReducer";
import axios from "axios";


const StudentCertificates = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCertificateType, setSelectedCertificateType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [certificateFile, setCertificateFile] = useState(null);
  const [certificateTypes, setCertificateTypes] = useState([
    "Consolidated Mark Sheet",
    "Degree Certificate",
    "Provisional Certificate",
    "Semester 1",
    // ... add more certificate types as needed
  ]);
  const classesloading = useSelector(classSelector).classesloading;
  const studentsloading = useSelector(studentSelector).fetchingstudentsbyclassloading
  const classLoadData = useSelector(classSelector).loadData;
  const loadData = useSelector(studentSelector).fetchstudentbyclassloadData
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClasses());
    
  }, [dispatch]);

    useEffect(() => {
    fetchStudents()
    
  }, [selectedClass]);

  const fetchStudents = () => {
    if (selectedClass) {
      const classId = String(selectedClass);
      console.log(classId);
      dispatch(fetchStudentsByClassAsync(classId));
     
    }
  };
  useEffect(() => {
    console.log(classesloading, "classesloading");
    if (classesloading === API_STATUS.FULFILLED) {
      setClasses(classLoadData);
    }
    if (classesloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [classesloading]);

  useEffect(() => {
    console.log(studentsloading, "students loading");
    if (studentsloading === API_STATUS.FULFILLED) {
      setStudents(loadData);
    }
    if (studentsloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [studentsloading]);

  console.log(students)
 

  const handleClassClick = (selectedClass) => {
    setSelectedClass(selectedClass._id);
    setSelectedStudent(null);
    setSelectedCertificateType(null);
    setShowModal(false);
  };

  const handleStudentClick = (selectedStudent) => {
    setSelectedStudent(selectedStudent);
    setSelectedCertificateType(null);
    setShowModal(false);
  };

  const handleUploadButtonClick = (certificateType) => {
    setSelectedCertificateType(certificateType);
    setShowModal(true);
    setCertificateFile(null);
  };

  const handleFileChange = (event) => {
    setCertificateFile(event.target.files[0]);
  };

  const handleSave = async () => {
    if (!selectedStudent || !selectedCertificateType || !certificateFile) {
      return;
    }

    const formData = new FormData();
    formData.append("student", selectedStudent._id);
    formData.append("type", selectedCertificateType);
    formData.append("certificate", certificateFile);

    try {
      const response = await axios.post(
        "http://localhost:3002/api/certificate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Certificate uploaded:", response.data);
      // Handle any further logic, such as updating UI or reloading data
      setShowModal(false);
    } catch (error) {
      console.error("Error uploading certificate:", error);
      // Handle error scenarios
    }
  };

  const handleDownloadButtonClick = async (certificateType) => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/certificate",
        {
          params: {
            student: selectedStudent._id,
            type: certificateType,
          },
        }
      );

      // If a certificate exists, open a new tab to download the file
      if (response.data.fileUrl) {
        // Generate the URL for fetching the file
        const downloadUrl = `http://localhost:3002/api/certificate/file/${encodeURIComponent(
          response.data.fileUrl
        )}`;

        // Trigger file download
        window.open(downloadUrl, "_blank");
      } else {
        // No document available message
        console.log(
          "No document is available to view/download. Kindly upload a document and try again"
        );
      }
    } catch (error) {
      console.error("Error fetching certificate:", error);
      // Handle error scenarios
    }
  };

  return (
    <div>
      <main>
        <div className="container">
          <div className="row">
            <div className="col">
              <section className="scroll-section" id="title">
                <div className="page-title-container">
                  <h1 className="mb-0 pb-0 display-4">
                    Student Certificates Reports
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
                {/* class section */}
                {classesloading === API_STATUS.PENDING ? (
                  <div style={{ width: "32%" }}>
                    <Skeleton
                      style={{ marginBottom: "20px", borderRadius: 20 }}
                      variant="rectangular"
                      height={20}
                      animation="wave"
                    />
                    <Skeleton
                      style={{
                        marginBottom: "20px",
                        marginRight: "10px",
                        borderRadius: 20,
                      }}
                      variant="rectangular"
                      height={300}
                      animation="wave"
                    />
                  </div>
                ) : (
                  <section
                    className="scroll-section col-12 col-md-4"
                    id="floatingLabel"
                  >
                    <div className="d-flex justify-content-between">
                      <h2 className="small-title">Classes</h2>
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
                    <div className="card mb-5">
                      <div className="card-body">
                        <form
                          id="validationFloatingLabel"
                          className="tooltip-end-top"
                        >
                          <div className="row g-3">
                            <div class="mb-3">
                              <label class="small-title">Select Class</label>

                              {classes.map((cls) => (
                                <div class="mb-2 filled border px-3 custom-control-container">
                                  <div class="form-check" key={cls._id}>
                                    <div onClick={() => handleClassClick(cls)}>
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        id="customRadioFilled"
                                        name="customRadio"
                                      />
                                      <label
                                        class="form-check-label"
                                        for="customRadioFilled"
                                      >
                                        {cls.name}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </section>
                )}
                {/* list of students section */}
                {studentsloading === API_STATUS.PENDING ? (
                  <div style={{ width: "32%" }}>
                    <Skeleton
                      style={{ marginBottom: "20px", borderRadius: 20 }}
                      variant="rectangular"
                      height={20}
                      animation="wave"
                    />
                    <Skeleton
                      style={{
                        marginBottom: "20px",
                        marginRight: "10px",
                        borderRadius: 20,
                      }}
                      variant="rectangular"
                      height={300}
                      animation="wave"
                    />
                  </div>
                ) : (
                  <section className="col-12 col-md-4">
                    <div>
                      <section
                        className="scroll-section"
                        id="buttons overlayScroll closeButtonOut"
                      >
                        <div className="d-flex justify-content-between">
                          <h2 className="small-title">List of Students</h2>
                          
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
                            <h2 className="small-title">Select Student</h2>
                            <div class="mb-3">
                              {selectedClass && (
                                <div>
                                  {students.map((student) => (
                                      <div class="mb-2 filled border px-3 custom-control-container">
                                        <div
                                          class="form-check"
                                          key={student._id}
                                          onClick={() =>
                                            handleStudentClick(student)
                                          }
                                        >
                                          <div>
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              id="customRadioFill"
                                              name="customRadios"
                                            />
                                            <label
                                              class="form-check-label"
                                              for="customRadioFill"
                                            >
                                              {student.personalDetails.studentName}
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </section>
                )}
                {/* certificates */}
                {studentsloading === API_STATUS.PENDING ? (
                  <div style={{ width: "32%" }}>
                    <Skeleton
                      style={{ marginBottom: "20px", borderRadius: 20 }}
                      variant="rectangular"
                      height={20}
                      animation="wave"
                    />
                    <Skeleton
                      style={{ marginBottom: "20px", borderRadius: 20 }}
                      variant="rectangular"
                      height={300}
                      animation="wave"
                    />
                  </div>
                ) : (
                  <section className="col-12 col-md-4">
                    <div>
                      <section
                        className="scroll-section"
                        id="buttons overlayScroll closeButtonOut"
                      >
                        <div className="d-flex justify-content-between">
                          <h2 className="small-title">Upload Certificates</h2>
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
                            <h2 className="small-title">Certificate Upload</h2>
                            <div class="mb-3">
                              {selectedStudent && (
                                <div>
                                  <p>
                                    Selected Student:{" "}
                                    {selectedStudent.studentName}
                                  </p>
                                  <table className="table table-striped table-bordered">
                                    <thead>
                                      <tr>
                                        <th>Certificate Type</th>
                                        <th className="text-center">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {/* Render an upload button for each certificate type */}
                                      {certificateTypes.map((type) => (
                                        <tr key={type}>
                                          <td>{type}</td>
                                          <td className="text-center">
                                            <div className="d-flex">
                                              <button
                                                data-bs-dismiss="modal"
                                                onClick={() =>
                                                  handleUploadButtonClick(type)
                                                }
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdropUpload"
                                                className="btn btn-primary py-2 mx-2"
                                              >
                                                <i class="fas fa-upload"></i>{" "}
                                                Upload
                                              </button>
                                              <button
                                                className="btn btn-success py-2"
                                                onClick={() =>
                                                  handleDownloadButtonClick(
                                                    type
                                                  )
                                                }
                                              >
                                                <i class="fas fa-download"></i>{" "}
                                                Download
                                              </button>
                                            </div>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </section>
                )}
              </div>
              <section className="scroll-section " id="staticBackdrop">
                <div className="card-body">
                  <div
                    className={`modal fade scroll-out ${
                      showModal ? "show" : "hidden"
                    }`}
                    id="staticBackdropUpload"
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
                            Upload Certificate
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <form
                          className="modal-body py-0 tooltip-end-top"
                          id="validationFloatingLabel basic basicSingle autoSizing range"
                        >
                          <div className="row g-3">
                            <div className="col-md-10">
                              <div className="mb-3">
                                <label className="form-label"></label>
                                <section class="scroll-section" id="filled">
                                  <h2 class="small-title">
                                    {" "}
                                    {selectedCertificateType}
                                  </h2>
                                  <div class="card mb-5">
                                    <div>
                                      <form>
                                        <div class="filled">
                                          <div
                                            class="dropzone dropzone-filled"
                                            id="dropzoneFilled"
                                          >
                                            <input
                                              type="file"
                                              className="form-control"
                                              id="fileInput"
                                              onChange={handleFileChange}
                                              // Add accepted file types if needed
                                            />
                                            <label
                                              className="form-label"
                                              htmlFor="fileInput"
                                            ></label>
                                          </div>
                                          <i data-acorn-icon="upload"></i>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </form>
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
                            onClick={handleSave}
                            data-bs-dismiss="modal"
                            className="btn btn-primary"
                          >
                            Save
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

export default StudentCertificates;
