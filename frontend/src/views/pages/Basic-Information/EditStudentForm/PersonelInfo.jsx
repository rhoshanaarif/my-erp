import React from "react";

const PersonelInfo = ({ editedStudent, handleChange }) => {
  return (
    <div className="mb-3">
      <div>
        <section class="scroll-section" id="default">
          
          <div class="">
            <div class="">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <div class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <h2 class="small-title" style={{height:'unset'}}>Personel Details #1</h2>
                    </button>
                  </div>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">
                          Full Name (as in SSLC)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Student Name"
                          name="personalDetails.studentName"
                          value={
                            editedStudent.personalDetails.studentName || ""
                          }
                          onChange={(e) =>
                            handleChange("studentName", e.target.value)
                          }
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
                          value={editedStudent.personalDetails.fatherName || ""}
                          onChange={(e) =>
                            handleChange("fatherName", e.target.value)
                          }
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
                          value={editedStudent.personalDetails.motherName || ""}
                          onChange={(e) =>
                            handleChange("motherName", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Date of Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          value={editedStudent.personalDetails.dob || ""}
                          onChange={(e) => handleChange("dob", e.target.value)}
                          name="personalDetails.dob"
                          required
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Gender</label>
                        <select
                          className="form-select"
                          value={editedStudent.personalDetails.gender || ""}
                          onChange={(e) => handleChange("dob", e.target.value)}
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
                        <label className="form-label">
                          Mobile Number(Student)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          value={
                            editedStudent.personalDetails.contactNumber || ""
                          }
                          onChange={(e) => handleChange("dob", e.target.value)}
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
                          value={
                            editedStudent.personalDetails.fatherContactNumber
                          }
                          onChange={(e) =>
                            handleChange("fatherContactNumber", e.target.value)
                          }
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
                          value={
                            editedStudent.personalDetails.motherContactNumber
                          }
                          onChange={(e) =>
                            handleChange("motherContactNumber", e.target.value)
                          }
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
                          value={editedStudent.personalDetails.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          name="personalDetails.email"
                          placeholder="Mail ID"
                          required
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Blood Group</label>
                        <select
                          className="form-select"
                          value={editedStudent.personalDetails.bloodGroup}
                          onChange={(e) =>
                            handleChange("bloodGroup", e.target.value)
                          }
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
                          value={editedStudent.personalDetails.nationality}
                          onChange={(e) =>
                            handleChange("nationality", e.target.value)
                          }
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
                          value={editedStudent.personalDetails.religion}
                          onChange={(e) =>
                            handleChange("religion", e.target.value)
                          }
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
                          value={editedStudent.personalDetails.community}
                          onChange={(e) =>
                            handleChange("community", e.target.value)
                          }
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
                          value={editedStudent.personalDetails.caste}
                          onChange={(e) =>
                            handleChange("caste", e.target.value)
                          }
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
                          value={editedStudent.personalDetails.aadharNumber}
                          onChange={(e) =>
                            handleChange("aadharNumber", e.target.value)
                          }
                          name="personalDetails.aadharNumber"
                          required
                        />
                      </div>
                      <div className="d-flex justify-content-end mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary ms-1 "
                          style={{ width: "140px" }}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PersonelInfo;
