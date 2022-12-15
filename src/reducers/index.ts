import { combineReducers } from "redux";
import loginReducer, { LoginState } from "./login.reducer";
import productReducer, { ProductState } from "./product.reducer";
import productDetailReducer, { ProductDetailState } from "./product.detail.reducer";


export default combineReducers({
  loginReducer,
  productReducer,
  productDetailReducer,
});

export interface RootReducers {
  loginReducer: LoginState;
  productReducer: ProductState;
  productDetailReducer: ProductDetailState;
}
