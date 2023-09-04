import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonelInfo from "./StudentProgressForm/PersonelInfo";
import AddressDetails from "./StudentProgressForm/AddressDetails";
import CommonDetails from "./StudentProgressForm/CommonDetails";
import MarkDetails from "./StudentProgressForm/MarkDetails";
import OfficeSection from "./StudentProgressForm/OfficeSection";
import axios from "axios";
import moment from "moment";

function getSteps() {
  return [
    "Personal information",
    "Address Details",
    "Common Details",
    "Mark Details",
    "Office Section",
  ];
}

const StudentDetails = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sameAsPermanent, setSameAsPermanent] = useState(false);
  const [inputValues, setInputValues] = useState({
    personalDetails: {
      studentName: "",
      fatherName: "",
      motherName: "",
      dob: "",
      gender: "",
      contactNumber: "",
      fatherContactNumber: "",
      motherContactNumber: "",
      email: "",
      bloodGroup: "",
      nationality: "",
      religion: "",
      community: "",
      caste: "",
      aadharNumber: "",
    },
    //Address details
    addressDetails: {
      doorNo: "",
      street: "",
      postalCity: "",
      postalCode: "",
      district: "",
      state: "",
      presentDoorNo: "",
      presentStreet: "",
      presentPostalCity: "",
      presentPostalCode: "",
      presentDistrict: "",
      presentState: "",
    },
    //Common details
    commonDetails: {
      isMarried: "",
      spouseName: "",
      isDisabled: "",
      disabilityPercentage: "",
      isExServicemenChild: "",
      exServicemenType: "",
      isSportsPerson: "",
      sportsName: "",
      sportsLevel: "",
      isRCChristian: "",
      parishName: "",
      eligibilityForQuota: "",
    },
    //Mark details
    markDetails: {
      registerNo: "",
      instution: "",
      graduation: "",
      subjects: [
        {
          subjectName: "Language I",
          subjectCode: "",
          maxMark: "",
          minMark: "",
          scoredMark: "",
        },
        {
          subjectName: "Language II",
          subjectCode: "",
          maxMark: "",
          minMark: "",
          scoredMark: "",
        },
        {
          subjectName: "Physics",
          subjectCode: "",
          maxMark: "",
          minMark: "",
          scoredMark: "",
        },
        {
          subjectName: "Chemistry",
          subjectCode: "",
          maxMark: "",
          minMark: "",
          scoredMark: "",
        },
        {
          subjectName: "Mathematics",
          subjectCode: "",
          maxMark: "",
          minMark: "",
          scoredMark: "",
        },
        {
          subjectName: "Computer Science",
          subjectCode: "",
          maxMark: "",
          minMark: "",
          scoredMark: "",
        },
      ],
      totalMarks: "",
      percentage: "",
    },
    //Office details
    officeDetails: {
      institution: "",
      programmeAdmittedFor: "",
      yearAdmitted: "",
      semesterType: "",
      semester: "",
      batch: "",
      joinedAcademicYear: "",
      currentAcademicYear: "",
      admissionDate: "",
      admittedIn: "",
      ancillarySubjects: "",
      remarks: "",
      mediumOfInstruction: "",
      lastDateLeftInCollege: "",
      feesDuesStatus: "",
      mainAndAlliedCourse: "",
      part1Language: "",
      part4Language: "",
      part5Language: "",
      nssNccSportsLibrary: "",
      quota: "",
      admissionStatus: "",
      numberOfCertificatesRequired: "",
      numberOfCertificatesReceived: "",
      certificatesToBeProduced: "",
      verifiedBy: "",
      universityRegisterNo: "",
      rollNo: "",
      lastDateOfAttendanceMarked: "",
      attendancePercentage: "",
      dateOfLeaving: "",
      motherTongue: "",
      tcYearDept: "",
      promotionStatus: "",
      tcStatus: "",
      fatherOccupation: "",
      fatherAnnualIncome: "",
      tcDateIssuedOn: "",
      studentType: "",
      numberOfApologiesReceived: "",
      conductAndCharacter: "",
      laptopIssued: "",
      laptopIssuedDate: "",
      classNo: "",
      admissionNo: "",
      busRouteNumber: "",
      trip: "",
      photo: "",
    },
  });
  console.log(inputValues.personalDetails.studentName);
  const steps = getSteps();

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setSameAsPermanent(isChecked);
    console.log(sameAsPermanent);
    if (isChecked) {
      const permanentAddress = inputValues.addressDetails;
      // Update the present address fields based on the permanent address
      // (You should handle this logic based on your requirement)
      setInputValues((prevValues) => ({
        ...prevValues,
        addressDetails: {
          ...prevValues.addressDetails,
          presentDoorNo: permanentAddress.doorNo,
          presentStreet: permanentAddress.street,
          presentPostalCity: permanentAddress.postalCity,
          presentPostalCode: permanentAddress.postalCode,
          presentDistrict: permanentAddress.district,
          presentState: permanentAddress.state,
        },
      }));
    } else {
      // Reset the present address fields when checkbox is unchecked
      setInputValues((prevValues) => ({
        ...prevValues,
        addressDetails: {
          ...prevValues.addressDetails,
          presentDoorNo: "",
          presentStreet: "",
          presentPostalCity: "",
          presentPostalCode: "",
          presentDistrict: "",
          presentState: "",
        },
      }));
    }
  };

  const handleNext = () => {
    setCompletedSteps([...completedSteps, activeStep]);
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubjectChange = (e, index, field) => {
    const { name, value } = e.target;

    // Create a new array of subjects by deeply copying the original inputValues
    const updatedSubjects = [...inputValues.markDetails.subjects];

    // Update the specific field of the subject at the given index
    updatedSubjects[index][field] = value;

    // Create a new object for markDetails by copying and updating the subjects array
    const updatedMarkDetails = {
      ...inputValues.markDetails,
      subjects: updatedSubjects,
    };

    // Create a new object for inputValues by copying and updating the markDetails
    const updatedInputValues = {
      ...inputValues,
      markDetails: updatedMarkDetails,
    };

    setInputValues(updatedInputValues);
  };

  const handleChange = (e) => {
    console.log("handleChange in AddressDetails:");

    const { name, value } = e.target;

    // Split the name into parts based on the dot separator
    const nameParts = name.split(".");

    // Create a new object by deeply copying the original inputValues
    const updatedInputValues = { ...inputValues };

    // Traverse the nested structure to set the updated value
    let currentLevel = updatedInputValues;
    for (let i = 0; i < nameParts.length; i++) {
      const part = nameParts[i];
      if (i === nameParts.length - 1) {
        currentLevel[part] = value;
      } else {
        currentLevel = currentLevel[part];
      }
    } // Update the state with the modified object
    setInputValues(updatedInputValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Format the dates before submitting
      const formattedDob = moment(inputValues.personalDetails.dob).format(
        "DD-MM-YYYY"
      );
      const formattedAdmissionDate = moment(
        inputValues.officeDetails.admissionDate
      ).format("YYYY-MM-DD");
      const formattedLastDateLeftInCollege = moment(
        inputValues.officeDetails.lastDateLeftInCollege
      ).format("YYYY-MM-DD");
      const formattedTcDateIssuedOn = moment(
        inputValues.officeDetails.tcDateIssuedOn
      ).format("YYYY-MM-DD");

      // Create a copy of the inputValues object to update the formatted dates
      const updatedInputValues = {
        ...inputValues,
        personalDetails: {
          ...inputValues.personalDetails,
          dob: formattedDob,
        },
        officeDetails: {
          ...inputValues.officeDetails,
          admissionDate: formattedAdmissionDate,
          lastDateLeftInCollege: formattedLastDateLeftInCollege,
          tcDateIssuedOn: formattedTcDateIssuedOn,
        },
      };

      // Check if all required fields are filled
      const emptyFields = [];
      for (const field in updatedInputValues) {
        if (typeof updatedInputValues[field] === "object") {
          for (const subField in updatedInputValues[field]) {
            if (!updatedInputValues[field][subField]) {
              emptyFields.push(subField);
            }
          }
        } else {
          if (!updatedInputValues[field]) {
            emptyFields.push(field);
          }
        }
      }

      if (emptyFields.length > 0) {
        toast.error(`Please check  all the fields properly`, {
          autoClose: 500,
        });
        return; // Exit early if there are empty fields
      }

      // Make a POST request using Axios with the updatedInputValues
      const response = await axios.post(
        "http://localhost:3002/api/student",
        updatedInputValues
      );

      if (response.data.success) {
        setShowModal(true); // Show success modal
        toast.success("Registration successful!", { autoClose: 2000 }); // Show toast notification
        setTimeout(() => {
          window.location.reload(); // Reload the page after 3 seconds
        }, 2000);
      } else {
        // Handle error if needed
        console.error(
          "Server returned an unsuccessful response:",
          response.data.message
        );
        toast.error("Registration failed. Please try again.", {
          autoClose: 3000,
        }); // Show toast notification
      }
    } catch (error) {
      console.error("Error saving the details:", error);
      if (error.response) {
        console.log("Response:", error.response.data);
      }
      toast.error("An error occurred. Please try again.", { autoClose: 3000 }); // Show toast notification
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonelInfo inputValues={inputValues} handleChange={handleChange} />
        );
      case 1:
        return (
          <AddressDetails
            inputValues={inputValues}
            handleChange={handleChange}
            sameAsPermanent={sameAsPermanent}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      case 2:
        return (
          <CommonDetails
            inputValues={inputValues}
            handleChange={handleChange}
          />
        );
      case 3:
        return (
          <MarkDetails
            inputValues={inputValues}
            handleChange={handleChange}
            handleSubjectChange={handleSubjectChange}
          />
        );
      case 4:
        return (
          <OfficeSection
            inputValues={inputValues}
            handleChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div id="root">
      <main>
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
        <div>
          <ul className="nav position-relative nav-pills mb-3 justify-content-center">
            {steps.map((step, index) => (
              <>
                <div
                  style={{ fontWeight: 600 }}
                  key={index}
                  className="d-flex  flex-column align-items-center mx-6 gap-3"
                >
                  <li className="nav-item">
                    <div
                      className="rounded-circle bg-primary d-flex justify-content-center align-items-center"
                      style={{ height: "40px", width: "40px" }}
                    >
                      <a
                        className={` ${activeStep === index ? "active" : ""}`}
                        href="#"
                      >
                        {completedSteps.includes(index) ? (
                          <i
                            className="fas fa-check-circle mr-2 text-white"
                            style={{ fontSize: "35px", marginTop: "1px" }}
                          ></i>
                        ) : (
                          <span
                            className="mr-2 text-white"
                            style={{ fontSize: "16px" }}
                          >
                            {index + 1}
                          </span>
                        )}
                      </a>
                    </div>
                  </li>
                  {step}
                </div>
              </>
            ))}
            <div
              className="position-absolute"
              style={{
                width: "100%",
                background: "rgb(78 78 78 / 21%)",
                height: "2px",
                top: "25%",
                zIndex: "-1",
              }}
            ></div>
          </ul>

          <div className="container">
            <div className="row justify-content-center">
              <div className="card p-4" style={{ maxWidth: "1000px" }}>
                <form onSubmit={handleSubmit}>
                  {getStepContent(activeStep)}
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-secondary"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    {activeStep === steps.length - 1 ? (
                      <>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          data-bs-toggle=""
                          data-bs-target="#staticBackdropSuccess"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <div className="btn btn-primary" onClick={handleNext}>
                        Next
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDetails;
