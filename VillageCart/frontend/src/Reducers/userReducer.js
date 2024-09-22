import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    OTP_SEND_REQUEST,
    OTP_SEND_SUCCESS,
    OTP_SEND_FAIL,
    OTP_VERIFY_REQUEST,
    OTP_VERIFY_SUCCESS,
    OTP_VERIFY_FAIL,
} from '../Constants/userConstants';

// User Login Reducer
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

// User Register Reducer
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

// Send OTP Reducer
export const sendOtpReducer = (state = {}, action) => {
    switch (action.type) {
        case OTP_SEND_REQUEST:
            return { loading: true };
        case OTP_SEND_SUCCESS:
            return { loading: false, success: true, otpInfo: action.payload };
        case OTP_SEND_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Verify OTP Reducer
export const verifyOtpReducer = (state = {}, action) => {
    switch (action.type) {
        case OTP_VERIFY_REQUEST:
            return { loading: true };
        case OTP_VERIFY_SUCCESS:
            return { loading: false, success: true, otpVerified: action.payload };
        case OTP_VERIFY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
