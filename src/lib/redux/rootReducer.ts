import {combineReducers} from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import notificationsReducer from './slices/notificationsSlice';

const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationsReducer,
});

export default rootReducer;
