import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATUS } from "../../utils/constants";
import { deleteFaculty, getFacultyList, updateFaculty, addFaculty } from "../../services/api";

const namespace = "faculties";
const initialState = {
  facultiesloading: "initial",
  addfacultyloading: "initial",
  updatefacultyloading: "initial",
  deletefacultyloading: 'initial',
  loadData: null,
  addfacultyloadData: null,
  updateloadData: null,
  error: null,
};

export const getFaculty = createAsyncThunk(
  `${namespace}/getFacultyList`,
  async (payload,{ rejectWithValue }) => {
    try {
      const response = await getFacultyList(); // Replace 'getActivities' with your actual API function call
      console.log("getFaculties--> ", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateFacultyAction = createAsyncThunk(
    `${namespace}/updateFaculty`,
    async ({ facultyId, facultyData }, { rejectWithValue }) => {
      try {
        const response = await updateFaculty(facultyId, facultyData);
        return response;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const deleteFacultyAction = createAsyncThunk(
    `${namespace}/deleteFaculty`,
    async (facultyId, { rejectWithValue }) => {
      try {
        const response = await deleteFaculty(facultyId)
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const addFacultyAsync = createAsyncThunk(
    `${namespace}/addFaculty`,
    async (FacultyData, {rejectWithValue}) => {
      try {
        const response = await addFaculty(FacultyData);
        console.log("addFaculty--> ", response);
        return response.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );



  const facultiesSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
      
    },
    extraReducers: {
  
        [getFaculty.pending](state) {
          state.facultiesloading = API_STATUS.PENDING;
          state.error = null;
        },
        [getFaculty.fulfilled] (state, action) {
          state.facultiesloading = API_STATUS.FULFILLED;
          state.error = null;
          state.loadData = action.payload;
        },
        [getFaculty.rejected] (state, action) {
          state.facultiesloading = API_STATUS.REJECTED;
          state.error = action.payload;
        },
        [updateFacultyAction.pending](state) {
          state.updatefacultyloading = API_STATUS.PENDING;
          state.error = null;
        },
        [updateFacultyAction.fulfilled](state, action) {
          state.updatefacultyloading = API_STATUS.FULFILLED;
          state.updateloadData = action.payload
          state.error = null;
          // Handle the update in the student list if needed
        },
        [updateFacultyAction.rejected](state, action) {
          state.updatefacultyloading = API_STATUS.REJECTED;
          state.error = action.payload;
        },
  
        [deleteFacultyAction.pending](state) {
          state.deletefacultyloading = API_STATUS.PENDING;
          state.error = null;
        },
        [deleteFacultyAction.fulfilled] (state, action) {
          state.deletefacultyloading = API_STATUS.FULFILLED;
          state.error = null;
          
        },
        [deleteFacultyAction.rejected] (state, action) {
          state.deletefacultyloading = API_STATUS.REJECTED;
          state.error = action.payload;
        },
        [addFacultyAsync.pending](state) {
          state.addfacultyloading = API_STATUS.PENDING;
          state.error = null;
        },
        [addFacultyAsync.fulfilled] (state, action) {
          state.addfacultyloading = API_STATUS.FULFILLED;
          state.addfacultyloadData = action.payload
          state.error = null;
          
        },
        [addFacultyAsync.rejected] (state, action) {
          state.addfacultyloading = API_STATUS.REJECTED;
          state.error = action.payload;
        },
    },
  });
  
  export const facultySelector = (state) => state.faculties;
  export default facultiesSlice.reducer;
  