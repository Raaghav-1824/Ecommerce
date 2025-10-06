import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, register, registerSuccess, registerFailure } from "./userRedux";
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const registerStart = async (dispatch, newUser) => {
  dispatch(register());
  try {
    // console.log("#####",newUser);
    const res = await publicRequest.post("/auth/register", newUser);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};