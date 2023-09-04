import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonelInfo from "./PersonelInfo";
import CommonDetails from "./CommonDetails";
import AddressDetails from "./AddressDetails";

const EditStudentForm = ({ studentId, onClose }) => {
  const [studentData, setStudentData] = useState(null);
  const [editedStudent, setEditedStudent] = useState({});
  const [sameAsPermanent, setSameAsPermanent] = useState(false);
  useEffect(() => {
    fetchStudentData(studentId);
  }, [studentId]);

  const fetchStudentData = async (studentId) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/api/student/edit/${studentId}`
      );
      setStudentData(response.data);
      setEditedStudent(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setSameAsPermanent(isChecked);

    if (isChecked) {
      // Assuming you have the addressDetails.permanent fields in your API response
      const permanentAddress = studentData.addressDetails.permanent;

      // Update the present address fields based on the permanent address
      const updatedEditedStudent = {
        ...editedStudent,
        addressDetails: {
          ...editedStudent.addressDetails,
          presentDoorNo: permanentAddress.doorNo || "",
          presentStreet: permanentAddress.street || "",
          presentPostalCity: permanentAddress.postalCity || "",
          presentPostalCode: permanentAddress.postalCode || "",
          presentDistrict: permanentAddress.district || "",
          presentState: permanentAddress.state || "",
        },
      };
      setEditedStudent(updatedEditedStudent);
    } else {
      // Reset the present address fields when checkbox is unchecked
      const updatedEditedStudent = {
        ...editedStudent,
        addressDetails: {
          ...editedStudent.addressDetails,
          presentDoorNo: "",
          presentStreet: "",
          presentPostalCity: "",
          presentPostalCode: "",
          presentDistrict: "",
          presentState: "",
        },
      };
      setEditedStudent(updatedEditedStudent);
    }
  };
  const handleChange = (field, value) => {
    // Update the local state with the edited value immediately
    const updatedStudent = {
      ...editedStudent,
      personalDetails: {
        ...editedStudent.personalDetails,
        [field]: value,
      },
      commonDetails: {
        ...editedStudent.commonDetails,
        [field]: value,
      },
      addressDetails: {
        ...editedStudent.addressDetails,
        [field]: value,
      },
    };

    setEditedStudent(updatedStudent);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://localhost:3002/api/student/${studentId}`,
        editedStudent
      );
      // onClose();
    } catch (error) {
      console.error("Error updating student data:", error);
    }
  };

  if (!studentData) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <section className="scroll-section" id="title">
        <div className="page-title-container">
          <h1 className="mb-0 pb-0 display-4">Edit Student Details</h1>
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
      <section className="card-body card mb-5">
        <PersonelInfo
          editedStudent={editedStudent}
          handleChange={handleChange}
        />
        <CommonDetails
          editedStudent={editedStudent}
          handleChange={handleChange}
        />
        <AddressDetails
          handleCheckboxChange={handleCheckboxChange} // Pass the checkbox handler
          sameAsPermanent={sameAsPermanent}
          editedStudent={editedStudent}
          handleChange={handleChange}
        />
      </section>
    </form>
  );
};

export default EditStudentForm;
