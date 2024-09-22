import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtpAndRegister } from '../Actions/userActions';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function RegisterScreen() {
    const [step, setStep] = useState(1);  // Step 1: Registration, Step 2: OTP Verification
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');  // Confirm Password field
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const otpSend = useSelector((state) => state.otpSend);
    const { loading: otpLoading, error: otpError, success: otpSent } = otpSend;

    const otpVerify = useSelector((state) => state.otpVerify);
    const { loading: otpVerifyLoading, error: otpVerifyError, success: otpVerified } = otpVerify;

    useEffect(() => {
        if (otpSent) {
            console.log("OTP sent successfully.");
            setStep(2);  // Move to OTP verification step if OTP was sent
        }
        if (otpVerified) {
            console.log("OTP verified successfully, user registered.");
            navigate('/login');  // Redirect to login on successful OTP verification and registration
        }
    }, [otpSent, otpVerified, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (step === 1) {
            if (password !== confirmPassword) {
                setMessage('Passwords do not match');
                return;
            }
            console.log("Sending OTP to mobile number:", mobile);
            await dispatch(sendOtp(mobile));
        } else if (step === 2) {
            console.log("Verifying OTP and registering user.");
            await dispatch(verifyOtpAndRegister({ name, email, mobile, password, otp }));
        }
    };

    return (
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
                <h1>Register</h1>
                {message && <p style={{ color: 'red' }}>{message}</p>}
                {step === 1 ? (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="mobile">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter mobile number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button type="submit" variant="primary" className="mt-3" disabled={otpLoading}>
                            {otpLoading ? 'Sending...' : 'Send OTP'}
                        </Button>
                        {otpError && <p style={{ color: 'red' }}>{otpError}</p>}
                    </Form>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="otp">
                            <Form.Label>Enter OTP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </Form.Group>

                        <Button type="submit" variant="primary" className="mt-3" disabled={otpVerifyLoading}>
                            {otpVerifyLoading ? 'Verifying...' : 'Verify & Register'}
                        </Button>
                        {otpVerifyError && <p style={{ color: 'red' }}>{otpVerifyError}</p>}
                    </Form>
                )}
            </Col>
        </Row>
    );
}

export default RegisterScreen;
