import axios from 'axios'
import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from '../Constants/productConstants'

export const listProductDetails = (_id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        // Make API call to fetch product details based on the product ID
        const { data } = await axios.get(`/api/products/${_id}/`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,  // Send the fetched product details as payload
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};
