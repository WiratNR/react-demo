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

export const login = (user: User, navigate: any) => {
  return async (dispatch: any) => {
    try {
      //begin connecting...
      dispatch(setLoginFetchingToState());

      //connect
      const result = await httpClient.get<LoginResult>(
        `${server.LOGIN_URL}?action=login&u=${user.username}&p=${user.password}`
      );

      if (result.data.result === OK) {
        setTimeout(() => {
          localStorage.setItem(TOKEN, result.data.token!);
          localStorage.setItem(USERNAME, result.data.message!);
          localStorage.setItem(USERID, result.data.userid!);
          dispatch(setLoginSuccessToState(result.data));
          alert("Login Successfully");

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

export const logout = (navigate: any) => {
  return (dispatch: any) => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USERNAME);
    localStorage.removeItem(USERID);
    dispatch(setLogoutToState());
    alert("Logout sucsessfully");
    navigate("/login");
  };
};
