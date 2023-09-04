import React from "react";

const CommonDetails = ({ inputValues, handleChange }) => {
  return (
    <div className="mb-3">
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Are you married</label>
          <select
            className="form-select"
            value={inputValues.commonDetails.isMarried}
            onChange={handleChange}
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
            value={inputValues.commonDetails.spouseName}
            onChange={handleChange}
            name="commonDetails.spouseName"
            placeholder="Spouse Name"
            
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Are you a person with Disability</label>
          <select
            className="form-select"
            value={inputValues.commonDetails.isDisabled}
            onChange={handleChange}
            name="commonDetails.isDisabled"
            
          >
            <option value="">--Select--</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">If yes,Mention % of disability</label>
          <input
            type="text"
            className="form-control"
            value={inputValues.commonDetails.disabilityPercentage}
            onChange={handleChange}
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
            value={inputValues.commonDetails.isExServicemenChild}
            onChange={handleChange}
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
            value={inputValues.commonDetails.exServicemenType}
            onChange={handleChange}
            name="commonDetails.exServicemenType"
            placeholder="Ex-servicemen Type"
            
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Are you a sports person</label>
          <select
            className="form-select"
            value={inputValues.commonDetails.isSportsPerson}
            onChange={handleChange}
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
            value={inputValues.commonDetails.sportsName}
            onChange={handleChange}
            name="commonDetails.sportsName"
            placeholder="Sports Name"
            
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Sports Level</label>
          <input
            type="text"
            className="form-control"
            value={inputValues.commonDetails.sportsLevel}
            onChange={handleChange}
            name="commonDetails.sportsLevel"
            placeholder="Sports Level"
            
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Are you a RC Christian</label>
          <select
            className="form-select"
            value={inputValues.commonDetails.isRCChristian}
            onChange={handleChange}
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
            value={inputValues.commonDetails.parishName}
            onChange={handleChange}
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
            value={inputValues.commonDetails.eligibilityForQuota}
            onChange={handleChange}
            name="commonDetails.eligibilityForQuota"
            placeholder="Eligibility"
            
          />
        </div>
      </div>
    </div>
  );
};

export default CommonDetails;
