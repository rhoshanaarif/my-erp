import React, { useState, useEffect } from "react";
import { API_STATUS } from "../../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClasses,
  classSelector,
} from "../../../../store/reducers/classReducer";
import {
  fetchDepartments,
  departmentSelector,
} from "../../../../store/reducers/departmentReducer";
import {
  batchSelector,
  fetchBatches,
} from "../../../../store/reducers/batchReducer";
import {
  fetchYears,
  yearSelector,
} from "../../../../store/reducers/yearReducer";
import {
  fetchAcademics,
  academicSelector,
} from "../../../../store/reducers/academicReducer";
import axios from "axios";
const OfficeSection = ({ inputValues, handleChange }) => {
  const officeDetails = inputValues.officeDetails;
  const [batch, setBatch] = useState([]);
  const [year, setYear] = useState([]);
  const [fromyear, setFromYear] = useState([]);
  const [department, setDepartment] = useState([]);
  const [classes, setClasses] = useState([]);
  const [quotaOptions, setQuotaOptions] = useState([]);
  const classesloading = useSelector(classSelector).classesloading;
  const departmentloading = useSelector(departmentSelector).departmentsloading;
  const batchloading = useSelector(batchSelector).batchloading;
  const yearloading = useSelector(yearSelector).yearloading;
  const academicloading = useSelector(academicSelector).academicloading;
  const classLoadData = useSelector(classSelector).loadData;
  const departmentLoadData = useSelector(departmentSelector).loadData;
  const batchLoadData = useSelector(batchSelector).loadData;
  const yearLoadData = useSelector(yearSelector).loadData;
  const academicLoadData = useSelector(academicSelector).loadData;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchClasses());
    dispatch(fetchBatches());
    dispatch(fetchYears());
    dispatch(fetchAcademics());
  }, []);
  

  useEffect(() => {
    axios.get("http://localhost:3002/api/quota")
      .then((response) => {
        setQuotaOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching quota options:", error);
      });
  }, []); 

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
    console.log(departmentloading, "departmentloadingg");
    if (departmentloading === API_STATUS.FULFILLED) {
      setDepartment(departmentLoadData);
    }
    if (departmentloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [departmentloading]);

  useEffect(() => {
    console.log(batchloading, "batchloading");
    if (batchloading === API_STATUS.FULFILLED) {
      setBatch(batchLoadData);
    }
    if (batchloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [batchloading]);

  useEffect(() => {
    console.log(yearloading, "yearloading");
    if (yearloading === API_STATUS.FULFILLED) {
      setYear(yearLoadData);
    }
    if (yearloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [yearloading]);

  useEffect(() => {
    console.log(academicloading, "academicloading");
    if (academicloading === API_STATUS.FULFILLED) {
      setFromYear(academicLoadData);
    }
    if (academicloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [academicloading]);

  return (
    <div className="mb-3">
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="d-flex gap-2 align-item-center">
            <label className="form-label">Instution</label>
            <h1 className="small-title fs-6 font-weight-bold">*</h1>
          </div>
          <select
            className="form-select"
            value={officeDetails.institution}
            onChange={handleChange}
            name="officeDetails.institution"
          >
            <option value="">--Select--</option>
            <option>Akshaya College of Engineering and Technology</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <div className="d-flex gap-2 align-item-center">
            <label className="form-label">Graduation</label>
            <h1 className="small-title fs-6 font-weight-bold">*</h1>
          </div>
          <select
            className="form-select"
            value={officeDetails.graduation}
            onChange={handleChange}
            name="officeDetails.graduation"
          >
            <option value="">--Select--</option>
            <option>UG</option>
            <option>PG</option>
            <option>Phd</option>
            <option>DOC</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <div className="d-flex gap-2 align-item-center">
            <label className="form-label">Programme Admitted for </label>
            <h1 className="small-title fs-6 font-weight-bold">*</h1>
          </div>
          <select
            className="form-select"
            value={officeDetails.programmeAdmittedFor}
            onChange={handleChange}
            name="officeDetails.programmeAdmittedFor"
          >
            <option value="">--Select--</option>
            {department.map((dept) => (
              <option key={dept._id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <div className="d-flex gap-2 align-item-center">
            <label className="form-label">Classes </label>
            <h1 className="small-title fs-6 font-weight-bold">*</h1>
          </div>
          <select
            className="form-select"
            value={officeDetails.classId}
            onChange={handleChange}
            name="officeDetails.classId"
          >
            <option value="">--Select--</option>
            {classes.map((classes) => (
              <option key={classes._id} value={classes._id}>
                {classes.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <div className="d-flex gap-2 align-item-center">
            <label className="form-label">Year</label>
            <h1 className="small-title fs-6 font-weight-bold">*</h1>
          </div>
          <select
            className="form-select"
            value={officeDetails.yearAdmitted}
            onChange={handleChange}
            name="officeDetails.yearAdmitted"
          >
            <option value="">--Select--</option>
            {year.map((yearItem) => (
              <option key={yearItem._id} value={yearItem.studentYear}>
                {yearItem.studentYear}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <div className="d-flex gap-2 align-item-center">
            <label className="form-label">Semester Type</label>
            <h1 className="small-title fs-6 font-weight-bold">*</h1>
          </div>
          <select
            className="form-select"
            value={officeDetails.semesterType}
            onChange={handleChange}
            name="officeDetails.semesterType"
          >
            <option value="">--Select--</option>
            <option>Odd</option>
            <option>Even</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <div className="d-flex gap-2 align-item-center">
            <label className="form-label">Semester</label>
            <h1 className="small-title fs-6 font-weight-bold">*</h1>
          </div>
          <select
            className="form-select"
            value={officeDetails.semester}
            onChange={handleChange}
            name="officeDetails.semester"
          >
            <option value="">--Select--</option>
            <option>I Semester</option>
            <option>II Semester</option>
            <option>III Semester</option>
            <option>IV Semester</option>
            <option>V Semester</option>
            <option>VI Semester</option>
            <option>VII Semester</option>
            <option>VIII Semester</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <div className="d-flex gap-2 align-item-center">
            <label className="form-label">Batch</label>
            <h1 className="small-title fs-6 font-weight-bold">*</h1>
          </div>
          <select
            className="form-select"
            value={officeDetails.batch}
            onChange={handleChange}
            name="officeDetails.batch"
          >
            <option value="">--Select--</option>
            {batch.map((batchItem) => (
              <option
                key={batchItem._id}
                value={`${batchItem.batchStart} - ${batchItem.batchEnd}`}
              >
                {batchItem.batchStart} - {batchItem.batchEnd}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <div className="d-flex gap-2 align-item-center">
            <label className="form-label">Joined Academic Year </label>
            <h1 className="small-title fs-6 font-weight-bold">*</h1>
          </div>
          <select
            className="form-select"
            value={officeDetails.joinedAcademicYear}
            onChange={handleChange}
            name="officeDetails.joinedAcademicYear"
          >
            <option value="">--Select--</option>
            {fromyear.map((academicItem) => (
              <option
                key={academicItem._id}
                value={`${academicItem.fromYear} - ${academicItem.toYear}`}
              >
                {academicItem.fromYear} - {academicItem.toYear}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <div className="d-flex gap-2 align-item-center">
            <label className="form-label">Current Academic Year </label>
            <h1 className="small-title fs-6 font-weight-bold">*</h1>
          </div>
          <select
            className="form-select"
            value={officeDetails.currentAcademicYear}
            onChange={handleChange}
            name="officeDetails.currentAcademicYear"
          >
            <option value="">--Select--</option>
            {fromyear.map((academicItem) => (
              <option
                key={academicItem._id}
                value={`${academicItem.fromYear} - ${academicItem.toYear}`}
              >
                {academicItem.fromYear} - {academicItem.toYear}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <div className="d-flex gap-2 align-item-center">
            <label className="form-label">Promotion Status</label>
            <h1 className="small-title fs-6 font-weight-bold">*</h1>
          </div>
          <select
            className="form-select"
            name="officeDetails.promotionStatus"
            value={officeDetails.promotionStatus}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Debarred">Debarred</option>
            <option value="Discontinued">Discontinued</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Admission Date/Date of Joining</label>
          <input
            type="date"
            className="form-control"
            name="officeDetails.admissionDate"
            value={officeDetails.admissionDate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Admitted In</label>
          <input
            type="text"
            className="form-control"
            placeholder="Admitted in"
            name="officeDetails.admittedIn"
            value={officeDetails.admittedIn}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Ancillary Subjects</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ancillary Subjects"
            name="officeDetails.ancillarySubjects"
            value={officeDetails.ancillarySubjects}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Remarks</label>
          <input
            type="text"
            className="form-control"
            placeholder="Remarks"
            name="officeDetails.remarks"
            value={officeDetails.remarks}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Medium of Instruction</label>
          <input
            type="text"
            className="form-control"
            placeholder="Medium"
            name="officeDetails.mediumOfInstruction"
            value={officeDetails.mediumOfInstruction}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Last Date Left In College</label>
          <input
            type="date"
            className="form-control"
            name="officeDetails.lastDateLeftInCollege"
            value={officeDetails.lastDateLeftInCollege}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Weather Paid all Fees Dues</label>
          <select
            className="form-select"
            name="officeDetails.feesDuesStatus"
            value={officeDetails.feesDuesStatus}
            onChange={handleChange}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Main and Allied Course</label>
          <input
            type="text"
            className="form-control"
            placeholder="Course Name"
            name="officeDetails.mainAndAlliedCourse"
            value={officeDetails.mainAndAlliedCourse}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Part 1 Language</label>
          <select
            className="form-select"
            name="officeDetails.part1Language"
            value={officeDetails.part1Language}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Part 4 Language</label>
          <select
            className="form-select"
            name="officeDetails.part4Language"
            value={officeDetails.part4Language}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Part 5 Language</label>
          <select
            className="form-select"
            name="officeDetails.part5Language"
            value={officeDetails.part5Language}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">NSS/NCC/Sports/Library</label>
          <select
            className="form-select"
            name="officeDetails.nssNccSportsLibrary"
            value={officeDetails.nssNccSportsLibrary}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Quota</label>
          <select
            className="form-select"
            name="officeDetails.quota"
            value={officeDetails.quota}
            onChange={handleChange}
          >
            <option selected>--select quota--</option>
            {quotaOptions.map((quotaName, index) => (
              <option key={index} value={quotaName}>
                {quotaName.quota}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Admission Status</label>
          <select
            className="form-select"
            name="officeDetails.admissionStatus"
            value={officeDetails.admissionStatus}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">No.of certificates Required</label>
          <input
            type="number"
            className="form-control"
            placeholder="No.of certificates"
            name="officeDetails.numberOfCertificatesRequired"
            value={officeDetails.numberOfCertificatesRequired}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">No.of certificates received</label>
          <input
            type="number"
            className="form-control"
            placeholder="No.of certificates received"
            name="officeDetails.numberOfCertificatesReceived"
            value={officeDetails.numberOfCertificatesReceived}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Certificate to be produce</label>
          <input
            type="number"
            className="form-control"
            placeholder="Certificate to be produce"
            name="officeDetails.certificatesToBeProduced"
            value={officeDetails.certificatesToBeProduced}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Verified by</label>
          <input
            type="text"
            className="form-control"
            placeholder="Verified by"
            name="officeDetails.verifiedBy"
            value={officeDetails.verifiedBy}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">University Register No</label>
          <input
            type="number"
            className="form-control"
            placeholder="Register No"
            name="officeDetails.universityRegisterNo"
            value={officeDetails.universityRegisterNo}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Roll No</label>
          <input
            type="text"
            className="form-control"
            placeholder="Roll No"
            name="officeDetails.rollNo"
            value={officeDetails.rollNo}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Last Date of attendance marked</label>
          <input
            type="date"
            className="form-control"
            name="officeDetails.lastDateOfAttendanceMarked"
            value={officeDetails.lastDateOfAttendanceMarked}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Attendance Percentage</label>
          <input
            type="text"
            placeholder="Percentage %"
            className="form-control"
            name="officeDetails.attendancePercentage"
            value={officeDetails.attendancePercentage}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Date of leaving</label>
          <input
            type="text"
            placeholder="date of leaving"
            className="form-control"
            name="officeDetails.dateOfLeaving"
            value={officeDetails.dateOfLeaving}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Mother Tongue</label>
          <input
            type="text"
            placeholder="Mother Tongue"
            className="form-control"
            name="officeDetails.motherTongue"
            value={officeDetails.motherTongue}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">TC Year/Dept</label>
          <input
            type="text"
            placeholder="TC Year/Dept"
            className="form-control"
            name="officeDetails.tcYearDept"
            value={officeDetails.tcYearDept}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">TC Status</label>
          <select
            className="form-select"
            name="officeDetails.tcStatus"
            value={officeDetails.tcStatus}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option>Active</option>
            <option>Deactive</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Father Occupation</label>
          <input
            type="text"
            placeholder="Father Occupation"
            className="form-control"
            name="officeDetails.fatherOccupation"
            value={officeDetails.fatherOccupation}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Father Annual Income</label>
          <input
            type="text"
            placeholder="Annual Income"
            className="form-control"
            name="officeDetails.fatherAnnualIncome"
            value={officeDetails.fatherAnnualIncome}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">TC Date (Issued On)</label>
          <input
            type="text"
            placeholder="00-00-0000"
            className="form-control"
            name="officeDetails.tcDateIssuedOn"
            value={officeDetails.tcDateIssuedOn}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Student Type</label>
          <select
            className="form-select"
            value={officeDetails.studentType}
            onChange={handleChange}
            name="officeDetails.studentType"
          >
            <option value="">--Select--</option>
            <option>Regular</option>
            <option>Non-Regular</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">No of apologies received</label>
          <input
            type="number"
            placeholder="No of apologies received"
            className="form-control"
            value={officeDetails.numberOfApologiesReceived}
            onChange={handleChange}
            name="officeDetails.numberOfApologiesReceived"
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Conduct & Character</label>
          <input
            type="text"
            placeholder="Conduct & Character"
            className="form-control"
            name="officeDetails.conductAndCharacter"
            value={officeDetails.conductAndCharacter}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Whether Laptop issued</label>
          <select
            className="form-select"
            name="officeDetails.laptopIssued"
            value={officeDetails.laptopIssued}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">If yes, Date</label>
          <input
            type="date"
            className="form-control"
            name="officeDetails.laptopIssuedDate"
            value={officeDetails.laptopIssuedDate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Class No</label>
          <input
            type="text"
            className="form-control"
            placeholder="class No"
            name="officeDetails.classNo"
            value={officeDetails.classNo}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Admission No</label>
          <input
            type="text"
            className="form-control"
            placeholder="Admission No"
            name="officeDetails.admissionNo"
            value={officeDetails.admissionNo}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Bus Route Number</label>
          <select
            className="form-select"
            name="officeDetails.busRouteNumber"
            value={officeDetails.busRouteNumber}
            onChange={handleChange}
          >
            <option value="">--Select Bus Route--</option>
            <option>Coimbatore</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Trip</label>
          <select
            className="form-select"
            name="officeDetails.trip"
            value={officeDetails.trip}
            onChange={handleChange}
          >
            <option value="">--Select trip--</option>
            <option>Round trip</option>
            <option>Single trip</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Upload Photo</label>
          <div className="filled">
            <div className="dropzone dropzone-filled" id="dropzoneFilled">
              <input
                type="file"
                className="form-control px-2"
                id="fileInput"
                name="officeDetails.photo"
                onChange={handleChange}
              />
              <label className="form-label" htmlFor="fileInput"></label>
            </div>
            <i data-acorn-icon="upload"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeSection;
