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
        `${server.PRODUCT_URL}/keyword/${keyword}`
      );
      dispatch(setProductSuccessToState(result.data));
    } else {
      doGetProducts(dispatch);
    }
  };
};

const doGetProducts = async (dispatch: any) => {
  try {
    const result = await httpClient.get<Product[]>(
      `${server.PRODUCT_URL}?action=getData`
    );
    dispatch(setProductSuccessToState(result.data));
  } catch (error) {
    dispatch(setProductFailedToState());
  }
};

export const addProduct = (formData: any, navigate: any) => {
  return async (dispatch: any) => {
    //upload Image
    const respon = await httpClient.post(
      server.UPLOAD_IMAGE_URL,
      JSON.stringify(formData.url_img)
    );
    delete formData.file_obj;
    formData.url_img = respon.data.fileId;
    
    //
    await httpClient.post(server.PRODUCT_URL, JSON.stringify(formData));
    navigate("/stock");
  };
};

export const deleteProduct = (id: string,idImg : string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setProductFetchingToState());
    await httpClient.get(`${server.PRODUCT_URL}?action=deleteById&id=${id}`);
    await httpClient.get(`${server.UPLOAD_IMAGE_URL}?action=deleteImage&id=${idImg}`);
    await doGetProducts(dispatch);
  };
};
