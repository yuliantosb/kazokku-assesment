export const getCurrency = (cb) => {
    return async (dispatch, getState) => {
        const {
            user: { access_token },
        } = getState().auth;
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const res = await fetch("/api/currency", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            }).then((res) => {
                if (res.status === 401) {
                    dispatch({
                        type: "SET_AUTH",
                        payload: null,
                    });
                    cb?.({ success: false, message: "Unauthenticated" });
                }
                return res.json();
            });
            if (!res?.success) {
                cb?.({ success: false, message: res?.error?.info });
            } else {
                dispatch({
                    type: "SET_CURRENCY",
                    payload: res,
                });
            }
        } catch (err) {
            cb?.({ success: false, message: err.toString() });
        }
        dispatch({ type: "SET_LOADING", payload: false });
    };
};

export const getCurrencyList = (cb) => {
    return async (dispatch, getState) => {
        const {
            user: { access_token },
        } = getState().auth;
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const res = await fetch("/api/currency/list", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            }).then((res) => res.json());

            if (!res?.success) {
                cb?.({ success: false, message: res?.error?.info });
            } else {
                dispatch({
                    type: "SET_CURRENCY_LIST",
                    payload: res,
                });
            }
        } catch (err) {
            cb?.({ success: false, message: err.toString() });
        }
        dispatch({ type: "SET_LOADING", payload: false });
    };
};
