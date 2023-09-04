import Header from "../../../layout/Mainlayout/Header/Header";
import Footer from "../../../layout/Mainlayout/Footer/Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import SkeletonComponent from "../Skeleton/AttenenceSkeleton";

const CreateTimeTable = () => {
  const [loading, setLoading] = useState(true); // New state variable for loading status

  const [calendarData, setCalendarData] = useState([]);
  const [dayOrderData, setDayOrderData] = useState([]);
  const [days, setDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);
  const [hours, setHours] = useState(["1", "2", "3", "4", "5"]);
  const [subjectNames, setSubjectNames] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [timetableCells, setTimetableCells] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [timetableData, setTimeTableData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [selectedTimetableId, setSelectedTimetableId] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [isEditModal, setIsEditModal] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showTimetableDetails, setShowTimetableDetails] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleShowClick = () => {
    if (selectedClass !== "" && selectedWeek !== "") {
      setShowContent(true);
    } else {
      setShowContent(false);
    }
    setShowTimetableDetails(false);
  };

  useEffect(() => {
    fetchCalendarData();
    fetchDayOrderData();
    fetchSubjectData();
    fetchTimeTableData();
    fetchSubjectData();
    fetchFacultyData();
    fetchClassData();
  }, []);

  useEffect(() => {
    if (selectedWeek) {
      setLoading(true); // Set loading to true before fetching data

      // Simulate loading for 4 seconds, then set loading to false
      setTimeout(() => {
        populateTimetable(selectedWeek);
        setLoading(false);
      }, 1000); // 4000 milliseconds = 4 seconds
    }
  }, [selectedWeek]);

  const fetchCalendarData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/calendar");
      setCalendarData(response.data);
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    }
  };

  const fetchTimeTableData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/timetable");
      setTimeTableData(response.data);
    } catch (error) {
      console.error("Error fetching time table data:", error);
    }
  };

  const handleTimetableSelect = (timetable) => {
    setSelectedTimetable(timetable);
    setShowContent(false);
    setShowTimetableDetails(true);
  };

  const fetchDayOrderData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/dayorder");
      setDayOrderData(response.data);
    } catch (error) {
      console.error("Error fetching dayOrder data:", error);
    }
  };

  const fetchSubjectData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/subject");
      const subjects = response.data;
      setSubjects(subjects);
    } catch (error) {
      console.error("Error fetching subject data:", error);
    }
  };
  console.log(subjects);

  const fetchFacultyData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/faculty");
      setFaculties(response.data);
    } catch (error) {
      console.error("Error fetching faculty data:", error);
    }
  };

  const fetchClassData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/class");
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  const populateTimetable = (selectedWeek) => {
    const [startDay, endDay] = selectedWeek.split(" - ");

    const startWeek = new Date(startDay);
    const endWeek = new Date(endDay);

    const startOfWeek = new Date(startWeek);
    while (startOfWeek.getDay() !== 1) {
      startOfWeek.setDate(startOfWeek.getDate() - 1);
    }

    const timetableCellsData = [];

    for (let i = 0; i < 6; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);
      const day = days[i]; // Get the day name

      const dayOrderDocument = calendarData.find((item) => {
        const date = new Date(item.date);
        return date.toDateString() === currentDay.toDateString();
      });

      const cellsForDay = [];

      if (dayOrderDocument && dayOrderData) {
        const dayOrder = dayOrderDocument.dayorder;
        const matchedDayOrderDocument = dayOrderData.find(
          (item) => item.dayorder === dayOrder
        );

        if (matchedDayOrderDocument && matchedDayOrderDocument.periods) {
          hours.forEach((hour) => {
            const period = matchedDayOrderDocument.periods.find(
              (p) => p.hour === hour
            );

            const cellData = {
              subject: "select subject",
              session: period ? period.session : "",
              startTime: period ? period.startTime : "",
              endTime: period ? period.endTime : "",
            };

            cellsForDay.push(cellData);
          });
        } else {
          hours.forEach((hour) => {
            cellsForDay.push(<div key={`${day}-${hour}`}></div>);
          });
        }

        timetableCellsData.push(cellsForDay);
      }

      setTimetableCells(timetableCellsData);
    }
  };

  const generateWeekOptions = () => {
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const weeks = [];

    let startOfWeek = new Date(startOfMonth);
    while (startOfWeek <= endOfMonth) {
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 5); // Assuming a 5-day work week
      const weekStartDate = startOfWeek.toISOString().slice(0, 10);
      const weekEndDate = endOfWeek.toISOString().slice(0, 10);
      const weekOption = `${weekStartDate} - ${weekEndDate}`;

      // Check if this week has already been saved for the selected classId
      const isWeekSavedForClass = timetableData.some((entry) => {
        return (
          entry.weekStartDate === weekStartDate &&
          entry.weekEndDate === weekEndDate &&
          entry.classId === selectedClass // Use the appropriate classId property
        );
      });

      if (!isWeekSavedForClass) {
        weeks.push(weekOption);
      }

      startOfWeek.setDate(startOfWeek.getDate() + 7);
    }

    return weeks;
  };

  const handleCellClick = (date, hour, period) => {
    setSelectedCell({ date, hour }); // Change 'day' to 'date'
    setSelectedPeriod(period); // Store the selected period
    setIsModalOpen(true);
    setIsEditModal(false);
  };

  const handleSubjectSelect = (
    subjectId,
    subjectName,
    session,
    startTime,
    endTime
  ) => {
    setIsModalOpen(false);

    if (selectedCell && subjectId) {
      const { date, hour } = selectedCell;
      const rowIndex = days.indexOf(date); // Adjust this according to your data structure
      const columnIndex = hours.indexOf(hour);

      const updatedRow = [...timetableCells[rowIndex]];
      updatedRow[columnIndex] = {
        ...updatedRow[columnIndex], // Keep existing cell data
        subjectId: subjectId,
        subject: subjectName,
        session: session,
        startTime: startTime,
        endTime: endTime,
      };

      const updatedTimetableCells = [...timetableCells];
      updatedTimetableCells[rowIndex] = updatedRow;

      setTimetableCells(updatedTimetableCells);
    }
  };
  const handleDeleteDialogOpen = (timetableId) => {
    setSelectedTimetableId(timetableId);
    setDeleteDialogOpen(true);
  };
  // console.log(timetableCells)

  const handleSave = async () => {
    const savedTimetableData = timetableCells.map((row, rowIndex) => {
      const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return row.map((cellData, columnIndex) => {
        const date = new Date(selectedWeek.split(" - ")[0]);
        date.setDate(date.getDate() + rowIndex);
        const day = dayNames[date.getDay()]; // Adjust the date based on the row index
        const hour = hours[columnIndex]; // Get the hour for the current column
        const date1 = date.toISOString();
        const datesplit = date1.slice(0, 10);
        return {
          date: datesplit,
          day: day,
          hour: hour,
          subjectId: cellData.subjectId,
          session: cellData.session,
          startTime: cellData.startTime,
          endTime: cellData.endTime,
        };
      });
    });
    console.log(savedTimetableData);

    try {
      const response = await axios.post("http://localhost:3002/api/timetable", {
        weekStartDate: selectedWeek.split(" - ")[0],
        weekEndDate: selectedWeek.split(" - ")[1],
        classId: selectedClass,
        timetableData: savedTimetableData.flat(),
      });
      // Show success toast
      toast.success("Table successfully saved!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });

      console.log(response.data.message);
      resetTimetableCells(); // Timetable entry created successfully
    } catch (error) {
      console.error("Error saving timetable data:", error);
    }
  };

  const renderTimetableList = () => {
    return (
      <section>
        <h2 className="small-title">Available Timetables</h2>
        <div className="card mb-3">
          <div className="card-body p-4">
            <h5 className="text-center">
              Select a timetable to view its details.
            </h5>
            <div>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-center ">Weekly Time Table</th>
                    <th className="text-center ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {timetableData.map((timetable) => (
                    <tr key={timetable._id} className="text-center">
                      <td>
                        <button
                          className="btn p-2 btn-primary"
                          onClick={() => handleTimetableSelect(timetable)}
                        >
                          {`${timetable.weekStartDate} - ${timetable.weekEndDate}`}
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary ms-1"
                          data-bs-toggle="modal"
                          data-bs-target="#staticPeriodDelete"
                          onClick={() => handleDeleteDialogOpen(timetable._id)}
                        >
                          <i data-acorn-icon="bin" data-acorn-size="15"></i>
                          <span class="d-none d-xxl-inline-block">Delete</span>
                        </button>{" "}
                        {/* Add this line */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Render the selected timetable's details
  const renderSelectedTimetable = () => {
    if (showTimetableDetails && selectedTimetable) {
      return (
        <div>
          <div className="d-flex justify-content-between align-item-center">
            <h2>Selected Timetable</h2>
            <div className="d-flex">
              <p className="mx-3 small-title">
                Week Start Date: {selectedTimetable.weekStartDate}
              </p>
              <p className=" small-title">
                Week End Date: {selectedTimetable.weekEndDate}
              </p>
            </div>
          </div>
          <div className="card  card-body ">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th className="text-center">Day / Time</th>
                  {hours.map((hour) => (
                    <th className="text-center " key={hour}>
                      {hour}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr className="selected-table" key={day}>
                    <td className="text-center ">{day}</td>
                    {hours.map((hour) => (
                      <td className="selected-td" key={`${day}-${hour}`}>
                        {selectedTimetable.timetableData.map((cellData) =>
                          cellData.day === day && cellData.hour === hour ? (
                            <div
                              className="cursor-pointer"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdropSubject"
                              onClick={() =>
                                handleCellClick2(day, hour, cellData)
                              }
                            >
                              <div key={`${day}-${hour}`}>
                                <div>
                                  Subject:{" "}
                                  {cellData.subjectId
                                    ? subjects.find(
                                        (subject) =>
                                          subject._id === cellData.subjectId
                                      )?.subjectName
                                    : ""}
                                </div>
                                <div>Session: {cellData.session}</div>
                                <div>Start time: {cellData.startTime}</div>
                                <div>End time: {cellData.endTime}</div>
                                <div>
                                  Faculty:{" "}
                                  {cellData.subjectId
                                    ? faculties.find((faculty) =>
                                        faculty.subjects.includes(
                                          cellData.subjectId
                                        )
                                      )?.facultyName
                                    : ""}
                                </div>
                              </div>
                            </div>
                          ) : null
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  };
  const timeTableList = () => {
    return (
      <>
        <div className="d-flex justify-content-between">
          <h2>Selected Timetable</h2>
          <button className="mb-2 btn btn-primary" onClick={handleSave}>
            Save Table
          </button>
        </div>
        <div className="card  card-body ">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Day / Time</th>
                {hours.map((hour) => (
                  <th key={hour}>{hour}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timetableCells.map((row, rowIndex) => (
                <tr className="selected-table" key={rowIndex}>
                  <td>{days[rowIndex]}</td>
                  {row.map((cellData, columnIndex) => (
                    <td
                      className="selected-td"
                      key={`${days[rowIndex]}-${hours[columnIndex]}`}
                    >
                      <div
                        className="cursor-pointer"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdropSubject"
                        onClick={() =>
                          handleCellClick(
                            days[rowIndex],
                            hours[columnIndex],
                            cellData
                          )
                        }
                      >
                        <div>Subject: {cellData.subject}</div>
                        <div>Session: {cellData.session}</div>
                        <div>Start time: {cellData.startTime}</div>
                        <div>End time: {cellData.endTime}</div>
                        <div>
                          Faculty:{" "}
                          {cellData.subjectId
                            ? faculties.find((faculty) =>
                                faculty.subjects.includes(cellData.subjectId)
                              )?.facultyName
                            : ""}
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };
  const handleCellClick2 = (day, hour, cellData) => {
    console.log(cellData);
    setSelectedCell({ day, hour });
    setSelectedSubject(cellData.subjectId); // Set the selected subject for editing
    setSelectedPeriod(cellData); // Set the selected period for editing
    setIsEditModal(true);
    setIsModalOpen(true); // Open the modal in edit mode
  };

  const handleEditSubjectInTimetable = async (day, hour) => {
    setIsModalOpen(false);
    const updatedTimetableData = selectedTimetable.timetableData.map((data) => {
      if (data.day === day && data.hour === hour) {
        return {
          ...data,
          subjectId: selectedSubject, // Update the subjectId
        };
      }
      return data;
    });

    const updatedTimetable = {
      ...selectedTimetable,
      timetableData: updatedTimetableData,
    };

    // Make an API call to update the timetable data in the database
    try {
      const response = await axios.put(
        `http://localhost:3002/api/timetable/${selectedTimetable._id}`,
        updatedTimetable
      );

      console.log(response.data.message);
      setSelectedTimetable(updatedTimetable);
    } catch (error) {
      console.error("Error updating timetable data:", error);
    }
  };

  const handleDeleteTimetable = async (timetableId) => {
    try {
      // Make an API call to delete the timetable entry from the backend
      const response = await axios.delete(
        `http://localhost:3002/api/timetable/${timetableId}`
      );
      console.log(response.data.message); // Log the deletion message

      // Update the local state to remove the deleted timetable entry
      const updatedTimetableData = timetableData.filter(
        (timetable) => timetable._id !== timetableId
      );
      setTimeTableData(updatedTimetableData);
    } catch (error) {
      console.error("Error deleting timetable:", error);
    }
  };
  const handleConfirmDelete = async () => {
    if (selectedTimetableId) {
      try {
        await handleDeleteTimetable(selectedTimetableId);
        setSelectedTimetableId(null);
        setDeleteDialogOpen(false);
      } catch (error) {
        console.error("Error deleting timetable:", error);
      }
    }
  };

  const resetTimetableCells = () => {
    const emptyTimetableCells = Array.from({ length: days.length }, () =>
      Array.from({ length: hours.length }, () => ({
        subject: "select subject",
        session: "",
        startTime: "",
        endTime: "",
      }))
    );
    setTimetableCells(emptyTimetableCells);
  };
  return (
    <div id="root">
      
      <main>
        <section className="scroll-section" id="title">
          <div className="page-title-container">
            <h1 className="mb-0 pb-0 display-4">Students Information System</h1>
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
        <div className="row">
          <section className="scroll-section col-12 col-md-4" id="basicSingle">
            <h2 className="small-title">Day Order Registration</h2>
            <div className="card mb-3">
              <div className="card-body p-4">
                <div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className=" mb-3 w-100">
                        <label className="form-label">Class</label>
                        <select
                          className="form-select select2Basic"
                          value={selectedClass}
                          onChange={(e) => setSelectedClass(e.target.value)}
                        >
                          <option selected>--Select a Class--</option>
                          {classes.map((classItem) => (
                            <option key={classItem._id} value={classItem._id}>
                              {classItem.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 w-100">
                        <label className="form-label">Select Week:</label>
                        <select
                          className="form-select select2Basic"
                          onChange={(e) => setSelectedWeek(e.target.value)}
                        >
                          <option selected>--Select a Week--</option>
                          {generateWeekOptions().map((weekOption) => (
                            <option key={weekOption} value={weekOption}>
                              {weekOption}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary" onClick={handleShowClick}>
                  Show
                </button>
              </div>
            </div>
            {/* Render the list of available timetables */}
            {loading ? (
              // Show skeleton loading component while loading
              <div>
                <Skeleton
                  style={{ marginBottom: "20px", borderRadius: 20 }}
                  variant="rectangular"
                  width="100%"
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  style={{ marginBottom: "20px", borderRadius: 20 }}
                  variant="rectangular"
                  width="100%"
                  height={200}
                  animation="wave"
                />
              </div>
            ) : (
              renderTimetableList()
            )}
          </section>
          <section className="scroll-section col-12 col-md-8" id="basicSingle">
            {/* Render the selected timetable's details */}
            {loading ? (
              // Show skeleton loading component while loading
              <div>
                <Skeleton
                  style={{ marginBottom: "20px", borderRadius: 20 }}
                  variant="rectangular"
                  width="100%"
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  style={{ marginBottom: "20px", borderRadius: 20 }}
                  variant="rectangular"
                  width="100%"
                  height={420}
                  animation="wave"
                />
              </div>
            ) : (
              renderSelectedTimetable()
            )}
            {showContent && selectedClass !== "" && selectedWeek !== "" && (
              <>
                {loading ? (
                  // Show skeleton loading component while loading
                  <Skeleton
                    style={{ marginBottom: "20px", borderRadius: 20 }}
                    variant="rectangular"
                    width="100%"
                    height={400}
                    animation="wave"
                  />
                ) : (
                  timeTableList()
                )}
              </>
            )}
          </section>
          <section className="scroll-section " id="staticBackdrop">
            <div className="card mb-3">
              <div>
                <div
                  className="modal fade"
                  id="staticBackdropSubject"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog " style={{ maxWidth: "500px" }}>
                    <div className="modal-content">
                      {isEditModal ? (
                        <>
                          <div className="px-4 py-3">
                            <div className="modal-header p-0">
                              <h5
                                className="modal-title"
                                id="staticBackdropLabel"
                              >
                                <h2>
                                  {isEditModal
                                    ? "Edit Subject"
                                    : "Select a Subject"}
                                </h2>
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                          </div>
                          <div className="mb-5 px-6 ">
                            <div>
                              <form>
                                <div>
                                  <div>
                                    <div className="mb-3 pb-5">
                                      <label className="form-label">
                                        Department
                                      </label>
                                      <select
                                        className="form-select select2Basic"
                                        value={selectedSubject}
                                        onChange={(e) =>
                                          setSelectedSubject(e.target.value)
                                        }
                                        placeholder="Student Name"
                                        required
                                      >
                                        <option value="">
                                          Select a Subject
                                        </option>
                                        {subjects.map((subject) => (
                                          <option
                                            key={subject._id}
                                            value={subject._id}
                                          >
                                            {subject.subjectName}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  className="btn btn-primary text-end mx-1"
                                  type="submit"
                                  data-bs-dismiss="modal"
                                  onClick={() =>
                                    handleEditSubjectInTimetable(
                                      selectedCell.day,
                                      selectedCell.hour
                                    )
                                  }
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-secondary text-end mx-1"
                                  data-bs-dismiss="modal"
                                >
                                  cancel
                                </button>
                              </form>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="px-6">
                            <div className="modal-header py-4 px-0">
                              <h5
                                className="modal-title"
                                id="staticBackdropLabel"
                              >
                                <h2>
                                  {isEditModal
                                    ? "Edit Subject"
                                    : "Select a Subject"}
                                </h2>
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>

                            <div className=" py-1">
                              <div className="mb-3">
                                <label className="form-label">Department</label>
                                <select
                                  className="form-select py-2 select2Basic"
                                  value={selectedSubject}
                                  onChange={(e) =>
                                    setSelectedSubject(e.target.value)
                                  }
                                  placeholder="Student Name"
                                  required
                                >
                                  <option value="">Select a Subject</option>
                                  {subjects.map((subject) => (
                                    <option
                                      key={subject._id}
                                      value={subject._id}
                                    >
                                      {subject.subjectName}
                                    </option>
                                  ))}
                                </select>
                                <div className="pt-6">
                                  <button
                                    className="btn btn-primary text-end mx-1"
                                    type="submit"
                                    data-bs-dismiss="modal"
                                    onClick={() =>
                                      handleSubjectSelect(
                                        selectedSubject,
                                        subjects.find(
                                          (subject) =>
                                            subject._id === selectedSubject
                                        ).subjectName,
                                        selectedPeriod.session,
                                        selectedPeriod.startTime,
                                        selectedPeriod.endTime
                                      )
                                    }
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    className="btn btn-secondary text-end mx-1"
                                    data-bs-dismiss="modal"
                                  >
                                    cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Delete Modal  students */}
          <section className="scroll-section " id="staticBackdrop">
            <div className="card-body">
              <div
                className="modal fade"
                id="staticPeriodDelete"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                role="dialog"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" style={{ maxWidth: "500px" }}>
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="staticBackdropLabel">
                        Delete Weekly Period
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Are you sure you want to delete this week order?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setDeleteDialogOpen(false)}
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirmDelete}
                        data-bs-dismiss="modal"
                        className="btn btn-primary"
                      >
                        Confirm Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
    </div>
  );
};

export default CreateTimeTable;
