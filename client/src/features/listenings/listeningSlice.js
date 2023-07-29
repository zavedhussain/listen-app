import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const url = "https://listen-app-api-n3ia.onrender.com/api/v1";

//initial filter params
const initialFiltersState = {
  level: "all",
  levelOptions: ["all", "internal", "focused", "global"],
  sort: "latest",
  sortOptions: ["latest", "oldest"],
};

const initialState = {
  isLoading: false,
  allListenings: [],
  totalListenings: 0,
  totalPages: 1,
  page: 1,
  ...initialFiltersState,
};

export const getAllListenings = createAsyncThunk(
  "listenings/getAllListenings",
  async (_, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        //setup url with query params
        const { sort, level, page } = thunkAPI.getState().listenings;
        const queryUrl = `${url}/listenings?sort=${sort}&page=${page}&level=${level}`;
        const resp = await axios.get(queryUrl, config);
        return resp.data;
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const addListening = createAsyncThunk(
  "listenings/addListening",
  async (listening, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const resp = await axios.post(`${url}/listenings`, listening, config);
        return resp.data;
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteListening = createAsyncThunk(
  "listenings/deleteListening",
  async (listeningId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const resp = await axios.delete(
          `${url}/listenings/${listeningId}`,
          config
        );
        thunkAPI.dispatch(getAllListenings());
        return resp.data;
      }
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const listeningSlice = createSlice({
  name: "listenings",
  initialState,
  reducers: {
    showLoading: (state, action) => {
      state.isLoading = true;
    },
    hideLoading: (state, action) => {
      state.isLoading = false;
    },
    handleFilters: (state, action) => {
      const { id, value } = action.payload;
      state.page = 1;
      state[id] = value;
    },
    resetFilters: (state, action) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllListenings.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllListenings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allListenings = action.payload.listenings;
        state.totalListenings = action.payload.totalListenings;
        state.totalPages = action.payload.numOfPages;
      })
      .addCase(getAllListenings.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(addListening.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addListening.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Added New Record...");
      })
      .addCase(addListening.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(deleteListening.fulfilled, (state, action) => {
        toast.success("Deleted Record...");
      })
      .addCase(deleteListening.rejected, (state, action) => {
        toast.error(action.payload);
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleFilters,
  resetFilters,
  changePage,
} = listeningSlice.actions;

export default listeningSlice.reducer;
