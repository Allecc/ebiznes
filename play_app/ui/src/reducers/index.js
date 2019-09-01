import {combineReducers} from "redux";
import cartReducer from "./cartReducer";
import itemsReducer from "./itemsReducer";
import userReducer from "./userReducer";

export default combineReducers({
    cart: cartReducer,
    items: itemsReducer,
    user: userReducer
});
