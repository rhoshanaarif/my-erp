import React, { useState, useEffect } from 'react';
import { API_STATUS } from '../../../utils/constants';
import { useDispatch, useSelector } from "react-redux"
import { departmentSelector,  } from '../../../store/reducers/departmentReducer';
import { fetchClasses, classSelector } from '../../../store/reducers/classReducer';
import { fetchSubjects, subjectSelector } from '../../../store/reducers/subjectReducer';
import { fetchTimeTables, timetableSelector } from '../../../store/reducers/timetableReducer';
import { studentSelector,  fetchStudentsByClassAsync } from '../../../store/reducers/studentReducer';
import { fetchAttendanceByDateAsync, attendanceSelector, checkAttendanceMarkedAsync, createAttendanceAsync } from '../../../store/reducers/attendanceReducer';

import dayjs from 'dayjs';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  TextField,
} from '@mui/material';


const AttendanceComponent = () => {
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
  console.log(studentAttendanceStatus)

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
  useEffect(() => {
    
    dispatch(fetchClasses())
    dispatch(fetchSubjects())
    dispatch(fetchTimeTables())
    
    
  }, [dispatch])

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
      const attendanceStatusObj = {};
      fetchstudentbyclassloadData.forEach((student) => {
        attendanceStatusObj[student._id] = {
          present: false,
          absent: false,
          onduty: false,
        };
      });
      setStudentAttendanceStatus(attendanceStatusObj);
      setStudents(fetchstudentbyclassloadData);
    }
    if (fetchstudentsbyclassloading === API_STATUS.REJECTED) {
      console.log('Hour data got failed');
    }
  }, [fetchstudentsbyclassloading]);


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
const handleOkClick = () => {
  if (selectedHour) {
    const selectedHourData = filteredHoursList.find((data) => data._id === selectedHour);

    if (selectedHourData) {
      const selectedHourStudents = students.map((student) => ({
        studentId: student._id,
        status: studentAttendanceStatus[student._id], // Make sure this is a string value
      }));

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
      setSelectedHour('');
      setStudentAttendanceStatus({});

      // Update the markedHours state
      setMarkedHourIds((prevMarkedHourIds) => [...prevMarkedHourIds, selectedHourData._id]);

      // Refetch filtered hours and student list
      fetchFilteredHoursList();
      fetchStudents();
    }
  }
};


const fetchFilteredHoursList = async () => {
  if (selectedClass && selectedDate) {
    const selectedTimetable = timetableData.find(
      (week) =>
        selectedDate >= week.weekStartDate &&
        selectedDate <= week.weekEndDate &&
        selectedClass === week.classId
    );

    if (selectedTimetable) {
      const filteredHours = selectedTimetable.timetableData.filter(
        (data) => data.date === selectedDate
      );

      const markedHoursData = [];

      for (const hour of filteredHours) {
        const isMarked = await isHourMarkedForClassAndDate(
          hour.hour,
          selectedClass,
          selectedDate
        );

        const absentCountResponse = await getAbsentCountForHour(
          hour.hour,
          selectedClass,
          selectedDate
        );

        markedHoursData.push({
          ...hour,
          isMarked: isMarked,
          absentCount: absentCountResponse.absentCount
        });
      }

      setFilteredHoursList(markedHoursData);
    } else {
      setFilteredHoursList([]);
    }
  } else {
    setFilteredHoursList([]);
  }
};

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

  return (
    <div style={{ display: 'flex' }}>
      {/* First division - Display classes list with checkboxes */}
      <div style={{ marginRight: '20px' }}>
        <h3>Classes List:</h3>
     
           <Table>
           <TableHead>
             <TableRow>
               <TableCell>Select</TableCell>
               <TableCell>Class Name</TableCell>
               <TableCell>Number of Students</TableCell>
               <TableCell>From Date</TableCell>
               <TableCell>To Date</TableCell>
               <TableCell>Semester</TableCell>
              
             </TableRow>
           </TableHead>
           <TableBody>
             {classesList.map((classes) => (
               <TableRow key={classes._id}>
                 <TableCell>
                   <Checkbox
                    //  type="radio"
                     name="class"
                     value={classes._id}
                     checked={selectedClass === classes._id}
                     onChange={() => setSelectedClass(classes._id)}
                   />
                 </TableCell>
                 <TableCell>{classes.name}</TableCell>
                 <TableCell>{classes.students.length} students</TableCell>
                 <TableCell>{dayjs(classes.fromDate).format('DD-MM-YYYY')}</TableCell>
                 <TableCell>{dayjs(classes.toDate).format('DD-MM-YYYY')}</TableCell>
                 <TableCell>{classes.semester}</TableCell>
                 
               </TableRow>
             ))}
           </TableBody>
         </Table>
      
      </div>

      {/* Second division - Display hours list and date */}
      <div style={{ marginRight: '20px' }}>
        {selectedClass ? (<h3>Class: {getClassName(selectedClass)}</h3>): ''}
      <h3>Hours:</h3>
      <p>Today's Date: {dayjs(selectedDate).format('DD-MM-YYYY')}</p>
        <TextField
  id="date"
  label="Select Date"
  type="date"
  value={selectedDate} // Set the value prop to the selectedDate state
  onChange={(e) => setSelectedDate(e.target.value)}
  InputLabelProps={{
    shrink: true,
  }}
/>

<TableContainer component={Paper}>
  <Table>
    <TableBody>
      {timetableData && selectedDate && filteredHoursList.map((hour) => (
        <TableRow key={hour._id}>
          <TableCell>{getSubjectName(hour.subjectId)}</TableCell>
          <TableCell>{hour.session}</TableCell>
          <TableCell>
            <Checkbox
              checked={selectedHour === hour._id}
              onChange={() => handleHourToggle(hour._id)}
              disabled={hour.isMarked || markedHourIds.includes(hour._id)}
            />
          </TableCell>
          <TableCell>{hour.absentCount}</TableCell> {/* Display absent count */}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

    </div>




      {/* Third division - Display students list with checkboxes */}
      <div>
      {selectedClass ? (<h3>Class: {getClassName(selectedClass)}</h3>): ''}
        <h3>Students List:</h3>
        <div>
        <Button
          variant="outlined"
          size="small"
          onClick={handleShowRegisterNoForAllToggle}
        >
          {showRegisterNoForAll ? "Show Roll No" : "Show Register No"}
        </Button>
        {/* <Checkbox
            checked={markAllPresent}
            onChange={(e) => handleMarkAllToggle(e.target.checked)}
          />
          <label>Mark all present</label> */}
        </div>
        <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>
          {/* <Checkbox
            checked={markAllPresent}
            onChange={(e) => handleMarkAllToggle(e.target.checked)}
          />
          <label>Mark all present</label> */}
        </TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Present</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {students.map((student) => (
        <TableRow key={student._id}>
          
          <TableCell>
                    {showRegisterNoForAll
                      ? student.registerNo
                      : student.rollNo}
                  </TableCell>
          
          <TableCell>{student.studentName}</TableCell>
        
          <TableCell>
  <select
    value={studentAttendanceStatus[student._id]}
    onChange={(e) => handleStudentToggle(student._id, e.target.value)}
  >
     <option value="">select attendance</option>
    <option value="present">Present</option>
    <option value="absent">Absent</option>
    <option value="onduty">On Duty</option>
  </select>
</TableCell>

        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

        <Button variant="contained" onClick={handleOkClick}>OK</Button>
      </div>
    </div>
  );
};


export default AttendanceComponent;
