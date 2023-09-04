import React from "react";

const PersonelInfo = ({ inputValues, handleChange }) => {
  return (
    <div className="mb-3">
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Full Name (as in SSLC)</label>
          <input
            type="text"
            className="form-control"
            placeholder="Student Name"
            name="personalDetails.studentName"
            value={inputValues.personalDetails.studentName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Father Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Father's Name"
            name="personalDetails.fatherName"
            value={inputValues.personalDetails.fatherName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Mother Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Mother's Name"
            name="personalDetails.motherName"
            value={inputValues.personalDetails.motherName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            value={inputValues.personalDetails.dob}
            onChange={handleChange}
            name="personalDetails.dob"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            value={inputValues.personalDetails.gender}
            onChange={handleChange}
            name="personalDetails.gender"
            required
          >
            <option value="">--Select Gender--</option>
            <option>Male</option>
            <option>Female</option>
            <option>Transgender</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Mobile Number(Student)</label>
          <input
            type="number"
            className="form-control"
            value={inputValues.personalDetails.contactNumber}
            onChange={handleChange}
            name="personalDetails.contactNumber"
            placeholder="Number"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Father Contact No</label>
          <input
            type="number"
            className="form-control"
            value={inputValues.personalDetails.fatherContactNumber}
            onChange={handleChange}
            name="personalDetails.fatherContactNumber"
            placeholder="Number"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Mother Contact No</label>
          <input
            type="number"
            className="form-control"
            value={inputValues.personalDetails.motherContactNumber}
            onChange={handleChange}
            name="personalDetails.motherContactNumber"
            placeholder="Number"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">E-Mail ID</label>
          <input
            type="email"
            className="form-control"
            value={inputValues.personalDetails.email}
            onChange={handleChange}
            name="personalDetails.email"
            placeholder="Mail ID"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Blood Group</label>
          <select
            className="form-select"
            value={inputValues.personalDetails.bloodGroup}
            onChange={handleChange}
            name="personalDetails.bloodGroup"
            required
          >
            <option value="">--Select Group--</option>
            <option>O+</option>
            <option>O-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB-</option>
            <option>A+</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Nationality</label>
          <select
            className="form-select"
            value={inputValues.personalDetails.nationality}
            onChange={handleChange}
            name="personalDetails.nationality"
            required
          >
            <option value="">--Select Nationality--</option>
            <option>INDIAN</option>
            <option>OTHER</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Religion</label>
          <select
            className="form-select"
            value={inputValues.personalDetails.religion}
            onChange={handleChange}
            name="personalDetails.religion"
            required
          >
            <option value="">--Select Religion--</option>
            <option>Hindu</option>
            <option>Muslim</option>
            <option>Christian</option>
            <option>Sikh</option>
            <option>Buddhish</option>
            <option>Jain</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Community</label>
          <select
            className="form-select"
            value={inputValues.personalDetails.community}
            onChange={handleChange}
            name="personalDetails.community"
            required
          >
            <option value="">--Select Community--</option>
            <option>Scheduled classes</option>
            <option>Scheduled tribes</option>
            <option>Most Backward Classes</option>
            <option>Backward Classes</option>
            <option>Backward Classes Muslim</option>
            <option>denotified Communities</option>
            <option>General</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Caste</label>
          <input
            type="text"
            className="form-control"
            value={inputValues.personalDetails.caste}
            onChange={handleChange}
            name="personalDetails.caste"
            placeholder="caste"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Aadhar Number</label>
          <input
            type="number"
            className="form-control"
            placeholder="Aadhar Number"
            value={inputValues.personalDetails.aadharNumber}
            onChange={handleChange}
            name="personalDetails.aadharNumber"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PersonelInfo;
