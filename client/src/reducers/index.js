import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";


// We'll have many reducers, so we'll combine them here
export default combineReducers({
    alert, // alert reducer
    auth, // auth reducer
    profile, // profile reducer
    post, // post reducer
});