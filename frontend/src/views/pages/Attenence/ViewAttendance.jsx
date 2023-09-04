import React, { useState, useEffect } from 'react';
import { API_STATUS } from '../../../utils/constants';
import { useDispatch, useSelector } from "react-redux"
import { departmentSelector,  } from "../../../store/reducers/departmentReducer";
import { fetchClasses, classSelector } from '../../../store/reducers/classReducer';
import { fetchSubjects, subjectSelector } from '../../../store/reducers/subjectReducer';
import { fetchTimeTables, timetableSelector } from '../../../store/reducers/timetableReducer';
import { studentSelector,  fetchStudentsByClassAsync } from '../../../store/reducers/studentReducer';
import { fetchAttendanceByDateAsync, attendanceSelector, checkAttendanceMarkedAsync, createAttendanceAsync } from '../../../store/reducers/attendanceReducer';

import dayjs from 'dayjs';
import axios from 'axios';



const ViewAttendance = () => {
  const [classesList, setClassesList] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [students, setStudents] = useState([]);

  const [hoursList, setHoursList] = useState([]);
  const [selectedHour, setSelectedHour] = useState('');
  const [markAllPresent, setMarkAllPresent] = useState(false);
  const [markedHours, setMarkedHours] = useState([]);
  const [filteredHoursList, setFilteredHoursList] = useState([])
  const [studentAttendanceStatus, setStudentAttendanceStatus] = useState({});
 

  const departmentsloading = useSelector(departmentSelector).departmentsloading
  const classesloading = useSelector(classSelector).classesloading
  const subjectsloading = useSelector(subjectSelector).subjectsloading
  const timetablesloading = useSelector(timetableSelector).timetablesloading
  const updateclassloading = useSelector(classSelector).updateclassloading
  const deleteclassloading = useSelector(classSelector).deleteclassloading
  const assignstudentloading = useSelector(studentSelector).assignstudentloading;
  const studentsloading = useSelector(studentSelector).studentsloading;
  const removestudentloading = useSelector(studentSelector).removingstudentloading
  const fetchstudentsbyclassloading = useSelector(studentSelector).fetchingstudentsbyclassloading
  const fetchstudentbyclassloadData = useSelector(studentSelector).fetchstudentbyclassloadData
  const loadData = useSelector(studentSelector).loadData;
  const departmentLoadData = useSelector(departmentSelector).loadData;
  const classLoadData = useSelector(classSelector).loadData
  const subjectLoadData = useSelector(subjectSelector).loadData
  const timetableLoadData = useSelector(timetableSelector).loadData
  const addclassloading = useSelector(classSelector).addclassloading


  const attendanceloading = useSelector(attendanceSelector).attendanceloading
  const checkingattendanceloading = useSelector(attendanceSelector).checkingattendanceloading
  const createattendanceloading = useSelector(attendanceSelector).createattendanceloading
  const attendanceloadData = useSelector(attendanceSelector).loadData;
  const checkattendanceloadData = useSelector(attendanceSelector).checkattendanceloadData
  const dispatch = useDispatch();
  const [timetableData, setTimetableData] = useState([]);
  const [subjectsData, setSubjectsData] = useState([]);
  
  const [markedHourIds, setMarkedHourIds] = useState([]);
  const [showRegisterNo, setShowRegisterNo] = useState(false);
  const [showRegisterNoForAll, setShowRegisterNoForAll] = useState(false);
  const [attendanceData, setAttendanceData] = useState([])


  useEffect(() => {
    
    dispatch(fetchClasses())
    dispatch(fetchSubjects())
    dispatch(fetchTimeTables())
    
    
  }, [dispatch])
  console.log(students)

  useEffect(() => {
    console.log(classesloading, 'classesloading');
    if (classesloading === API_STATUS.FULFILLED) {
      setClassesList(classLoadData);
    }
    if (classesloading === API_STATUS.REJECTED) {
      console.log('data got failed');
    }
  }, [classesloading]);

  useEffect(() => {
    console.log(subjectsloading, 'subjectsloading');
    if (subjectsloading === API_STATUS.FULFILLED) {
      setSubjectsData(subjectLoadData)
    }
    if (subjectsloading === API_STATUS.REJECTED) {
      console.log('data got failed');
    }
  }, [subjectsloading]);

  useEffect(() => {
    console.log(timetablesloading, 'timetablesloading');
    if (timetablesloading === API_STATUS.FULFILLED) {
      setTimetableData(timetableLoadData)
    }
    if (timetablesloading === API_STATUS.REJECTED) {
      console.log('data got failed');
    }
  }, [timetablesloading]);



  useEffect(() => {
    console.log(fetchstudentsbyclassloading, 'fetchstudentsbyclassloading');
    if (fetchstudentsbyclassloading === API_STATUS.FULFILLED) {
      
      
     
      setStudents(fetchstudentbyclassloadData);
    }
    if (fetchstudentsbyclassloading === API_STATUS.REJECTED) {
      console.log('Hour data got failed');
    }
  }, [fetchstudentsbyclassloading]);

  const studentNameMap = {};
students.forEach((student) => {
  studentNameMap[student._id] = student.personalDetails.studentName;
});

  useEffect(() => {
    console.log(checkingattendanceloading, 'checkingattendanceloading');
    if (checkingattendanceloading === API_STATUS.FULFILLED) {
      console.log(checkattendanceloadData)
    }
    if (checkingattendanceloading === API_STATUS.REJECTED) {
      console.log('Hour data got failed');
    }
  }, [checkingattendanceloading]);

  useEffect(() => {
    console.log(createattendanceloading, 'createattendanceloading');
    if (createattendanceloading === API_STATUS.FULFILLED) {
     console.log('Attendance saved:', )
      
      setSelectedHour('');

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
      console.log('Hour data got failed');
    }
  }, [createattendanceloading]);

// Fetch filtered hours when the selected class or date changes
useEffect(() => {
  fetchFilteredHoursList();
}, [selectedClass, selectedDate]);

console.log(filteredHoursList)


 // Function to fetch students based on the selected class and date
const fetchStudents = () => {
  if (selectedClass) {
    const classId = String(selectedClass);
    console.log(classId)
    dispatch(fetchStudentsByClassAsync(classId))
    dispatch(fetchAttendanceByDateAsync(selectedDate))
  
  }


};

  useEffect(() => {  
    fetchStudents();
  }, [selectedClass, selectedDate]);

  // Function to handle checkbox toggle for individual students
  const handleStudentToggle = (studentId, statusType) => {
    setStudentAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [studentId]: statusType === prevStatus[studentId] ? 'present' : statusType,
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
  const selectedHourData = filteredHoursList.find((data) => data._id === hourId);

  if (selectedHourData) {
    setSelectedHour(selectedHour === hourId ? '' : hourId);
  }
};
// const handleOkClick = () => {
//   if (selectedHour) {
//     const selectedHourData = filteredHoursList.find((data) => data._id === selectedHour);

//     if (selectedHourData) {
//       const selectedHourStudents = students.map((student) => ({
//         studentId: student._id,
//         status: studentAttendanceStatus[student._id], // Make sure this is a string value
//       }));

//       const attendanceData = {
//         classId: selectedClass,
//         date: selectedDate,
//         hour: selectedHourData.hour,
//         subject: selectedHourData.subjectId,
//         session: selectedHourData.session,
//         students: selectedHourStudents,
//       };

     

//       // Clear the selection after saving attendance
//       setSelectedHour('');
//       setStudentAttendanceStatus({});

//       // Update the markedHours state
//       setMarkedHourIds((prevMarkedHourIds) => [...prevMarkedHourIds, selectedHourData._id]);

//       // Refetch filtered hours and student list
//       fetchFilteredHoursList();
//       fetchStudents();
//     }
//   }
// };

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
console.log(selectedTimetable)
  if (!selectedTimetable) {
    setFilteredHoursList([]);
    return;
  }

  const filteredHours = selectedTimetable.timetableData.filter(
    (data) => data.date === selectedDate
  );

  console.log(filteredHours)

  const promises = filteredHours.map(async (hour) => {
    const [isMarked, absentCountResponse] = await Promise.all([
      isHourMarkedForClassAndDate(hour.hour, selectedClass, selectedDate),
      getAbsentCountForHour(hour.hour, selectedClass, selectedDate),
    ]);

    return {
      ...hour,
      isMarked,
      absentCount: absentCountResponse.absentCount,
      attendance : absentCountResponse.attendance
      
    };
  });

  const markedHoursData = await Promise.all(promises);

  setFilteredHoursList(markedHoursData);
};
console.log(filteredHoursList)

