import {
  server,
  STOCK_CLEAR,
  STOCK_FAILED,
  STOCK_FETCHING,
  STOCK_SUCCESS,
} from "../Constants";
import { Stock } from "../types/stock.type";
import { httpClient } from "../utils/httpclicnt";
import { Dispatch } from "react";
import { AnyAction } from "redux";

export const setStockFetchingToState = () => ({
  type: STOCK_FETCHING,
});

export const setStockSuccessToState = (payload: Stock[]) => ({
  type: STOCK_SUCCESS,
  payload,
});

export const setStockFailedToState = () => ({
  type: STOCK_FAILED,
});

export const setStockClearToState = () => ({
  type: STOCK_CLEAR,
});

export const loadStock = () => {
  return (dispatch: any) => {
    dispatch(setStockFetchingToState());
    doGetStock(dispatch);
  };
};

export const loadStockByKeyword = (keyword: string) => {
  return async (dispatch: any) => {
    dispatch(setStockFetchingToState());

    if (keyword) {
      let result = await httpClient.get<any>(
        `${server.STOCK_URL}/keyword/${keyword}`
      );
      dispatch(setStockSuccessToState(result.data));
    } else {
      doGetStock(dispatch);
    }
  };
};

export const getStockById = (id: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setStockFetchingToState());
      let result = await httpClient.get<Stock>(
        `${server.STOCK_URL}?action=getDataById&id=${id}`
      );
      dispatch(setStockSuccessToState(result.data.message[0]));
    } catch (error) {
      alert(JSON.stringify(error));
      dispatch(setStockFailedToState());
    }
  };
};

const doGetStock = async (dispatch: any) => {
  try {
    const result = await httpClient.get<any>(
      `${server.STOCK_URL}?action=getData`
    );
    dispatch(setStockSuccessToState(result.data));
  } catch (error) {
    dispatch(setStockFailedToState());
  }
};

export const updateStock = (formData: any) => {
  return async (dispatch: any) => {
    await httpClient.get(
      `${server.STOCK_URL}?action=updateById&idProduct=${
        formData.id
      }&dataObj=${JSON.stringify(formData)}`
    );
    await doGetStock(dispatch);
  };
};

export const addStock = (formData: any) => {
  return async (dispatch: any) => {
    await httpClient.post(server.STOCK_URL, JSON.stringify(formData));
    await doGetStock(dispatch);
  };
};

export const deleteStock = (id: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setStockFetchingToState());
    //tets
    await httpClient.get(`${server.STOCK_URL}?action=deleteById&id=${id}`);
    await doGetStock(dispatch);
  };
};
