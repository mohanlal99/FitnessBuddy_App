// src/store/challengesSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const addChallenge = createAsyncThunk(
  "challenges/addChallenge",
  async (challenge, thunkAPI) => {
    console.log(challenge)
    try {
      const docRef = await addDoc(collection(db, "challenges"), challenge);
      return { id: docRef.id, ...challenge };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchChallenges = createAsyncThunk(
  "challenges/fetchChallenges",
  async (_, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(db, "challenges"));
      const challenges = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return challenges;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const challengesSlice = createSlice({
  name: "challenges",
  initialState: {
    availableChallenges: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addChallenge.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addChallenge.fulfilled, (state, action) => {
        state.loading = false;
        state.availableChallenges.push(action.payload);
      })
      .addCase(addChallenge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchChallenges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChallenges.fulfilled, (state, action) => {
        state.loading = false;
        state.availableChallenges = action.payload;
      })
      .addCase(fetchChallenges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default challengesSlice.reducer;
