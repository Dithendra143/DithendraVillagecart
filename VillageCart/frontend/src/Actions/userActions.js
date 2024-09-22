import axios from 'axios';
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

// User Login Action
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: { 'Content-type': 'application/json' },
        };

        const { data } = await axios.post('/api/users/login/', { username: email, password }, config);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// User Logout Action
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
};

// User Register Action
export const register = (name, email, mobileNumber, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const config = {
            headers: { 'Content-type': 'application/json' },
        };

        const { data } = await axios.post(
            '/api/users/register/',
            { name, email, mobileNumber, password },
            config
        );

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Send OTP Action
export const sendOtp = (mobileNumber) => async (dispatch) => {
    try {
        dispatch({ type: OTP_SEND_REQUEST });

        const config = {
            headers: { 'Content-type': 'application/json' },
        };

        const { data } = await axios.post('/api/users/send-otp/', { mobileNumber }, config);
        dispatch({ type: OTP_SEND_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: OTP_SEND_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Verify OTP Action
export const verifyOtp = (mobileNumber, otp) => async (dispatch) => {
    try {
        dispatch({ type: OTP_VERIFY_REQUEST });

        const config = {
            headers: { 'Content-type': 'application/json' },
        };

        const { data } = await axios.post('/api/users/verify-otp/', { mobileNumber, otp }, config);
        dispatch({ type: OTP_VERIFY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: OTP_VERIFY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Verify OTP and Register Action
export const verifyOtpAndRegister = (name, email, mobileNumber, password, otp) => async (dispatch, getState) => {
    try {
        // Verify the OTP first
        await dispatch(verifyOtp(mobileNumber, otp));

        // Check if OTP verification was successful
        const { otpVerify } = getState();
        if (otpVerify && otpVerify.success) {
            // Proceed with registration if OTP was successfully verified
            dispatch(register(name, email, mobileNumber, password));
        } else {
            // If OTP verification failed, throw an error
            throw new Error('OTP verification failed');
        }
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};