const getAbsentCountForHour = async (hour, classId, date) => {
  try {
    const response = await fetch(`http://localhost:3002/api/attendance/${classId}/${date}/${hour}`);
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
 
  const classname = classesList.find((classname) => classname._id === classId);
  return classname ? classname.name : 'Unknown Class';
};

const getSubjectName = (subjectId) => {
  const subject = subjectsData.find((subject) => subject._id === subjectId);
  return subject ? subject.subjectName : 'Unknown Subject';
};


const isHourMarkedForClassAndDate = async ( hourId, classId, selectedDate) => {
  try {
    const response = await dispatch(checkAttendanceMarkedAsync({ hour: hourId, classId, date: selectedDate }));
    console.log("Response data:", response);
    return response.payload.data.isMarked; // Return the payload
  } catch (err) {
    console.error('Error checking attendance:', err);
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

console.log(selectedHour)

return (
    <div style={{ display: 'flex', marginLeft: "200px" }}>
      {/* First division - Display classes list with checkboxes */}
      <div style={{ marginRight: '20px' }}>
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
                    type="radio"
                    name="class"
                    value={classes._id}
                    checked={selectedClass === classes._id}
                    onChange={() => setSelectedClass(classes._id)}
                  />
                </td>
                <td>{classes.name}</td>
                <td>{classes.students.length} students</td>
                <td>{dayjs(classes.fromDate).format('DD-MM-YYYY')}</td>
                <td>{dayjs(classes.toDate).format('DD-MM-YYYY')}</td>
                <td>{classes.semester}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Second division - Display hours list and date */}
      <div style={{ marginRight: '20px' }}>
        {/* ... Display class name and selected date ... */}
        <input
          id="date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        {/* <table>
          <tbody>
            {timetableData && selectedDate && filteredHoursList.map((hour) => (
              <tr key={hour._id}>
                <td>{getSubjectName(hour.subjectId)}</td>
                <td>{hour.session}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedHour === hour._id}
                    onChange={() => handleHourToggle(hour._id)}
                    // disabled={hour.isMarked || markedHourIds.includes(hour._id)}
                  />
                </td>
                <td>{hour.absentCount}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>

      {/* Third division - Display students list with checkboxes */}
      <div>
        {/* ... Display class name ... */}
        <h3>Students List:</h3>
        <div>
          <button onClick={handleShowRegisterNoForAllToggle}>
            {showRegisterNoForAll ? "Show Roll No" : "Show Register No"}
          </button>
        </div>
        <table>
  <thead>
    
    {selectedClass  && filteredHoursList ? (
      <tr>
        <th>register number</th>
        <th>student Name</th>
        {filteredHoursList.map((hourData, index) => (
          <th key={index}> Hour{hourData.hour}</th>
        ))}
      </tr>
    ) : (
      <tr>
        <th colSpan={5}>Loading data...</th>
      </tr>
    )}
  </thead>
  <tbody>
  {selectedClass && filteredHoursList ? (
    students.map((student, studentIndex) => (
      <tr key={studentIndex}>
        <td>{student.officeDetails.universityRegisterNo}</td>
        <td>{studentNameMap[student._id]}</td>
        {filteredHoursList.map((hourData, index) => {
          const attendanceStudent = hourData.attendance && hourData.attendance.students
            ? hourData.attendance.students.find(
                (attStudent) => attStudent.studentId === student._id
              )
            : null;

          return (
            <td key={index}>
              {attendanceStudent ? (
                <p>
                  {attendanceStudent.status === "present"
                    ? "P"
                    : attendanceStudent.status === "absent"
                    ? "A"
                    : attendanceStudent.status === "onduty"
                    ? "O"
                    : "-"}
                </p>
              ) : (
                <p>-</p>
              )}
            </td>
          );
        })}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={2}>Loading data...</td>
    </tr>
  )}
</tbody>

        </table> 
        
      </div>
    </div>
  );
};


export default ViewAttendance;