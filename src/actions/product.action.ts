import {
  server,
  PRODUCT_CLEAR,
  PRODUCT_FAILED,
  PRODUCT_FETCHING,
  PRODUCT_SUCCESS,
} from "../Constants";
import { Product } from "../types/product.type";
import { httpClient } from "../utils/httpclicnt";
import { Dispatch } from "react";
import { AnyAction } from "redux";


export const setProductFetchingToState = () => ({
  type: PRODUCT_FETCHING,
});

export const setProductSuccessToState = (payload: Product[]) => ({
  type: PRODUCT_SUCCESS,
  payload,
});

export const setProductFailedToState = () => ({
  type: PRODUCT_FAILED,
});

export const setProductClearToState = () => ({
  type: PRODUCT_CLEAR,
});

export const loadProduct = () => {
  return (dispatch: any) => {
    dispatch(setProductFetchingToState());
    doGetProducts(dispatch);
  };
};

export const loadProductByKeyword = (keyword: string) => {
  return async (dispatch: any) => {
    dispatch(setProductFetchingToState());

    if (keyword) {
      let result = await httpClient.get<any>(
        `${server.PRODUCT_URL}/search?q=/${keyword}`
      );
      dispatch(setProductSuccessToState(result.data));
    } else {
      doGetProducts(dispatch);
    }
  };
};

const doGetProducts = async (dispatch: any) => {
  try {
    const result = await httpClient.get<Product>(
      `${server.PRODUCT_URL}`
    );
    dispatch(setProductSuccessToState(result.data.products));
  } catch (error) {
    dispatch(setProductFailedToState());
  }
};
