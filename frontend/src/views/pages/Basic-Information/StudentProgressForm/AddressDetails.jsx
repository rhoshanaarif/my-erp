import React,{useState} from "react";

const AddressDetails = ({ inputValues, handleChange,handleCheckboxChange,sameAsPermanent }) => {
  return (
    <div className="mb-3">
      <h2 className="small-title">Permanent address of student</h2>
      <div className="row mb-1">
        <div className="col-md-4 mb-3">
          <label className="form-label">Door No./House Name</label>
          <input
            type="text"
            className="form-control"
            value={inputValues.addressDetails.doorNo}
            onChange={handleChange}
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
            value={inputValues.addressDetails.street}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Postal City</label>
          <input
            type="text"
            className="form-control"
            placeholder="Postal City"
            value={inputValues.addressDetails.postalCity}
            onChange={handleChange}
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
            value={inputValues.addressDetails.postalCode}
            onChange={handleChange}
            name="addressDetails.postalCode"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">District</label>
          <input
            type="text"
            className="form-control"
            value={inputValues.addressDetails.district}
            onChange={handleChange}
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
            value={inputValues.addressDetails.state}
            onChange={handleChange}
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
            value={inputValues.addressDetails.presentDoorNo}
            onChange={handleChange}
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
            value={inputValues.addressDetails.presentStreet}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Postal City</label>
          <input
            type="text"
            className="form-control"
            placeholder="Postal City"
            value={inputValues.addressDetails.presentPostalCity}
            onChange={handleChange}
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
            value={inputValues.addressDetails.presentPostalCode}
            onChange={handleChange}
            name="addressDetails.presentPostalCode"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">District</label>
          <input
            type="text"
            className="form-control"
            value={inputValues.addressDetails.presentDistrict}
            onChange={handleChange}
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
            value={inputValues.addressDetails.presentState}
            onChange={handleChange}
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
