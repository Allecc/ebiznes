import {ADD_QUANTITY, ADD_TO_CART, CHECKOUT, GET_CART, REMOVE_FROM_CART, SUB_QUANTITY,} from "../actions/types";

const initialState = {
    cartItems: [],
    total: 0
};


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CART:
            return {
                ...state
            };
        case ADD_TO_CART: {
            let addedItem = action.item;
            //check if the action id exists in the items
            let existed_item = state.cartItems.find(item => addedItem.id === item.id)
            if (existed_item) {
                addedItem.localQuantity += 1;
                return {
                    ...state,
                    total: state.total + addedItem.regular_price
                }
            } else {
                addedItem.localQuantity = 1;
                //calculating the total
                let newTotal = state.total + addedItem.regular_price;

                return {
                    ...state,
                    cartItems: [...state.cartItems, addedItem],
                    total: newTotal
                }

            }
        }
        case REMOVE_FROM_CART: {
            let itemToRemove = state.cartItems.find(item => action.id === item.id);
            let new_items = state.cartItems.filter(item => action.id !== item.id);

            //calculating the total
            let newTotal = state.total - (itemToRemove.regular_price * itemToRemove.localQuantity);
            return {
                ...state,
                cartItems: new_items,
                total: newTotal
            };
        }
        case ADD_QUANTITY: {
            let addedItem = state.cartItems.find(item => item.id === action.id);
            addedItem.localQuantity += 1;
            let newTotal = state.total + addedItem.regular_price;
            return {
                ...state,
                total: newTotal
            };
        }
        case SUB_QUANTITY: {
            let addedItem = state.cartItems.find(item => item.id === action.id);
            //if the qt == 0 then it should be removed
            if (addedItem.localQuantity === 1) {
                let new_items = state.cartItems.filter(item => item.id !== action.id);
                let newTotal = state.total - addedItem.regular_price;
                return {
                    ...state,
                    cartItems: new_items,
                    total: newTotal
                }
            } else {
                addedItem.localQuantity -= 1;
                let newTotal = state.total - addedItem.regular_price;
                return {
                    ...state,
                    total: newTotal
                };
            }
        }
        case CHECKOUT: {
            return {
                cartItems: [],
                total: 0
            };
        }
        default:
            return state;
    }
}
