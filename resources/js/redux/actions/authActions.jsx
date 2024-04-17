export const login = (data, cb) => {
    return async (dispatch) => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const {
                errors,
                message,
                data: res,
            } = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then((res) => res.json());

            if (errors) {
                cb?.({ success: false, message, errors });
            } else {
                dispatch({
                    type: "SET_AUTH",
                    payload: res,
                });
            }
        } catch (err) {
            cb?.({ success: false, message: err.toString() });
        }
        dispatch({ type: "SET_LOADING", payload: false });
    };
};

export const logout = (cb) => {
    return async (dispatch, getState) => {
        const {
            user: { access_token },
        } = getState().auth;
        try {
            const { errors, message } = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            }).then((res) => res.json());

            if (errors) {
                cb?.({ success: false, message, errors });
            } else {
                dispatch({
                    type: "SET_AUTH",
                    payload: null,
                });

                cb?.({ success: true, message });
            }
        } catch (err) {
            cb?.({ success: false, message: err.toString() });
        }
    };
};
