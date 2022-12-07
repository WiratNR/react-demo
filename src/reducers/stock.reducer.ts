import {
  STOCK_CLEAR,
  STOCK_FAILED,
  STOCK_FETCHING,
  STOCK_SUCCESS,
} from "../Constants";

export interface StockState {
  isFetching: boolean;
  isError: boolean;
  result: any;
}
const initialState: StockState = {
  isFetching: false,
  isError: false,
  result: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }: any): StockState => {
  switch (type) {
    case STOCK_FETCHING:
      return { ...state, isFetching: true, isError: false, result: null };

    case STOCK_SUCCESS:
      return { ...state, isFetching: false, isError: false, result: payload };

    case STOCK_FAILED:
      return { ...state, isFetching: false, isError: true, result: null };

    case STOCK_CLEAR:
      return { ...state, result: [], isFetching: false, isError: false };

    default:
      return state;
  }
};
