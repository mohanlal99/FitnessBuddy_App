import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../config/firebase";
import { getDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";

export const updateProfile = createAsyncThunk(
  "update/updateProfile",
  async ({ uid, data }) => {
    console.log(data);
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        await updateDoc(userDocRef, data);
        return "Challenges updated";
      } else {
        throw new Error("User document does not exist");
      }
    } catch (error) {
      throw error.message || "Something went wrong while updating the profile";
    }
  }
);

export const addWorkout = createAsyncThunk(
  "user/addWorkout",
  async (workout, { getState, rejectWithValue }) => {
    try {
      const uid = getState().auth.user.uid;
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      const updatedWorkouts = [...(userData.workouts || []), workout];

      await updateDoc(userRef, {
        workouts: updatedWorkouts,
      });

      return workout; // Return only the newly added workout
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const getDaysLeft = (duration) => parseInt(duration);

export const joinChallenge = createAsyncThunk(
  "user/joinChallenge",
  async (challenge, { getState, rejectWithValue }) => {
    try {
      console.log(challenge);
      const uid = getState().auth.user.uid;
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      const userData = userSnap.data();
      const alreadyJoined = userData?.activeChallenges?.some(
        (c) => c.title === challenge.title
      );

      if (alreadyJoined) {
        return rejectWithValue("Challenge already joined");
      }

      const newChallenge = {
        ...challenge,
        progress: 0,
        completed: false,
        joinedAt: new Date().toISOString(),
        totalDays: parseInt(challenge.duration), // new field
        daysLeft: getDaysLeft(challenge.duration),
        markedDates: [], // new field
      };

      await updateDoc(userRef, {
        activeChallenges: arrayUnion(newChallenge),
      });
      console.log(newChallenge);

      return newChallenge;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const markTodayChallenge = createAsyncThunk(
  "user/markTodayChallenge",
  async (challenge, { getState, rejectWithValue }) => {
    try {
      const uid = getState().auth.user.uid;
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      const today = new Date().toISOString().split("T")[0];

      const updatedActive = userData.activeChallenges.map((c) => {
        if (c.title === challenge.title) {
          // Already marked today
          if ((c.markedDates || []).includes(today)) {
            throw new Error("Already marked today.");
          }

          const updatedDaysLeft = c.daysLeft - 1;
          const updatedProgress = Math.round(
            ((c.totalDays - updatedDaysLeft) / c.totalDays) * 100
          );

          return {
            ...c,
            daysLeft: updatedDaysLeft,
            progress: updatedProgress,
            markedDates: [...(c.markedDates || []), today],
          };
        }
        return c;
      });

      let completedChallenge = null;
      const stillActive = [];

      for (let ch of updatedActive) {
        if (ch.title === challenge.title && ch.daysLeft === 0) {
          completedChallenge = {
            ...ch,
            completed: `Completed on ${new Date().toLocaleDateString()}`,
            earned: ch.points,
          };
        } else {
          stillActive.push(ch);
        }
      }

      await updateDoc(userRef, {
        activeChallenges: stillActive,
        ...(completedChallenge && {
          completedChallenges: arrayUnion(completedChallenge),
        }),
      });

      return {
        active: stillActive,
        completed: completedChallenge ? [completedChallenge] : [],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const completeChallenge = createAsyncThunk(
  "user/completeChallenge",
  async (challenge, { getState, rejectWithValue }) => {
    try {
      const uid = getState().auth.user.uid;
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      // Remove from activeChallenges
      const updatedActive = userData.activeChallenges.filter(
        (c) => c.title !== challenge.title
      );

      // Add to completedChallenges
      const updatedCompleted = [
        ...(userData.completedChallenges || []),
        {
          ...challenge,
          completed: `Completed on ${new Date().toLocaleDateString()}`,
          earned: challenge.points,
        },
      ];

      await updateDoc(userRef, {
        activeChallenges: updatedActive,
        completedChallenges: updatedCompleted,
      });

      return { active: updatedActive, completed: updatedCompleted };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const updateSlice = createSlice({
  name: "update",
  initialState: {
    success: "",
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload || "Successfully updated profile!";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update profile";
      })
      .addCase(joinChallenge.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload || "Successfully updated profile!";
      })
      .addCase(joinChallenge.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(markTodayChallenge.fulfilled, (state, action) => {
        console.log(action.payload.active);
      })
      .addCase(addWorkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(addWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Workout added successfully";
      })
      .addCase(addWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add workout";
      });
  },
});

export default updateSlice.reducer;
