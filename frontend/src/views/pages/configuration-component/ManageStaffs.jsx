import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import {
  deleteFacultyAction,
  getFaculty,
  facultySelector,
  updateFacultyAction,
} from "../../../store/reducers/facultyReducer";
import {
  departmentSelector,
  fetchDepartments,
} from "../../../store/reducers/departmentReducer";
import { API_STATUS } from "../../../utils/constants";
import Header from "../../../layout/Mainlayout/Header/Header";
import Footer from "../../../layout/Mainlayout/Footer/Footer";

const ManageStaffs = () => {
  const [formData, setFormData] = useState({
    editFaculty: {},
    editFacultyName: "",
    editisMarried: "",
    editGender: "",
    editDob: "",
    editcaste: "",
    editreligion: "",
    editbloodGroup: "",
    editusername: "",
    editpassword: "",
    editstaffCode: "",
    editemail: "",
    edituploadPhoto: "",
    editdoorNumber: "",
    editstreet: "",
    editpostalCity: "",
    editpostalCode: "",
    editdistrict: "",
    editstate: "",
    editContactNumber: "",
    editjobCategory: "",
    editDesignation: "",
    editDepartment: "",
    editJoiningDate: "",
    editAadharNumber: "",

    nameFilter: "",
    departmentFilter: "",
    departmentOptions: [],
  });
  const {
    editFaculty,
    editFacultyName,
    editisMarried,
    editGender,
    editDob,
    editcaste,
    editreligion,
    editbloodGroup,
    editusername,
    editpassword,
    editstaffCode,
    editemail,
    edituploadPhoto,
    editdoorNumber,
    editstreet,
    editpostalCity,
    editpostalCode,
    editdistrict,
    editstate,
    editContactNumber,
    editjobCategory,
    editDesignation,
    editDepartment,
    editJoiningDate,
    editAadharNumber,

    nameFilter,
    departmentFilter,
  } = formData;

  const [filteredFacultyData, setFilteredFacultyData] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteFacultyId, setDeleteFacultyId] = useState("");
  const facultiesloading = useSelector(facultySelector).facultiesloading;
  const updatefacultyloading =
    useSelector(facultySelector).updatefacultyloading;
  const deletefacultyloading =
    useSelector(facultySelector).deletefacultyloading;
  const departmentsloading = useSelector(departmentSelector).departmentsloading;
  const loadData = useSelector(facultySelector).loadData;
  const departmentLoadData = useSelector(departmentSelector).loadData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFaculty());
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    applyFilters();
  }, [formData, nameFilter, departmentFilter]);

  useEffect(() => {
    console.log(facultiesloading, "loading");
    if (facultiesloading === API_STATUS.FULFILLED) {
      setFormData({ ...formData, editFaculty: loadData });
    }
    if (facultiesloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [facultiesloading]);

  useEffect(() => {
    console.log(updatefacultyloading, "updatefacultyloading");
    if (updatefacultyloading === API_STATUS.FULFILLED) {
      dispatch(getFaculty());
      handleCloseEditModal();
    }
    if (updatefacultyloading === API_STATUS.REJECTED) {
      console.log("student update got failed");
    }
  }, [updatefacultyloading]);

  useEffect(() => {
    console.log(deletefacultyloading, "deletefacultyloading");
    if (deletefacultyloading === API_STATUS.FULFILLED) {
      dispatch(getFaculty());
      setDeleteFacultyId("");
      setConfirmDeleteOpen(false);
    }
    if (deletefacultyloading === API_STATUS.REJECTED) {
      console.log("student update got failed");
    }
  }, [deletefacultyloading]);

  useEffect(() => {
    console.log(departmentsloading, "departmentsloading");
    if (departmentsloading === API_STATUS.FULFILLED) {
      console.log("hi");
      setDepartmentOptions(departmentLoadData);
    }
    if (departmentsloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [departmentsloading]);

  const handleOpenEditModal = (faculty) => {
    setFormData({
      ...formData,
      editFaculty: faculty,
      editFacultyName: faculty.facultyName,
      editisMarried: faculty.isMarried,
      editcaste: faculty.caste,
      editreligion: faculty.religion,
      editbloodGroup: faculty.bloodGroup,
      editusername: faculty.username,
      editpassword: faculty.password,
      editstaffCode: faculty.staffCode,
      editemail: faculty.email,
      edituploadPhoto: faculty.uploadPhoto,
      editdoorNumber: faculty.doorNumber,
      editstreet: faculty.street,
      editpostalCity: faculty.postalCity,
      editpostalCode: faculty.postalCode,
      editdistrict: faculty.district,
      editstate: faculty.state,
      editjobCategory: faculty.jobCategory,
      editJoiningDate: faculty.joiningDate,
      editDesignation: faculty.designation,
      editDepartment: faculty.department,
      editDob: faculty.dob,
      editGender: faculty.gender,
      editContactNumber: faculty.contactNumber,
      editAadharNumber: faculty.aadharNumber,
    });
    setEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file
    // Do something with the selected file, e.g., store it in your state
    setFormData({
      ...formData,
      edituploadPhoto: selectedFile, // Store the file object in your state
    });
  };

  const handleEdit = () => {
    const updatedFaculty = {
      facultyName: editFacultyName,
      isMarried: editisMarried,
      caste: editcaste,
      religion: editreligion,
      bloodGroup: editbloodGroup,
      username: editusername,
      password: editpassword,
      staffCode: editstaffCode,
      email: editemail,
      uploadPhoto: edituploadPhoto,
      doorNumber: editdoorNumber,
      street: editstreet,
      postalCity: editpostalCity,
      postalCode: editpostalCode,
      district: editdistrict,
      state: editstate,
      jobCategory: editjobCategory,
      joiningDate: editJoiningDate,
      designation: editDesignation,
      department: editDepartment,
      dob: editDob,
      gender: editGender,
      contactNumber: editContactNumber,
      aadharNumber: editAadharNumber,
    };
    const facultyId = editFaculty._id;

    dispatch(
      updateFacultyAction({ facultyId: facultyId, facultyData: updatedFaculty })
    );
  };
  const handleDelete = () => {
    dispatch(deleteFacultyAction(deleteFacultyId));
  };

  const applyFilters = () => {
    let filteredData = loadData;

    if (nameFilter) {
      filteredData = filteredData.filter((faculty) =>
        faculty.facultyName.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (departmentFilter) {
      filteredData = filteredData.filter((faculty) =>
        faculty.department
          .toLowerCase()
          .includes(departmentFilter.toLowerCase())
      );
    }

    setFilteredFacultyData(filteredData);
  };
  return (
    <div>
      <main>
        <div className="container">
          <div className="row">
            <div className="col">
              <section className="scroll-section" id="title">
                <div className="page-title-container">
                  <h1 className="mb-0 pb-0 display-4">Student Information System</h1>
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
              <div className="mb-3">
              <h2 className="small-title">Manage Staff Details</h2>
                <div className="row col-12 col-md-6">
                  <section className="scroll-section col-12 col-md-6">
                    <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">
                      <input
                        type="text"
                        className="form-control datatable-search"
                        placeholder="Search Name Filter"
                        value={nameFilter}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nameFilter: e.target.value,
                          })
                        }
                      />
                      <span className="search-magnifier-icon">
                        <i data-acorn-icon="search"></i>
                      </span>
                      <span className="search-delete-icon d-none">
                        <i data-acorn-icon="close"></i>
                      </span>
                    </div>
                  </section>
                  <section className="scroll-section col-12 col-md-6">
                    <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">
                      <input
                        type="text"
                        className="form-control datatable-search"
                        placeholder="Search Department Filter"
                        value={departmentFilter}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            departmentFilter: e.target.value,
                          })
                        }
                      />
                      <span className="search-magnifier-icon">
                        <i data-acorn-icon="search"></i>
                      </span>
                      <span className="search-delete-icon d-none">
                        <i data-acorn-icon="close"></i>
                      </span>
                    </div>
                  </section>
                </div>
              </div>
              {facultiesloading === API_STATUS.PENDING ? (
                <div>
                  <Skeleton
                    style={{ marginBottom: "20px", borderRadius: 20 }}
                    variant="rectangular"
                    height={30}
                    width="100%"
                    animation="wave"
                  />
                  <Skeleton
                    style={{
                      marginBottom: "20px",
                      marginRight: "10px",
                      borderRadius: 20,
                    }}
                    variant="rectangular"
                    width="100%"
                    height={400}
                    animation="wave"
                  />
                </div>
              ) : (
                <div className="card p-5 card-body">
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th className="text-center">S.No</th>
                          <th className="text-center">Faculty Name</th>
                          <th className="text-center">Joining Date</th>
                          <th className="text-center">Designation</th>
                          <th className="text-center">Department</th>
                          <th className="text-center">Gender</th>
                          <th className="text-center">Contact Number</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFacultyData &&
                          filteredFacultyData.map((faculty, index) => (
                            <tr key={faculty._id}>
                              <td>{index + 1}</td>
                              <td>{faculty.facultyName}</td>
                              <td>{faculty.joiningDate}</td>
                              <td>{faculty.designation}</td>
                              <td>{faculty.department}</td>
                              <td>{faculty.gender}</td>
                              <td>{faculty.contactNumber}</td>
                              <td>
                                <div className="d-flex">
                                  <button
                                    title="edit"
                                    className="btn btn-primary px-2 py-2 mx-1"
                                    onClick={() => handleOpenEditModal(faculty)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdropFaculty"
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button
                                    title="delete"
                                    className="btn btn-danger px-2 py-2 mx-1"
                                    onClick={() => {
                                      setDeleteFacultyId(faculty._id);
                                      setConfirmDeleteOpen(true);
                                    }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticDeleteFaculty"
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Edit Faculty Modal */}
        <section className="scroll-section " id="staticBackdrop">
          <div className="card mb-3">
            <div>
              <div
                className={`modal fade ${editModalOpen ? "show" : ""}`}
                id="staticBackdropFaculty"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="staticBackdropLabel"
                aria-hidden={!editModalOpen}
              >
                <div className="modal-dialog" style={{ maxWidth: "1400px" }}>
                  <div className="modal-content">
                    <div className="px-6">
                      <div className="modal-header px-0">
                        <h5 className="modal-title" id="staticBackdropLabel">
                          Edit Faculty
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={handleCloseEditModal}
                        ></button>
                      </div>
                      <div className="pt-4">
                        <form>
                          <div className="row mb-2 g-3">
                            <div className="col-md-2">
                              <label className="form-label">Staff Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Faculty Name"
                                value={editFacultyName}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    editFacultyName: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">
                                Are you married?
                              </label>
                              <select
                                type="text"
                                className="form-select"
                                value={editisMarried}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    editisMarried: e.target.value,
                                  })
                                }
                                required
                              >
                                <option selected>--Select--</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>

                            <div className="col-md-2">
                              <label className="form-label">Gender</label>
                              <select
                                className="form-select"
                                name="gender"
                                value={editGender}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    editGender: e.target.value,
                                  })
                                }
                              >
                                <option selected>--Select Gender--</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>

                            <div className="col-md-2">
                              <label className="form-label">
                                Date of Birth
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                value={editDob}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    editDob: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-md-2">
                              <div className=" w-100">
                                <label className="form-label">Caste</label>
                                <select
                                  className="form-select"
                                  name="caste"
                                  value={editcaste}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      editcaste: e.target.value,
                                    })
                                  }
                                >
                                  <option selected>--Select Caste--</option>
                                  <option value="BC">BC</option>
                                  <option value="OBC">OBC</option>
                                  <option value="MBC">MBC</option>
                                  <option value="ST">ST</option>
                                  <option value="DC">DC</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className=" w-100">
                                <label className="form-label">Religion</label>
                                <select
                                  className="form-select"
                                  name="religion"
                                  value={editreligion}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      editreligion: e.target.value,
                                    })
                                  }
                                >
                                  <option selected>--Select Religion--</option>
                                  <option value="Hindu">Hindu</option>
                                  <option value="Christian">Christian</option>
                                  <option value="Muslim">Muslim</option>
                                  <option value="Jain">Jain</option>
                                  <option value="Sikh">Sikh</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className=" w-100">
                                <label className="form-label">
                                  Blood Group
                                </label>
                                <select
                                  className="form-select"
                                  name="bloodGroup"
                                  value={editbloodGroup}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      editbloodGroup: e.target.value,
                                    })
                                  }
                                >
                                  <option selected>--Select Blood Grp--</option>
                                  <option value="A+">A+</option>
                                  <option value="AB+">AB+</option>
                                  <option value="AB-">AB-</option>
                                  <option value="B+">B+</option>
                                  <option value="O+">O+</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="">
                                <label className="form-label">Username</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="User Name"
                                  name="username"
                                  value={editusername}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      editusername: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="">
                                <label className="form-label">Password</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Password"
                                  name="password"
                                  value={editpassword}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      editpassword: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="">
                                <label className="form-label">Staff Code</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Staff Code"
                                  name="staffCode"
                                  value={editstaffCode}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      editstaffCode: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="">
                                <label className="form-label">Email</label>
                                <input
                                  name="email"
                                  value={editemail}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      editemail: e.target.value,
                                    })
                                  }
                                  type="email"
                                  className="form-control"
                                  placeholder="Email"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="">
                                <label className="form-label">
                                  Upload Photo
                                </label>
                                <input
                                  type="file"
                                  className="form-control"
                                  name="uploadPhoto"
                                  onChange={(e) => handleFileChange(e)}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="">
                                <label className="form-label">
                                  Door No/House No
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Door No"
                                  name="doorNumber"
                                  value={editdoorNumber}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      editdoorNumber: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="">
                                <label className="form-label">Street</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Street"
                                  name="street"
                                  value={editstreet}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      editstreet: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="">
                                <label className="form-label">
                                  Postal city
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Postal city"
                                  name="postalCity"
                                  value={editpostalCity}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      editpostalCity: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="">
                                <label className="form-label">
                                  Postal code
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Postal code"
                                  name="postalCode"
                                  value={editpostalCode}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      editpostalCode: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="">
                                <label className="form-label">District</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="District"
                                  name="district"
                                  value={editdistrict}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      editdistrict: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="">
                                <label className="form-label">State</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="State"
                                  name="state"
                                  value={editstate}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      editstate: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">
                                Contact Number
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Contact Number"
                                value={editContactNumber}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    editContactNumber: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">Designation</label>
                              <select
                                className="form-select"
                                value={editDesignation}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    editDesignation: e.target.value,
                                  })
                                }
                                required
                              >
                                <option value="Assistant Professor">
                                  Assistant Professor
                                </option>
                                <option value="Professor">Professor</option>
                              </select>
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">Department</label>
                              <select
                                className="form-select"
                                value={editDepartment}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    editDepartment: e.target.value,
                                  })
                                }
                                required
                              >
                                {departmentOptions.map((dept) => (
                                  <option key={dept._id} value={dept.name}>
                                    {dept.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-md-2">
                              <div className="">
                                <label className="form-label">
                                  Joining Date
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  placeholder="Joining Date"
                                  name="joiningDate"
                                  value={editJoiningDate}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      editJoiningDate: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">Aadhar No</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Aadhar Number"
                                value={editAadharNumber}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    editAadharNumber: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                          </div>
                          <div className="text-end pb-4">
                            <button
                              className="btn btn-primary text-end mx-1"
                              onClick={handleEdit}
                              data-bs-dismiss="modal"
                            >
                              Save Changes
                            </button>
                            <button
                              className="btn btn-secondary text-end mx-1"
                              onClick={handleCloseEditModal}
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="scroll-section " id="staticBackdrop">
          <div className="card mb-3">
            <div>
              <div
                className={`modal fade ${
                  confirmDeleteOpen ? "show" : "hidden"
                }`}
                id="staticDeleteFaculty"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                role="dialog"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog " style={{ maxWidth: "650px" }}>
                  <div className="modal-content">
                    <div className="px-6">
                      <div className="modal-header px-0">
                        <h5 className="modal-title" id="staticBackdropLabel">
                          Delete Faculty
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="py-4">
                        <p>Are you sure you want to delete this faculty?</p>
                        <button
                          className="btn btn-primary text-end mx-1"
                          onClick={handleDelete}
                          data-bs-dismiss="modal"
                        >
                          Confirm
                        </button>
                        <button
                          className="btn btn-secondary text-end mx-1"
                          onClick={() => setConfirmDeleteOpen(false)}
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
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

export default ManageStaffs;
