import { Tuple, configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: () => new Tuple(thunk),
});

export const persistor = persistStore(store);
