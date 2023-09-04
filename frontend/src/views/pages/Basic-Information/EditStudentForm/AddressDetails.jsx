import React, { useState } from "react";

const AddressDetails = ({ editedStudent, handleChange,handleCheckboxChange,sameAsPermanent }) => {
  return (
    <div className="mb-3">
      <h2 className="small-title">Permanent address of student</h2>
      <div className="row mb-1">
        <div className="col-md-4 mb-3">
          <label className="form-label">Door No./House Name</label>
          <input
            type="text"
            className="form-control"
            value={editedStudent.addressDetails.doorNo}
            onChange={(e) => handleChange("doorNo", e.target.value)}
            placeholder="Door No./House Name"
            name="addressDetails.doorNo"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Street </label>
          <input
            type="text"
            className="form-control"
            placeholder="Street"
            name="addressDetails.street"
            value={editedStudent.addressDetails.street}
            onChange={(e) => handleChange("street", e.target.value)}
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Postal City</label>
          <input
            type="text"
            className="form-control"
            placeholder="Postal City"
            value={editedStudent.addressDetails.postalCity}
            onChange={(e) => handleChange("postalCity", e.target.value)}
            name="addressDetails.postalCity"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Postal Code</label>
          <input
            type="number"
            className="form-control"
            placeholder="Postal Code"
            value={editedStudent.addressDetails.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            name="addressDetails.postalCode"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">District</label>
          <input
            type="text"
            className="form-control"
            value={editedStudent.addressDetails.district}
            onChange={(e) => handleChange("district", e.target.value)}
            name="addressDetails.district"
            placeholder="District"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            value={editedStudent.addressDetails.state}
            onChange={(e) => handleChange("state", e.target.value)}
            name="addressDetails.state"
            placeholder="State"
            required
          />
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <h2 className="small-title">Present Address</h2>
        <div className="d-flex gap-2 align-items-start">
          <input
            type="checkbox"
            className="form-check-input"
            checked={sameAsPermanent}
            onChange={handleCheckboxChange}
            required
          />
          <label className="form-label">Same as permanent address</label>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Door No./House Name</label>
          <input
            type="text"
            className="form-control"
            value={editedStudent.addressDetails.presentDoorNo}
            onChange={(e) => handleChange("presentDoorNo", e.target.value)}
            placeholder="Door No./House Name"
            name="addressDetails.presentDoorNo"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Street </label>
          <input
            type="text"
            className="form-control"
            placeholder="Street"
            name="addressDetails.presentStreet"
            value={editedStudent.addressDetails.presentStreet}
            onChange={(e) => handleChange("presentStreet", e.target.value)}
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Postal City</label>
          <input
            type="text"
            className="form-control"
            placeholder="Postal City"
            value={editedStudent.addressDetails.presentPostalCity}
            onChange={(e) => handleChange("presentPostalCity", e.target.value)}
            name="addressDetails.presentPostalCity"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Postal Code</label>
          <input
            type="number"
            className="form-control"
            placeholder="Postal Code"
            value={editedStudent.addressDetails.presentPostalCode}
            onChange={(e) => handleChange("presentPostalCode", e.target.value)}
            name="addressDetails.presentPostalCode"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">District</label>
          <input
            type="text"
            className="form-control"
            value={editedStudent.addressDetails.presentDistrict}
            onChange={(e) => handleChange("presentDistrict", e.target.value)}
            name="addressDetails.presentDistrict"
            placeholder="District"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            value={editedStudent.addressDetails.presentState}
            onChange={(e) => handleChange("presentState", e.target.value)}
            name="addressDetails.presentState"
            placeholder="State"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
