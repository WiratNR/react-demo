import {
  server,
  PRODUCT_EDIT_FAILED,
  PRODUCT_EDIT_FETCHING,
 PRODUCT_EDIT_SUCCESS,
} from "../Constants";
import { Product } from "../types/product.type";
import { httpClient } from "../utils/httpclicnt";

export const setStockFetchingToState = () => ({
  type: PRODUCT_EDIT_FETCHING,
});

export const setStockSuccessToState = (payload: Product) => ({
  type: PRODUCT_EDIT_SUCCESS,
  payload,
});

export const setStockFailedToState = () => ({
  type: PRODUCT_EDIT_FAILED,
});

export const getProductDetailById = (id: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setStockFetchingToState());
      let result = await httpClient.get<Product>(
        `${server.PRODUCT_URL}/${id}`
      );
      dispatch(setStockSuccessToState(result.data));
    } catch (error) {
      alert(JSON.stringify(error));
      dispatch(setStockFailedToState());
    }
  };
};
