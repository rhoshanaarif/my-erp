import React, { useState, useEffect } from "react";
import { API_STATUS } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { departmentSelector } from "../../../store/reducers/departmentReducer";
import {
  fetchClasses,
  classSelector,
} from "../../../store/reducers/classReducer";
import {
  fetchSubjects,
  subjectSelector,
} from "../../../store/reducers/subjectReducer";
import {
  fetchTimeTables,
  timetableSelector,
} from "../../../store/reducers/timetableReducer";
import {
  studentSelector,
  fetchStudentsByClassAsync,
} from "../../../store/reducers/studentReducer";
import {
  fetchAttendanceByDateAsync,
  attendanceSelector,
  checkAttendanceMarkedAsync,
  createAttendanceAsync,
} from "../../../store/reducers/attendanceReducer";
import dayjs from "dayjs";
import axios from "axios";



const AttendanceComponent = () => {
  const [classesList, setClassesList] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [students, setStudents] = useState([]);
  console.log(students)

  const [hoursList, setHoursList] = useState([]);
  const [selectedHour, setSelectedHour] = useState("");
  const [markAllPresent, setMarkAllPresent] = useState(false);
  const [markedHours, setMarkedHours] = useState([]);
  const [filteredHoursList, setFilteredHoursList] = useState([]);
  const [studentAttendanceStatus, setStudentAttendanceStatus] = useState({});
  const [choosenValue, setChoosenValue] = useState("")
  console.log(studentAttendanceStatus);
  console.log(choosenValue)
  const departmentsloading = useSelector(departmentSelector).departmentsloading;
  const classesloading = useSelector(classSelector).classesloading;
  const subjectsloading = useSelector(subjectSelector).subjectsloading;
  const timetablesloading = useSelector(timetableSelector).timetablesloading;
  const updateclassloading = useSelector(classSelector).updateclassloading;
  const deleteclassloading = useSelector(classSelector).deleteclassloading;
  const assignstudentloading =
    useSelector(studentSelector).assignstudentloading;
  const studentsloading = useSelector(studentSelector).studentsloading;
  const removestudentloading =
    useSelector(studentSelector).removingstudentloading;
  const fetchstudentsbyclassloading =
    useSelector(studentSelector).fetchingstudentsbyclassloading;
  const fetchstudentbyclassloadData =
    useSelector(studentSelector).fetchstudentbyclassloadData;
  const loadData = useSelector(studentSelector).loadData;
  const departmentLoadData = useSelector(departmentSelector).loadData;
  const classLoadData = useSelector(classSelector).loadData;
  const subjectLoadData = useSelector(subjectSelector).loadData;
  const timetableLoadData = useSelector(timetableSelector).loadData;
  const addclassloading = useSelector(classSelector).addclassloading;

  const attendanceloading = useSelector(attendanceSelector).attendanceloading;
  const checkingattendanceloading =
    useSelector(attendanceSelector).checkingattendanceloading;
  const createattendanceloading =
    useSelector(attendanceSelector).createattendanceloading;
  const attendanceloadData = useSelector(attendanceSelector).loadData;
  const checkattendanceloadData =
    useSelector(attendanceSelector).checkattendanceloadData;
  const dispatch = useDispatch();
  const [timetableData, setTimetableData] = useState([]);
  const [subjectsData, setSubjectsData] = useState([]);

  const [markedHourIds, setMarkedHourIds] = useState([]);
  const [showRegisterNo, setShowRegisterNo] = useState(false);
  const [showRegisterNoForAll, setShowRegisterNoForAll] = useState(false);
  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchSubjects());
    dispatch(fetchTimeTables());
  }, [dispatch]);

  useEffect(() => {
    console.log(classesloading, "classesloading");
    if (classesloading === API_STATUS.FULFILLED) {
      setClassesList(classLoadData);
    }
    if (classesloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [classesloading]);

  useEffect(() => {
    console.log(subjectsloading, "subjectsloading");
    if (subjectsloading === API_STATUS.FULFILLED) {
      setSubjectsData(subjectLoadData);
    }
    if (subjectsloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [subjectsloading]);

  useEffect(() => {
    console.log(timetablesloading, "timetablesloading");
    if (timetablesloading === API_STATUS.FULFILLED) {
      setTimetableData(timetableLoadData);
    }
    if (timetablesloading === API_STATUS.REJECTED) {
      console.log("data got failed");
    }
  }, [timetablesloading]);

  useEffect(() => {
    console.log(fetchstudentsbyclassloading, "fetchstudentsbyclassloading");
    if (fetchstudentsbyclassloading === API_STATUS.FULFILLED) {
      const attendanceStatusObj = {};
      fetchstudentbyclassloadData.forEach((student) => {
        attendanceStatusObj[student._id] = "present"
      });
      setStudentAttendanceStatus(attendanceStatusObj);
      setStudents(fetchstudentbyclassloadData);
    }
    if (fetchstudentsbyclassloading === API_STATUS.REJECTED) {
      console.log("Hour data got failed");
    }
  }, [fetchstudentsbyclassloading]);
  console.log(studentAttendanceStatus)

  useEffect(() => {
    console.log(checkingattendanceloading, "checkingattendanceloading");
    if (checkingattendanceloading === API_STATUS.FULFILLED) {
      console.log(checkattendanceloadData);
    }
    if (checkingattendanceloading === API_STATUS.REJECTED) {
      console.log("Hour data got failed");
    }
  }, [checkingattendanceloading]);

  useEffect(() => {
    console.log(createattendanceloading, "createattendanceloading");
    if (createattendanceloading === API_STATUS.FULFILLED) {
      console.log("Attendance saved:");

      setSelectedHour("");

      // Clear the selected students (uncheck all checkboxes)
      setStudentAttendanceStatus((prevStatus) => {
        const updatedStatus = { ...prevStatus };
        Object.keys(updatedStatus).forEach((studentId) => {
          updatedStatus[studentId] = false; // Uncheck all students
        });
        return updatedStatus;
      });
    }
    if (createattendanceloading === API_STATUS.REJECTED) {
      console.log("Hour data got failed");
    }
  }, [createattendanceloading]);

  // Fetch filtered hours when the selected class or date changes
  useEffect(() => {
    fetchFilteredHoursList();
  }, [selectedClass, selectedDate]);

  // Function to fetch students based on the selected class and date
  const fetchStudents = () => {
    if (selectedClass) {
      const classId = String(selectedClass);
      console.log(classId);
      dispatch(fetchStudentsByClassAsync(classId));
      dispatch(fetchAttendanceByDateAsync(selectedDate));
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [selectedClass, selectedDate]);

  // Function to handle checkbox toggle for individual students
  const handleStudentToggle = (studentId, statusType) => {
    setStudentAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [studentId]:
        statusType === prevStatus[studentId] ? "present" : statusType,
    }));
  };

  // Function to handle checkbox toggle for "Mark all present"
  // const handleMarkAllToggle = (isChecked) => {
  //   setMarkAllPresent(isChecked);
  //   setStudentPresentStatus((prevStatus) => {
  //     const updatedStatus = {};
  //     Object.keys(prevStatus).forEach((studentId) => {
  //       updatedStatus[studentId] = isChecked;
  //     });
  //     return updatedStatus;
  //   });
  // };

  const handleHourToggle = (hourId) => {
    const selectedHourData = filteredHoursList.find(
      (data) => data._id === hourId
    );

    if (selectedHourData) {
      setSelectedHour(selectedHour === hourId ? "" : hourId);
    }
  };

  const getStatusFromAttendanceStatus = (attendanceStatus) => {
    if (attendanceStatus.present) {
      return 'present';
  };
  }
  const handleOkClick = () => {
    if (selectedHour) {
      const selectedHourData = filteredHoursList.find(
        (data) => data._id === selectedHour
      );
  
      if (selectedHourData) {
        const selectedHourStudents = students.map((student) => ({
          studentId: student._id,
          status: studentAttendanceStatus[student._id], // Make sure this is a string value
        }));

        console.log(selectedHourStudents)
        
  
        const attendanceData = {
          classId: selectedClass,
          date: selectedDate,
          hour: selectedHourData.hour,
          subject: selectedHourData.subjectId,
          session: selectedHourData.session,
          students: selectedHourStudents,
        };
  
        dispatch(createAttendanceAsync(attendanceData));
  
        // Clear the selection after saving attendance
        setSelectedHour("");
        setStudentAttendanceStatus({});
  
        // Update the markedHours state
        setMarkedHourIds((prevMarkedHourIds) => [
          ...prevMarkedHourIds,
          selectedHourData._id,
        ]);
  
        // Refetch filtered hours and student list
        fetchFilteredHoursList();
        fetchStudents();
      }
    }
  };
  

  const fetchFilteredHoursList = async () => {
    if (!selectedClass || !selectedDate) {
      setFilteredHoursList([]);
      return;
    }
  
    const selectedTimetable = timetableData.find(
      (week) =>
        selectedDate >= week.weekStartDate &&
        selectedDate <= week.weekEndDate &&
        selectedClass === week.classId
    );
  
    if (!selectedTimetable) {
      setFilteredHoursList([]);
      return;
    }
  
    const filteredHours = selectedTimetable.timetableData.filter(
      (data) => data.date === selectedDate
    );
  
    const promises = filteredHours.map(async (hour) => {
      const [isMarked, absentCountResponse] = await Promise.all([
        isHourMarkedForClassAndDate(hour.hour, selectedClass, selectedDate),
        getAbsentCountForHour(hour.hour, selectedClass, selectedDate),
      ]);
  
      return {
        ...hour,
        isMarked,
        absentCount: absentCountResponse.absentCount,
      };
    });
  
    const markedHoursData = await Promise.all(promises);
  
    setFilteredHoursList(markedHoursData);
  };
  

  const getAbsentCountForHour = async (hour, classId, date) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/attendance/${classId}/${date}/${hour}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return { absentCount: 0 }; // You can handle error cases accordingly
    }
  };

  useEffect(() => {
    // Clear the filteredHoursList when selectedClass changes
    setFilteredHoursList([]);
    fetchFilteredHoursList();
  }, [selectedClass, selectedDate]);

  const getClassName = (classId) => {
    const classname = classesList.find(
      (classname) => classname._id === classId
    );
    return classname ? classname.name : "Unknown Class";
  };

  const getSubjectName = (subjectId) => {
    const subject = subjectsData.find((subject) => subject._id === subjectId);
    return subject ? subject.subjectName : "Unknown Subject";
  };

  const isHourMarkedForClassAndDate = async (hourId, classId, selectedDate) => {
    try {
      const response = await dispatch(
        checkAttendanceMarkedAsync({
          hour: hourId,
          classId,
          date: selectedDate,
        })
      );
      console.log("Response data:", response);
      return response.payload.data.isMarked; // Return the payload
    } catch (err) {
      console.error("Error checking attendance:", err);
      return false;
    }
  };

  const handleRegNoToggle = (studentId) => {
    // Toggle the showRegisterNo state for the specific student
    setShowRegisterNo((prevShowRegisterNo) => ({
      ...prevShowRegisterNo,
      [studentId]: !prevShowRegisterNo[studentId],
    }));
  };

  const handleShowRegisterNoForAllToggle = () => {
    setShowRegisterNoForAll((prevValue) => !prevValue);
  };

  return (
    <div className="container"  style={{marginTop:'100px'}}>
    <div className="row">
      {/* First division - Display classes list with checkboxes */}
      <div className="col-md-4">
        <h3>Classes List:</h3>

        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Class Name</th>
              <th>Number of Students</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Semester</th>
            </tr>
          </thead>

          <tbody>
            {classesList.map((classes) => (
              <tr key={classes._id}>
                <td>
                  <input
                  class="form-check-input"
                    type="radio"
                    name="class"
                    value={classes._id}
                    checked={selectedClass === classes._id}
                    onChange={() => setSelectedClass(classes._id)}
                  />
                
                </td>
                <td>{classes.name}</td>
                <td>{classes.students.length} students</td>
                <td>{dayjs(classes.fromDate).format("DD-MM-YYYY")}</td>
                <td>{dayjs(classes.toDate).format("DD-MM-YYYY")}</td>
                <td>{classes.semester}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Second division - Display hours list and date */}
      <div className="col-md-4">
        {selectedClass ? <h3>Class: {getClassName(selectedClass)}</h3> : ""}

        <h3>Hours:</h3>
        <p>Today's Date: {dayjs(selectedDate).format("DD-MM-YYYY")}</p>
        <input
          type="date"
          className="form-control mb-3"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

       
          <table>
            <thead>
              <tr>
                <td>
                
                </td>
                <td>Subject</td>
                <td>Session</td>
                <td>Absent count</td>
              </tr>
            </thead>
            <tbody>
              {timetableData &&
                selectedDate &&
                filteredHoursList.map((hour) => (
                  <tr key={hour._id}>
                    <td>
                      <input
                      type="checkbox"
                      className="form-control"
                        checked={selectedHour === hour._id}
                        onChange={() => handleHourToggle(hour._id)}
                        disabled={
                          hour.isMarked || markedHourIds.includes(hour._id)
                        }
                      />
                    </td>
                    <td>{getSubjectName(hour.subjectId)}</td>
                    <td>{hour.session}</td>
                    
                    <td>{hour.absentCount}</td>{" "}
                    {/* Display absent count */}
                  </tr>
                ))}
            </tbody>
          </table>
        
      </div>

{/* Third division - Display students list with checkboxes */}
<div className="col-md-4">
  {selectedClass ? <h3>Class: {getClassName(selectedClass)}</h3> : ""}
  <h3>Students List:</h3>
  <div>
    <button
      className="btn btn-outline-secondary btn-sm"
      onClick={handleShowRegisterNoForAllToggle}
    >
      {showRegisterNoForAll ? "Show Roll No" : "Show Register No"}
    </button>
    <select
      className="form-control mb-3"
      value=""
      onChange={(e) => {
        setChoosenValue(e.target.value)
      }}
    >
      <option value="present">Select attendance</option>
      <option value="absent">Absent</option>
      <option value="onduty">On Duty</option>
    </select>
  </div>

  <table className="table">
    <thead>
      <tr>
        <td></td>
        {showRegisterNoForAll ? <td>RegisterNumber</td> : <td>Roll No</td>}
        <td>Name</td>
        
      </tr>
    </thead>
    {filteredHoursList ? (
      <tbody>
        {students.map((student) => (
          <tr key={student._id}>
            <td>
              <input
                type="checkbox"
                checked={studentAttendanceStatus[student._id] === choosenValue}
                onChange={() => {
                  setStudentAttendanceStatus((prevStatus) => ({
                    ...prevStatus,
                    [student._id]:
                      studentAttendanceStatus[student._id] === choosenValue
                        ? "present"
                        : choosenValue
                  }));
                }}
              />
            </td>
            <td>
              {showRegisterNoForAll
                ? student.officeDetails.universityRegisterNo
                : student.officeDetails.rollNo}
            </td>
            <td>{student.personalDetails.studentName}</td>
           
          </tr>
        ))}
      </tbody>
    ) : (
      ""
    )}
  </table>

  <button className="btn btn-primary" onClick={handleOkClick}>
    Save Attendance
  </button>
</div>

    </div>
    </div>
  );
};

export default AttendanceComponent;