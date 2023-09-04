import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATUS } from "../../utils/constants";
import { getClasses, addClass, deleteClass, updateClass, updateClassDepartment} from "../../services/api";

const namespace = "classes";
const initialState = {
    classesloading: 'initial',
    updateclassloading: 'initial',
    addclassloading: 'initial',
    deleteclassloading: 'initial',
    updateclassdepartmentloading: 'initial',
  loadData: null,
  error: null,
};

export const fetchClasses = createAsyncThunk(
    `${namespace}/getClasses'`,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await getClasses();
        console.log("getClasses--> ", response);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const addClassAsync = createAsyncThunk(
    `${namespace}/addClass`,
    async (classData, { rejectWithValue }) => {
      try {
        const response = await addClass(classData);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const deleteClassAsync = createAsyncThunk(
    `${namespace}/deleteClass`,
    async (classId,{ rejectWithValue }) => {
      try {
        const response = await deleteClass(classId);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const updateClassAsync = createAsyncThunk(
    `${namespace}/updateClass`,
    async ({ _id, classData },{ rejectWithValue }) => {
      try {
        const response = await updateClass(_id, classData);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const updateClassDepartmentAsync = createAsyncThunk(
    `${namespace}/updateClassDepartment`,
    async ({ _id, department }) => {
      try {
        const response = await updateClassDepartment(_id, department);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  );
  const classSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
      // ... other reducers ...
    },
    extraReducers: {
      
  
      [fetchClasses.pending](state) {
        state.classesloading = API_STATUS.PENDING;
      },
      [fetchClasses.fulfilled](state, action) {
        state.classesloading = API_STATUS.FULFILLED;
        state.loadData = action.payload;
      },
      [fetchClasses.rejected](state, action) {
        state.classesloading = API_STATUS.REJECTED;
        state.error = action.payload
      },
      [addClassAsync.pending](state) {
        state.addclassloading = API_STATUS.PENDING;
      },
      [addClassAsync.fulfilled](state, action) {
        state.addclassloading = API_STATUS.FULFILLED;
      },
      [addClassAsync.rejected](state, action) {
        state.addclassloading = API_STATUS.REJECTED;
        state.error = action.payload
      },
      [updateClassAsync.pending](state) {
        state.updateclassloading = API_STATUS.PENDING;
      },
      [updateClassAsync.fulfilled](state, action) {
        state.updateclassloading = API_STATUS.FULFILLED;
      },
      [updateClassAsync.rejected](state, action) {
        state.updateclassloading = API_STATUS.REJECTED;
        state.error = action.payload
      },
      [deleteClassAsync.pending](state) {
        state.deleteclassloading = API_STATUS.PENDING;
      },
      [deleteClassAsync.fulfilled](state, action) {
        state.deleteclassloading = API_STATUS.FULFILLED;
      },
      [deleteClassAsync.rejected](state, action) {
        state.deleteclassloading = API_STATUS.REJECTED;
        state.error = action.payload
      },
      [updateClassDepartmentAsync.pending](state) {
        state.updateclassdepartmentloading = API_STATUS.PENDING;
      },
      [updateClassDepartmentAsync.fulfilled](state, action) {
        state.updateclassdepartmentloading = API_STATUS.FULFILLED;
      },
      [updateClassDepartmentAsync.rejected](state, action) {
        state.updateclassdepartmentloading = API_STATUS.REJECTED;
        state.error = action.payload
      },
      
      
    },
  });

export const classSelector = (state) => state.classes;
export default classSlice.reducer;
