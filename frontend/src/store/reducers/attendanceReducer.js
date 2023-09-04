import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATUS } from "../../utils/constants";
import { fetchAttendanceByDate, checkAttendanceMarked, createAttendance } from "../../services/api";

const namespace = "attendances";
const initialState = {
  attendanceloading: "initial",
  checkingattendanceloading : "initial",
  createattendanceloading: "initial",
  checkattendanceloadData: null,
  createdattendanceloadData: null,
  loadData: null,
  error: null,
};


export const fetchAttendanceByDateAsync = createAsyncThunk(
    `${namespace}/fetchAttendanceByDate`,
    async (selectedDate,{ rejectWithValue }) => {
      try {
        const response = await fetchAttendanceByDate(selectedDate);
        return response.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const checkAttendanceMarkedAsync = createAsyncThunk(
    `${namespace}/checkAttendanceMarked`,
    async ({ classId, date, hour },{ rejectWithValue }) => {
      try {
        const response = await checkAttendanceMarked(classId, date, hour);
        return response; // Return true/false based on the response
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const createAttendanceAsync = createAsyncThunk(
    `${namespace}/createAttendance`,
    async (attendanceData,{ rejectWithValue }) => {
      try {
        const response = await createAttendance(attendanceData)
        return response.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

const attendanceSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
      
    },
    extraReducers: {
        [fetchAttendanceByDateAsync.pending](state) {
            state.attendanceloading = API_STATUS.PENDING;
            state.error = null;
        },
        [fetchAttendanceByDateAsync.fulfilled] (state, action) {
            state.attendanceloading = API_STATUS.FULFILLED;
            state.loadData = action.payload
            state.error = null;
            
        },
        [fetchAttendanceByDateAsync.rejected] (state, action) {
            state.attendanceloading = API_STATUS.REJECTED;
            state.error = action.payload;
        },
        [checkAttendanceMarkedAsync.pending](state) {
            state.checkingattendanceloading = API_STATUS.PENDING;
            state.error = null;
        },
        [checkAttendanceMarkedAsync.fulfilled] (state, action) {
            state.checkingattendanceloading = API_STATUS.FULFILLED;
            state.checkattendanceloadData = action.payload
            state.error = null;
            
        },
        [checkAttendanceMarkedAsync.rejected] (state, action) {
            state.checkingattendanceloading = API_STATUS.REJECTED;
            state.error = action.payload;
        },
        [createAttendanceAsync.pending](state) {
            state.createattendanceloading = API_STATUS.PENDING;
            state.error = null;
        },
        [createAttendanceAsync.fulfilled] (state, action) {
            state.createattendanceloading = API_STATUS.FULFILLED;
            state.createdattendanceloadData = action.payload
            
            state.error = null;
            
        },
        [createAttendanceAsync.rejected] (state, action) {
            state.createattendanceloading = API_STATUS.REJECTED;
            state.error = action.payload;
        },


    },
},
);

export const attendanceSelector = (state) => state.attendances;
export default attendanceSlice.reducer;