import React from "react";

const CommonDetails = ({ editedStudent, handleChange }) => {
  return (
    <div className="mb-3">
      <div class="accordion-item">
        <div class="accordion-header" id="headingThree">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            <h2 class="small-title" style={{ height: "unset" }}>
              Common Details #2
            </h2>
          </button>
        </div>
        <div
          id="collapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Are you married</label>
                <select
                  className="form-select"
                  value={editedStudent.commonDetails.isMarried || ""}
                  onChange={(e) => handleChange("isMarried", e.target.value)}
                  name="commonDetails.isMarried"
                >
                  <option value="">--Select--</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">If yes,Spouse Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editedStudent.commonDetails.spouseName || ""}
                  onChange={(e) => handleChange("spouseName", e.target.value)}
                  name="commonDetails.spouseName"
                  placeholder="Spouse Name"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Are you a person with Disability
                </label>
                <select
                  className="form-select"
                  value={editedStudent.commonDetails.isDisabled || ""}
                  onChange={(e) => handleChange("isDisabled", e.target.value)}
                  name="commonDetails.isDisabled"
                >
                  <option value="">--Select--</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">
                  If yes,Mention % of disability
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={editedStudent.commonDetails.disabilityPercentage || ""}
                  onChange={(e) =>
                    handleChange("disabilityPercentage", e.target.value)
                  }
                  name="commonDetails.disabilityPercentage"
                  placeholder="Percentage"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Are you a son/daughter of ex-servicemen
                </label>
                <select
                  className="form-select"
                  value={editedStudent.commonDetails.isExServicemenChild || ""}
                  onChange={(e) =>
                    handleChange("isExServicemenChild", e.target.value)
                  }
                  name="commonDetails.isExServicemenChild"
                >
                  <option value="">--Select--</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">If yes,Ex-servicemen Type</label>
                <input
                  type="text"
                  className="form-control"
                  value={editedStudent.commonDetails.exServicemenType || ""}
                  onChange={(e) =>
                    handleChange("exServicemenType", e.target.value)
                  }
                  name="commonDetails.exServicemenType"
                  placeholder="Ex-servicemen Type"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Are you a sports person</label>
                <select
                  className="form-select"
                  value={editedStudent.commonDetails.isSportsPerson || ""}
                  onChange={(e) =>
                    handleChange("isSportsPerson", e.target.value)
                  }
                  name="commonDetails.isSportsPerson"
                >
                  <option value="">--Select--</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">If yes,Sports Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editedStudent.commonDetails.sportsName || ""}
                  onChange={(e) => handleChange("sportsName", e.target.value)}
                  name="commonDetails.sportsName"
                  placeholder="Sports Name"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Sports Level</label>
                <input
                  type="text"
                  className="form-control"
                  value={editedStudent.commonDetails.sportsLevel || ""}
                  onChange={(e) => handleChange("sportsLevel", e.target.value)}
                  name="commonDetails.sportsLevel"
                  placeholder="Sports Level"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Are you a RC Christian</label>
                <select
                  className="form-select"
                  value={editedStudent.commonDetails.isRCChristian || ""}
                  onChange={(e) =>
                    handleChange("isRCChristian", e.target.value)
                  }
                  name="commonDetails.isRCChristian"
                >
                  <option value="">--Select--</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">IF yes, Name of Parish</label>
                <input
                  type="text"
                  className="form-control"
                  value={editedStudent.commonDetails.parishName || ""}
                  onChange={(e) => handleChange("parishName", e.target.value)}
                  name="commonDetails.parishName"
                  placeholder="Church Name"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Any other Eligibility to avail quota
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={editedStudent.commonDetails.eligibilityForQuota || ""}
                  onChange={(e) =>
                    handleChange("eligibilityForQuota", e.target.value)
                  }
                  name="commonDetails.eligibilityForQuota"
                  placeholder="Eligibility"
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
  );
};

export default CommonDetails;
