import {FETCH_ITEMS, UPDATE_FILTER} from "../actions/types";
import axios from "axios";

axios.defaults.withCredentials = true;
export const fetch_items = () => dispatch => {
    axios
        .get("http://localhost:9000/products", {withCredentials: true})
        .then(res => dispatch({
            type: FETCH_ITEMS,
            payload: res.data
        }))
        .catch(err =>
            console.log("Error while fetching items!")
        );
};


export const updateFilters = filters => ({
    type: UPDATE_FILTER,
    payload: filters
});
