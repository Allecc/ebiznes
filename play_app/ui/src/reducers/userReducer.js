import {GET_USER, SET_USER} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    isAdmin: false,
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state
            };
            case SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !isEmpty(action.payload),
                isAdmin: action.payload.roleId === 1
            };
        default:
            return state;
    }
}
