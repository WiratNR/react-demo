import { combineReducers } from "redux";
import registerReducer, { RegisterState } from "./register.reducer";
import loginReducer, { LoginState } from "./login.reducer";
import productReducer, { ProductState } from "./product.reducer";
import productEditReducer, { ProductEditState } from "./product.edit.reducer";
import stockReducer, { StockState } from "./stock.reducer";
import majorReducer, { MajorState } from "./major.reducer";

export default combineReducers({
  registerReducer,
  loginReducer,
  productReducer,
  productEditReducer,
  stockReducer,
  majorReducer,
});

export interface RootReducers {
  registerReducer: RegisterState;
  loginReducer: LoginState;
  productReducer: ProductState;
  productEditReducer: ProductEditState;
  stockReducer: StockState;
  majorReducer: MajorState;
}
