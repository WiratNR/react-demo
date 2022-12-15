import {
  OK,
  LOGIN_FAILED,
  LOGIN_FETCHING,
  LOGIN_SUCCESS,
  server,
  TOKEN,
  LOGOUT,
  USERNAME,
  USERID,
} from "../Constants";
import { LoginResult } from "../types/authen.type";
import { User } from "../types/user.type";
import { httpClient } from "../utils/httpclicnt";

export const setLoginFetchingToState = () => ({
  type: LOGIN_FETCHING,
});

export const setLoginSuccessToState = (payload: LoginResult) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const setRegisterFailedToState = () => ({
  type: LOGIN_FAILED,
});

export const setLogoutToState = () => ({
  type: LOGOUT,
});

const data = {
  email: "aa@bb.cc",
  password: "1234",
  result: OK,
  message: "Login Successfully",
  token:"",
};

export const login = (user: User, navigate: any) => {
  return async (dispatch: any) => {
    try {
      //begin connecting...
      dispatch(setLoginFetchingToState());

      if (user.email === data.email && user.password === data.password) {
        setTimeout(() => {
          localStorage.setItem(TOKEN, "1234");
          dispatch(setLoginSuccessToState(data));
          navigate("/stock");
        }, 1000);
      } else {
        dispatch(setRegisterFailedToState());
      }
    } catch (error) {
      //error
      dispatch(setRegisterFailedToState());
    }
  };
};

export const restoreLogin = () => {
  return (dispatch: any) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      dispatch(
        setLoginSuccessToState({
          result: OK,
          token,
          message: "Login Successfully",
        })
      );
    }
  };
};