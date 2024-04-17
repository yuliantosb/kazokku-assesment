export const getUser = (data, cb) => {
    return async (dispatch, getState) => {
        const {
            user: { access_token },
        } = getState().auth;
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const res = await fetch(
                `/api/user?${new URLSearchParams(data).toString()}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            ).then((res) => {
                if (res.status === 401) {
                    dispatch({
                        type: "SET_AUTH",
                        payload: null,
                    });
                    cb?.({ success: false, message: "Unauthenticated" });
                }
                if (res.status === 403) {
                    cb?.({ success: false, message: "Forbidden" });
                }
                return res.json();
            });

            dispatch({
                type: "SET_USERS",
                payload: res,
            });
        } catch (err) {
            cb?.({ success: false, message: err.toString() });
        }
        dispatch({ type: "SET_LOADING", payload: false });
    };
};

export const addUser = (data, cb) => {
    return async (dispatch, getState) => {
        const {
            user: { access_token },
        } = getState().auth;
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const { message, errors } = await fetch(`/api/user`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
                body: JSON.stringify(data),
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

            if (errors) {
                cb?.({ success: false, message, errors });
            } else {
                cb?.({ success: true, message });
            }
        } catch (err) {
            cb?.({ success: false, message: err.toString() });
        }
        dispatch({ type: "SET_LOADING", payload: false });
    };
};

export const editUser = (data, id, cb) => {
    return async (dispatch, getState) => {
        const {
            user: { access_token },
        } = getState().auth;
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const { message, errors } = await fetch(`/api/user/${id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
                body: JSON.stringify(data),
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

            if (errors) {
                cb?.({ success: false, message, errors });
            } else {
                cb?.({ success: true, message });
            }
        } catch (err) {
            cb?.({ success: false, message: err.toString() });
        }
        dispatch({ type: "SET_LOADING", payload: false });
    };
};

export const deleteUser = (id, cb) => {
    return async (dispatch, getState) => {
        const {
            user: { access_token },
        } = getState().auth;
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const { message, errors } = await fetch(`/api/user/${id}`, {
                method: "DELETE",
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

            if (errors) {
                cb?.({ success: false, message, errors });
            } else {
                cb?.({ success: true, message });
            }
        } catch (err) {
            cb?.({ success: false, message: err.toString() });
        }
        dispatch({ type: "SET_LOADING", payload: false });
    };
};

export const getUserById = (id, cb) => {
    return async (dispatch, getState) => {
        const {
            user: { access_token },
        } = getState().auth;
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const { message, errors, data } = await fetch(`/api/user/${id}`, {
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

            if (errors) {
                cb?.({ success: false, message, errors });
            } else {
                cb?.({ success: true, message, data });
            }
        } catch (err) {
            cb?.({ success: false, message: err.toString() });
        }
        dispatch({ type: "SET_LOADING", payload: false });
    };
};
