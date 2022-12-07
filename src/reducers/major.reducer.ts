import { MAJOR_FAILED, MAJOR_FETCHING, MAJOR_SUCCESS } from "../Constants";

export interface MajorState {
  isFetching: boolean;
  isError: boolean;
  result: any;
}
const initialState: MajorState = {
  isFetching: false,
  isError: false,
  result: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }: any): MajorState => {
  switch (type) {
    case MAJOR_FETCHING:
      return { ...state, isFetching: true, isError: false, result: null };

    case MAJOR_SUCCESS:
      return { ...state, isFetching: false, isError: false, result: payload };

    case MAJOR_FAILED:
      return { ...state, isFetching: false, isError: true, result: null };

    default:
      return state;
  }
};
