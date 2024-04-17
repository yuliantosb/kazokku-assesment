import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import loadingReducer from "./loadingReducer";
import currencyReducer from "./currencyReducer";
import userReducer from "./userReducer";

export default combineReducers({
    auth: persistReducer(
        {
            key: "auth",
            storage,
        },
        authReducer
    ),
    currency: persistReducer(
        {
            key: "currency",
            storage,
        },
        currencyReducer
    ),
    user: persistReducer(
        {
            key: "user",
            storage,
        },
        userReducer
    ),
    loading: loadingReducer,
});
