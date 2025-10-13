import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, register, registerSuccess, registerFailure , isAuthenticated} from "./userRedux";
// import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    return res.data; // Return the user data
  } catch (err) {
    dispatch(loginFailure());
    throw err; 
    // console.log
  }
};


export const registerStart = async (dispatch, newUser) => {
  dispatch(register());
  try {
    const res = await publicRequest.post("/auth/register", newUser);
    console.log("api response " ,res.data)
    dispatch(registerSuccess(res.data));
    return res.data; // ✅ add this line
  } catch (err) {
    dispatch(registerFailure());
    throw err; // optional, helps catch error in UI
  }
};
