import {
  server,
  PRODUCT_EDIT_FAILED,
  PRODUCT_EDIT_FETCHING,
 PRODUCT_EDIT_SUCCESS,
} from "../Constants";
import { Product } from "../types/product.type";
import { httpClient } from "../utils/httpclicnt";
// import { history } from "..";

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

export const updateProduct = (formData: any, navigate: any) => {
  return async (dispatch: any) => {
    //upload image
    console.log("formData update : ", formData);
    if(formData.data){
      const respon = await httpClient.post(
        server.UPLOAD_IMAGE_URL,
        JSON.stringify(formData.url_img)
      );
      delete formData.file_obj;
      formData.url_img = respon.data.fileId;
    }
    //update product
    const response = await httpClient.get(
      `${server.PRODUCT_URL}?action=updateById&idProduct=${
        formData.id
      }&dataObj=${JSON.stringify(formData)}`
    );
    //
    console.log("response : ", response);
    navigate("/stock");
  };
};

export const getProductById = (id: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setStockFetchingToState());
      let result = await httpClient.get<Product>(
        `${server.PRODUCT_URL}?action=getDataById&id=${id}`
      );
      dispatch(setStockSuccessToState(result.data.message[0]));
    } catch (error) {
      alert(JSON.stringify(error));
      dispatch(setStockFailedToState());
    }
  };
};
