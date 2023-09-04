import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATUS } from "../../utils/constants";
import { deleteStudent, getStudentList, updateStudent, addStudent, assignStudentsToClass, removeStudentFromClass, fetchStudentsByClass } from "../../services/api";

const namespace = "students";
const initialState = {
  studentsloading: "initial",
  updatestudentloading: "initial",
  deletestudentloading: 'initial',
  addstudentloading: 'initial',
  assignstudentloading: 'initial',
  removingstudentloading: 'initial',
  fetchingstudentsbyclassloading: 'initial', 
  loadData: null,
  addstudentloadData: null,
  updateloadData: null,
  fetchstudentbyclassloadData: null,
  error: null,
};

export const getStudents = createAsyncThunk(
  `${namespace}/getStudentList`,
  async (payload,{ rejectWithValue }) => {
    try {
      const response = await getStudentList(); // Replace 'getActivities' with your actual API function call
      console.log("getStudents--> ", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStudentAction = createAsyncThunk(
    `${namespace}/updateStudent`,
    async ({ studentId, studentData }, { rejectWithValue }) => {
        console.log(studentData)
        console.log(studentId)
      try {
        const response = await updateStudent(studentId, studentData);
        return response;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const deleteStudentAction = createAsyncThunk(
    `${namespace}/deleteStudent`,
    async (studentId, { rejectWithValue }) => {
      try {
        const response = await deleteStudent(studentId)
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const addStudentAsync = createAsyncThunk(
    `${namespace}/addStudent`,
    async (studentData, {rejectWithValue}) => {
      try {
        const response = await addStudent(studentData);
        console.log("addStudent--> ", response);
        return response.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const assignStudentsAsync = createAsyncThunk(
    `${namespace}/assignStudentsToClass`,
    async ({ classId, students },{rejectWithValue} ) => {
      try {
        const response = await assignStudentsToClass(classId, students);
        console.log("AssigningStudentToClas--->", response)
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const removeStudentFromClassAsync = createAsyncThunk(
    `${namespace}/removeStudentFromClass`,
    async ({ studentId, classId },{rejectWithValue}) => {
      try {
        const response = await removeStudentFromClass(studentId, classId);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const fetchStudentsByClassAsync = createAsyncThunk(
    `${namespace}/fetchStudentsByClass`,
    async (selectedClass, {rejectWithValue}) => {
      try {
        const response = await fetchStudentsByClass(selectedClass);
        return response.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );


const studentsSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    
  },
  extraReducers: {

      [getStudents.pending](state) {
        state.studentsloading = API_STATUS.PENDING;
        state.error = null;
      },
      [getStudents.fulfilled] (state, action) {
        state.studentsloading = API_STATUS.FULFILLED;
        state.error = null;
        state.loadData = action.payload;
      },
      [getStudents.rejected] (state, action) {
        state.studentsloading = API_STATUS.REJECTED;
        state.error = action.payload;
      },
      [updateStudentAction.pending](state) {
        state.updatestudentloading = API_STATUS.PENDING;
        state.error = null;
      },
      [updateStudentAction.fulfilled](state, action) {
        state.updatestudentloading = API_STATUS.FULFILLED;
        state.updateloadData = action.payload
        state.error = null;
        // Handle the update in the student list if needed
      },
      [updateStudentAction.rejected](state, action) {
        state.updatestudentloading = API_STATUS.REJECTED;
        state.error = action.payload;
      },

      [deleteStudentAction.pending](state) {
        state.deletestudentloading = API_STATUS.PENDING;
        state.error = null;
      },
      [deleteStudentAction.fulfilled] (state, action) {
        state.deletestudentloading = API_STATUS.FULFILLED;
        state.error = null;
        
      },
      [deleteStudentAction.rejected] (state, action) {
        state.deletestudentloading = API_STATUS.REJECTED;
        state.error = action.payload;
      },
      [addStudentAsync.pending](state) {
        state.addstudentloading = API_STATUS.PENDING;
        state.error = null;
      },
      [addStudentAsync.fulfilled] (state, action) {
        state.addstudentloading = API_STATUS.FULFILLED;
        state.addstudentloadData = action.payload
        state.error = null;
        
      },
      [addStudentAsync.rejected] (state, action) {
        state.addstudentloading = API_STATUS.REJECTED;
        state.error = action.payload;
      },
      [assignStudentsAsync.pending](state) {
        state.assignstudentloading = API_STATUS.PENDING;
        state.error = null;
      },
      [assignStudentsAsync.fulfilled] (state, action) {
        state.assignstudentloading = API_STATUS.FULFILLED;
        state.error = null;
        
      },
      [assignStudentsAsync.rejected] (state, action) {
        state.assignstudentloading = API_STATUS.REJECTED;
        state.error = action.payload;
      },
      [removeStudentFromClassAsync.pending](state) {
        state.removingstudentloading = API_STATUS.PENDING;
        state.error = null;
      },
      [removeStudentFromClassAsync.fulfilled] (state, action) {
        state.removingstudentloading = API_STATUS.FULFILLED;
        state.error = null;
        
      },
      [removeStudentFromClassAsync.rejected] (state, action) {
        state.removingstudentloading = API_STATUS.REJECTED;
        state.error = action.payload;
      },
      [fetchStudentsByClassAsync.pending](state) {
        state.fetchingstudentsbyclassloading = API_STATUS.PENDING;
        state.error = null;
      },
      [fetchStudentsByClassAsync.fulfilled] (state, action) {
        state.fetchingstudentsbyclassloading = API_STATUS.FULFILLED;
        state.fetchstudentbyclassloadData = action.payload
        state.error = null;
        
      },
      [fetchStudentsByClassAsync.rejected] (state, action) {
        state.fetchingstudentsbyclassloading = API_STATUS.REJECTED;
        state.error = action.payload;
      },
  },
});

export const studentSelector = (state) => state.students;
export default studentsSlice.reducer;
