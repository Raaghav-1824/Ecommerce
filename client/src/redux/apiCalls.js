import { loginFailure, loginStart, loginSuccess, register, registerSuccess, registerFailure } from "./userRedux";
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3000/api/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const registerStart = async (dispatch, newUser) => {
  dispatch(register());
  try {
    console.log("#####",newUser);
    const res = await axios.post("http://localhost:3000/api/auth/register", newUser);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};