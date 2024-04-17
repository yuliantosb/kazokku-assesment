const initalState = {
    currency: null,
    list: null,
};

const currencyReducer = (state = initalState, action) => {
    switch (action.type) {
        case "SET_CURRENCY":
            return {
                ...state,
                currency: action.payload,
            };
        case "SET_CURRENCY_LIST":
            return {
                ...state,
                list: action.payload,
            };
        default:
            return state;
    }
};

export default currencyReducer;
