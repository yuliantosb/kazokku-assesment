const initalState = {
    users: null,
};

const userReducer = (state = initalState, action) => {
    switch (action.type) {
        case "SET_USERS":
            return {
                ...state,
                users: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
