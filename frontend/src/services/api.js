import {Http} from './Http'
import { getBaseEndpointUrl } from './config';



//Students
export const getStudentList =  () => {
  const baseURL = getBaseEndpointUrl();
  return Http.get(baseURL + '/api/student' )
};

export const updateStudent =  (studentId, studentData) => {
  console.log(studentData)
  const baseURL = getBaseEndpointUrl();
  return Http.put(`${baseURL}/api/student/${studentId}`, studentData);
};

export const deleteStudent =  (studentId) => {
  const baseURL = getBaseEndpointUrl();
  return Http.delete(`${baseURL}/api/student/${studentId}`);
};

export const addStudent =  (studentData) => {
  const baseURL = getBaseEndpointUrl();
  return Http.post(`${baseURL}/api/student/`, studentData);
};



export const removeStudentFromClass =  (studentId, classId) => {
  const baseURL = getBaseEndpointUrl();
  return Http.put(`${baseURL}/api/student/remove/${studentId}/${classId}`);
    
};

export const fetchStudentsByClass =  (selectedClass) => {
  const baseURL = getBaseEndpointUrl();
  return Http.get(`${baseURL}/api/student/${selectedClass}`);
    
 
};
//Faculties
export const getFacultyList =  () => {
  const baseURL = getBaseEndpointUrl();
  return Http.get(baseURL + '/api/faculty' )
};

export const updateFaculty =  (facultyId, facultyData) => {
  console.log(facultyData)
  const baseURL = getBaseEndpointUrl();
  return Http.put(`${baseURL}/api/faculty/${facultyId}`, facultyData);
};

export const deleteFaculty =  (facultyId) => {
  const baseURL = getBaseEndpointUrl();
  return Http.delete(`${baseURL}/api/faculty/${facultyId}`);
};

export const addFaculty =  (facultyData) => {
  const baseURL = getBaseEndpointUrl();
  return Http.post(`${baseURL}/api/faculty/`, facultyData);
};


//Department
export const getDepartments = () => {
  const baseURL = getBaseEndpointUrl();
  return Http.get(`${baseURL}/api/department`);
};

export const addDepartment = (department) => {
  const baseURL = getBaseEndpointUrl();
  return Http.post(`${baseURL}/api/department`, department); // Replace 'route-path' with your actual route
    
};

export const deleteDepartment =  (departmentId) => {
  const baseURL = getBaseEndpointUrl();
  return Http.delete(`${baseURL}/api/department/${departmentId}`); // Replace 'route-path' with your actual route and classId with the ID you want to delete
};

export const updateDepartment = (_id, name) => {
  const baseURL = getBaseEndpointUrl();
    return Http.put(`${baseURL}/api/department/name/${_id}`, name); // Replace 'route-path' with your actual route and _id with the class ID   
};

export const updateDepartmentClasses =  ( deptId, classes ) => {
  const baseURL = getBaseEndpointUrl();
 return Http.put(`${baseURL}/api/department/classes/${deptId}`,  classes );

 
};
//Hour

// Fetch the list of hours
export const getHourList = () => {
  const baseURL = getBaseEndpointUrl();
   return Http.get(`${baseURL}/api/hour`);
};

export const submitHour = (hourData) => {
  const baseURL = getBaseEndpointUrl();
   return Http.post(`${baseURL}/api/hour`, hourData);
};

// Update an hour
export const updateHour =(hourId, hourData) => {
  const baseURL = getBaseEndpointUrl();
  return Http.put(`${baseURL}/api/hour/${hourId}`, hourData);     
};

// Delete an hour
export const deleteHour = (hourId) => {
  const baseURL = getBaseEndpointUrl();
  return Http.delete(`${baseURL}/api/hour/${hourId}`); 
};

// Class

export const getClasses = () => {
  const baseURL = getBaseEndpointUrl();
  return Http.get(`${baseURL}/api/class`);
};

export const addClass = (classData) => {
  const baseURL = getBaseEndpointUrl();
  return Http.post(`${baseURL}/api/class`, classData); // Replace 'route-path' with your actual route
    
};

export const deleteClass =  (classId) => {
  const baseURL = getBaseEndpointUrl();
  return Http.delete(`${baseURL}/api/class/${classId}`); // Replace 'route-path' with your actual route and classId with the ID you want to delete
};

export const updateClass = (_id, classData) => {
  const baseURL = getBaseEndpointUrl();
    return Http.put(`${baseURL}/api/class/name/${_id}`, classData); // Replace 'route-path' with your actual route and _id with the class ID   
};

export const assignStudentsToClass =  (classId, students) => {
  const baseURL = getBaseEndpointUrl();
  
  return Http.put(`${baseURL}/api/class/students/${classId}`, { students: [students] });
};

export const updateClassDepartment = async ( _id, department ) => {
  const baseURL = getBaseEndpointUrl();
    return Http.put(`${baseURL}/api/class/department/${_id}`, { department });
    
};

//attendance

export const fetchAttendanceByDate = (selectedDate) => {
  const baseURL = getBaseEndpointUrl();
    return Http.get(`${baseURL}/api/attendance/${selectedDate}`);
  
};

export const checkAttendanceMarked = (classId, date, hour) => {
  const baseURL = getBaseEndpointUrl();
   return  Http.get(`${baseURL}/api/attendance/${classId}/${date}/${hour}`);
};
export const createAttendance =  ({ classId, date, hour, subject, students }) => {
  console.log(subject)
  const baseURL = getBaseEndpointUrl();
     return Http.post(`${baseURL}/api/attendance`, { classId, date, hour,subject,  students });
 
};

//Subjects

export const getSubjects =  () => {
  const baseURL = getBaseEndpointUrl();
  return Http.get(baseURL + '/api/subject' )
};


//TimeTables

export const getTimeTables =  () => {
  const baseURL = getBaseEndpointUrl();
  return Http.get(baseURL + '/api/timetable' )
};


//batches

export const getBatches =  () => {
  const baseURL = getBaseEndpointUrl();
  return Http.get(baseURL + '/api/batches' )
};

//year


export const getYears =  () => {
  const baseURL = getBaseEndpointUrl();
  return Http.get(baseURL + '/api/year' )
};


//academic
export const getAcademics =  () => {
  const baseURL = getBaseEndpointUrl();
  return Http.get(baseURL + '/api/academic' )
};

//quota

export const getQuotas =  () => {
  const baseURL = getBaseEndpointUrl();
  return Http.get(baseURL + '/api/quota' )
};


//userrole

export const getUserRoles =  () => {
  const baseURL = getBaseEndpointUrl();
  return Http.get(baseURL + '/api/userrole' )
};


//usertype

export const getUserTypes =  () => {
  const baseURL = getBaseEndpointUrl();
  return Http.get(baseURL + '/api/usertype' )
};


