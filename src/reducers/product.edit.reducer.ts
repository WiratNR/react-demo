import {
  PRODUCT_EDIT_FAILED,
  PRODUCT_EDIT_FETCHING,
  PRODUCT_EDIT_SUCCESS,
} from "../Constants";
import { Product } from "../types/product.type";

export interface ProductEditState {
  result: Product | null;
  isFetching: boolean;
  isError: boolean;
}

const initialState: ProductEditState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case PRODUCT_EDIT_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case PRODUCT_EDIT_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case PRODUCT_EDIT_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};
