import { applyMiddleware, combineReducers, createStore } from 'redux';
import {thunk} from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer } from './Reducers/productReducer';
import { productDetailsReducer } from './Reducers/productDetailsReducer';
import { cartReducer } from './Reducers/cartReducers';
import { userLoginReducer, userRegisterReducer, sendOtpReducer, verifyOtpReducer } from './Reducers/userReducer'; // Import OTP reducers

// Combine all reducers
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    otpSend: sendOtpReducer,  // Added Send OTP reducer
    otpVerify: verifyOtpReducer,  // Added Verify OTP reducer
});

// Retrieve initial state from localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : [];

const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;

// Define the initial state
const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage }, 
};

// Set up middleware with thunk
const middleware = [thunk];

// Create Redux store with reducers, initial state, and middleware
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
