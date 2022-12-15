// Stock Page
export const STOCK_FETCHING = "STOCK_FETCHING";
export const STOCK_FAILED = "STOCK_FAILED";
export const STOCK_SUCCESS = "STOCK_SUCCESS";
export const STOCK_CLEAR = "STOCK_CLEAR";

// Major Page
export const MAJOR_FETCHING = "MAJOR_FETCHING";
export const MAJOR_FAILED = "MAJOR_FAILED";
export const MAJOR_SUCCESS = "MAJOR_SUCCESS";
// export const MAJOR_CLEAR = "MAJOR_CLEAR";

// Success Page
export const LOGIN_FETCHING = "LOGIN_FETCHING";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

// Register Page
export const REGISTER_FETCHING = "REGISTER_FETCHING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

// PRoduct Page
export const PRODUCT_FETCHING = "PRODUCT_FETCHING";
export const PRODUCT_SUCCESS = "PRODUCT_SUCCESS";
export const PRODUCT_FAILED = "PRODUCT_FAILED";
export const PRODUCT_CLEAR = "PRODUCT_CLEAR";

// Product Edit Page
export const PRODUCT_EDIT_FETCHING = "PRODUCT_EDIT_FETCHING";
export const PRODUCT_EDIT_SUCCESS = "PRODUCT_EDIT_SUCCESS";
export const PRODUCT_EDIT_FAILED = "PRODUCT_EDIT_FAILED";

export const apiUrl = "https://dummyjson.com/";
export const imageUrl = "http://localhost:8085";

export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";
export const TOKEN = "TOKEN";
export const USERNAME = "USERNAME";
export const USERID = "USERID";

export const LOGIN_STATUS = "LOGIN_STATUS";

export const server = {
  LOGIN_URL: `AKfycbzOUosyAs29x47UA9uTk9B092qwKTsmFzkgY9D7zGuVejzbTx73iKc3cuoVOsvswyk/exec`,
  PRODUCT_URL: `products`,
};

// Error Code
export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED"; // request service timeout
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  "An error has occurred. The photo was unable to upload.";
