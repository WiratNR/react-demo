import {
  server,
  MAJOR_FAILED,
  MAJOR_FETCHING,
  MAJOR_SUCCESS,
} from "../Constants";
import { Major } from "../types/major.type";
import { httpClient } from "../utils/httpclicnt";
import { Dispatch } from "react";
import { AnyAction } from "redux";

export const setMajorFetchingToState = () => ({
  type: MAJOR_FETCHING,
});

export const setMajorSuccessToState = (payload: Major[]) => ({
  type: MAJOR_SUCCESS,
  payload,
});

export const setMajorFailedToState = () => ({
  type: MAJOR_FAILED,
});

export const loadMajor = () => {
  return (dispatch: any) => {
    dispatch(setMajorFetchingToState());
    doGetMajor(dispatch);
  };
};

export const loadMajorByKeyword = (keyword: string) => {
  return async (dispatch: any) => {
    dispatch(setMajorFetchingToState());

    if (keyword) {
      let result = await httpClient.get<any>(
        `${server.MAJOR_URL}/keyword/${keyword}`
      );
      dispatch(setMajorSuccessToState(result.data));
    } else {
      doGetMajor(dispatch);
    }
  };
};

const doGetMajor = async (dispatch: any) => {
  try {
    const result = await httpClient.get<any>(
      `${server.MAJOR_URL}?action=getData`
    );
    dispatch(setMajorSuccessToState(result.data));
  } catch (error) {
    dispatch(setMajorFailedToState());
  }
};

export const addMajor = (formData: any) => {
  return async (dispatch: any) => {
    await httpClient.post(server.MAJOR_URL, JSON.stringify(formData));
    await doGetMajor(dispatch);
  };
};

export const deleteMajor = (id: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setMajorFetchingToState());
    await httpClient.get(`${server.MAJOR_URL}?action=deleteById&id=${id}`);
    await doGetMajor(dispatch);
  };
};
