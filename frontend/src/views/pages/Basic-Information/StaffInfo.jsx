import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { API_STATUS } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import axios from "axios";
import {
  departmentSelector,
  fetchDepartments,
} from "../../../store/reducers/departmentReducer";
import {
  addFacultyAsync,
  facultySelector,
} from "../../../store/reducers/facultyReducer";
import Header from "../../../layout/Mainlayout/Header/Header.jsx";
import Footer from "../../../layout/Mainlayout/Footer/Footer.jsx";

const AddFaculty = () => {
  const navigate = useNavigate();
  const [facultyData, setFacultyData] = useState({
    facultyName: "",
    isMarried: "",
    gender: "",
    dob: "",
    caste: "",
    religion: "",
    bloodGroup: "",
    username: "",
    password: "",
    staffCode: "",
    email: "",
    uploadPhoto: "",
    doorNumber: "",
    street: "",
    postalCity: "",
    postalCode: "",
    district: "",
    state: "",
    contactNumber: "",
    jobCategory: "",
    designation: "",
    department: "",
    joiningDate: "",
    aadharNumber: "",
  });
  const [userRoles, setUserRoles] = useState([]);
  const [selectedUserRole, setSelectedUserRole] = useState("");
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const departmentsloading = useSelector(departmentSelector).departmentsloading;
  const addfacultyloading = useSelector(facultySelector).addfacultyloading;
  const departmentLoadData = useSelector(departmentSelector).loadData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);
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

  useEffect(() => {
    if (addfacultyloading === API_STATUS.FULFILLED) {
      // Clear form fields on successful submission
      setFacultyData({
        facultyName: "",
        isMarried: "",
        gender: "",
        dob: "",
        caste: "",
        religion: "",
        bloodGroup: "",
        username: "",
        password: "",
        staffCode: "",
        email: "",
        uploadPhoto: "",
        doorNumber: "",
        street: "",
        postalCity: "",
        postalCode: "",
        district: "",
        state: "",
        contactNumber: "",
        jobCategory: "",
        designation: "",
        department: "",
        joiningDate: "",
        aadharNumber: "",
      });
    }
    if (addfacultyloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [addfacultyloading]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFacultyData({ ...facultyData, [name]: value });
  };
  useEffect(() => {
    async function fetchUserRoles() {
      try {
        const response = await axios.get("http://localhost:3002/api/userrole");
        setUserRoles(response.data);
      } catch (error) {
        console.error("Error fetching user roles:", error);
      }
    }

    fetchUserRoles();
    // fetchUserTypes();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDob = moment(facultyData.dob).format("DD-MM-YYYY");
    const formObject = {
      ...facultyData,
      dob: formattedDob,
      // Add other fields here if needed
    };
    dispatch(addFacultyAsync(formObject));
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
              {departmentsloading === API_STATUS.PENDING ? (
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
                <section className="scroll-section">
                  <h2 className="small-title">Staff Details</h2>
                  <div className="card mb-5">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          <div className="col-md-4">
                            <div className="">
                              <label className="form-label">Staff Name</label>
                              <input
                                name="facultyName"
                                value={facultyData.facultyName}
                                onChange={handleInputChange}
                                type="text"
                                className="form-control"
                                placeholder="Staff Name"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className=" w-100">
                              <label className="form-label">
                                Are you married?
                              </label>
                              <select
                                className="form-select"
                                name="isMarried"
                                value={facultyData.isMarried}
                                onChange={handleInputChange}
                              >
                                <option selected>--Select--</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className=" w-100">
                              <label className="form-label">Gender</label>
                              <select
                                className="form-select"
                                name="gender"
                                value={facultyData.gender}
                                onChange={handleInputChange}
                              >
                                <option selected>--Select Gender--</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="">
                              <label className="form-label">
                                Date of Birth
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                placeholder="Date"
                                name="dob"
                                value={facultyData.dob}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className=" w-100">
                              <label className="form-label">Caste</label>
                              <select
                                className="form-select"
                                name="caste"
                                value={facultyData.caste}
                                onChange={handleInputChange}
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
                          <div className="col-md-4">
                            <div className=" w-100">
                              <label className="form-label">Religion</label>
                              <select
                                className="form-select"
                                name="religion"
                                value={facultyData.religion}
                                onChange={handleInputChange}
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
                          <div className="col-md-4">
                            <div className=" w-100">
                              <label className="form-label">Blood Group</label>
                              <select
                                className="form-select"
                                name="bloodGroup"
                                value={facultyData.bloodGroup}
                                onChange={handleInputChange}
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
                          <div className="col-md-4">
                            <div className="">
                              <label className="form-label">Username</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="User Name"
                                name="username"
                                value={facultyData.username}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="">
                              <label className="form-label">Password</label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                value={facultyData.password}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="">
                              <label className="form-label">Staff Code</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Staff Code"
                                name="staffCode"
                                value={facultyData.staffCode}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="">
                              <label className="form-label">Email</label>
                              <input
                                name="email"
                                value={facultyData.email}
                                onChange={handleInputChange}
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="">
                              <label className="form-label">Upload Photo</label>
                              <input
                                type="file"
                                className="form-control"
                                name="uploadPhoto"
                                value={facultyData.uploadPhoto}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="">
                              <label className="form-label">
                                Door No/House No
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Door No"
                                name="doorNumber"
                                value={facultyData.doorNumber}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="">
                              <label className="form-label">Street</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Street"
                                name="street"
                                value={facultyData.street}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="">
                              <label className="form-label">Postal city</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Postal city"
                                name="postalCity"
                                value={facultyData.postalCity}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="">
                              <label className="form-label">Postal code</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Postal code"
                                name="postalCode"
                                value={facultyData.postalCode}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="">
                              <label className="form-label">District</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="District"
                                name="district"
                                value={facultyData.district}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="">
                              <label className="form-label">State</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="State"
                                name="state"
                                value={facultyData.state}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="">
                              <label className="form-label">
                                Contact Number
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Number"
                                name="contactNumber"
                                value={facultyData.contactNumber}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className=" w-100">
                              <label className="form-label">Job Category</label>
                              <select
                                className="form-select"
                                name="jobCategory"
                                value={facultyData.jobCategory}
                                onChange={handleInputChange}
                              >
                                <option selected>
                                  --Select Job Category--
                                </option>
                                {userRoles.map((userRole) => (
                                  <option
                                    key={userRole._id}
                                    value={userRole.userRole}
                                  >
                                    {userRole.userRole}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className=" w-100">
                              <label className="form-label">Designation</label>
                              <select
                                className="form-select"
                                name="designation"
                                value={facultyData.designation}
                                onChange={handleInputChange}
                              >
                                <option selected>--Select Designation--</option>
                                <option value="Assistant Professor">
                                  Assistant Professor
                                </option>
                                <option value="Professor">Professor</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className=" w-100">
                              <label className="form-label">Department</label>
                              <select
                                className="form-select"
                                name="department"
                                value={facultyData.department}
                                onChange={handleInputChange}
                              >
                                <option selected>--Select Dept--</option>
                                {departmentOptions.map((dept) => (
                                  <option key={dept._id} value={dept.name}>
                                    {dept.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="">
                              <label className="form-label">Joining Date</label>
                              <input
                                type="date"
                                className="form-control"
                                placeholder="Joining Date"
                                name="joiningDate"
                                value={facultyData.joiningDate}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="">
                              <label className="form-label">
                                16 Digit Aadhar No
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Aadhar Number"
                                name="aadharNumber"
                                value={facultyData.aadharNumber}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end">
                          <button
                            className="btn btn-primary my-4"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default AddFaculty;
