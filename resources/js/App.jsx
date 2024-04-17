import React from "react";
import ReactDOM from "react-dom/client";
import router from "./utils/router";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("app")).render(
    <ConfigProvider theme={{ token: { colorPrimary: "#227F71" } }}>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </ConfigProvider>
);
