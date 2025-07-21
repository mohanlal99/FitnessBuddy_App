import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return "Signin Successfull"
  }
);




export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
});

export const checkUser = createAsyncThunk(
  "auth/checkUser",
  async (_, thunkAPI) => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(docRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if(userData){
              resolve({
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                ...userData,
              });
            }
          } 
          resolve({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
        } else {
          resolve(null);
        }
      });
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })

      builder
      .addCase(checkUser.pending, (state) => {
        state.loading = true;  
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;  
      })
      .addCase(checkUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
