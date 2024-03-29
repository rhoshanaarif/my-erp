import { configureStore } from '@reduxjs/toolkit';

import studentReducer from './reducers/studentReducer';
import facultyReducer from './reducers/facultyReducer';
import departmentReducer from './reducers/departmentReducer';
import hourReducer from './reducers/hourReducer';
import classReducer from './reducers/classReducer';
import attendanceReducer from './reducers/attendanceReducer';
import subjectReducer from './reducers/subjectReducer';
import timetableReducer from './reducers/timetableReducer';
import batchReducer from './reducers/batchReducer';
import yearReducer from './reducers/yearReducer';
import academicReducer from './reducers/academicReducer';
import quotaReducer from './reducers/quotaReducer';
import userroleReducer from './reducers/userroleReducer';
import usertypeReducer from './reducers/usertypeReducer';

const store = configureStore({
  reducer: { 
    students : studentReducer,
    departments : departmentReducer,
    faculties: facultyReducer,
    hours : hourReducer,
    classes : classReducer,
    attendances: attendanceReducer,
    subjects: subjectReducer,
    timetables: timetableReducer,
    batches: batchReducer, 
    years: yearReducer,
    academics: academicReducer,
    quotas: quotaReducer,
    userroles: userroleReducer,
    usertypes: usertypeReducer
  }
});

export default store;
