import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../services/userAuthSlice'
import updateReducer from '../services/updateSlice'
import challengesReducer from '../services/challengesSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    update: updateReducer,
    challenges:challengesReducer
  },
  
});

export default store;
