import {FETCH_ITEMS, UPDATE_FILTER} from "../actions/types";

const initialState = {
    items: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ITEMS:
            return {
                ...state,
                items: action.payload
            };
        case UPDATE_FILTER:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
}
