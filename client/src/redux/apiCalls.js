import { publicRequest } from "../requestMethods";
import { handleApiError } from "../utils/errorhandling";
import { loginFailure, loginStart, loginSuccess, register, registerSuccess, registerFailure , isAuthenticated} from "./userRedux";
// import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    return res.data; 
  } catch (err) {
    // console.log("message" ,err.response.status)
    const message = handleApiError(err);
    dispatch(loginFailure(message));
  }
};


export const registerStart = async (dispatch, newUser) => {
  dispatch(register());
  try {
    const res = await publicRequest.post("/auth/register", newUser);
    dispatch(registerSuccess(res.data));
    return res.data; 
  } catch (err) {
    const message =  handleApiError(err)
    dispatch(registerFailure(message));
   
  }
};
