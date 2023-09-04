const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const app = express();
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

const facultyRoutes = require('./routes/addFacultyroutes');
const subjectRoutes = require('./routes/addSubjectroutes');
const studentRoutes = require('./routes/addStudentroutes');
const departmentRoutes = require('./routes/addDepartmentroutes')
const attendanceRoutes = require('./routes/studentAttendanceroutes')
const classRoutes = require('./routes/addClassroutes');
const hourRoutes = require('./routes/addHoursroutes')
const certificateRoutes = require('./routes/addCertificateroutes')
const dayorderRoutes = require('./routes/addDayOrderroutes');
const calendarRoutes = require('./routes/calenderRoutes');
const timetableRoutes = require('./routes/addTimeTableroutes');
const academicRoutes = require('./routes/manageAcademicroutes');
const userroleRoutes = require('./routes/manageUserRoutes');
const usertypeRoutes = require('./routes/manageUserTypeRoutes');
const batchRoutes = require('./routes/manageBatchRoutes');
const yearRoutes = require('./routes/manageYearroutes')
const deptgroupRoutes = require('./routes/deptGroupRoutes')
const quotaRoutes = require('./routes/quotaRoutes')
const accountNoRoutes = require('./routes/accountNumberRoutes')

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/faculty', facultyRoutes);
app.use('/api/subject', subjectRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/class', classRoutes);
app.use('/api/attendance', attendanceRoutes)
app.use('/api/hour', hourRoutes)
app.use('/api/certificate', certificateRoutes)
app.use('/api/dayorder', dayorderRoutes)
app.use('/api/calendar', calendarRoutes)
app.use('/api/timetable', timetableRoutes)
app.use('/api/academic', academicRoutes)
app.use('/api/userrole', userroleRoutes)
app.use('/api/usertype', usertypeRoutes)
app.use('/api/batches', batchRoutes)
app.use('/api/year', yearRoutes)
app.use('/api/departmentgroup', deptgroupRoutes)
app.use('/api/quota', quotaRoutes)
app.use('/api/accountnumber', accountNoRoutes)

// Start the server
const port = 3002; // Change to your preferred port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
