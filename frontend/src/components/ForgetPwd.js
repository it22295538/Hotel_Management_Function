

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

function PasswordReset() {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpError, setOtpError] = useState('');
    const [resetError, setResetError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false); // New state to track password reset success
    const [otpTimestamp, setOtpTimestamp] = useState(0);

    const ApiURL = "http://localhost:8070";

    async function handleSendOTP() {
        try {
            const response = await axios.post(`${ApiURL}/Hotel/Reset/send-otp`, { email });
            if (response.data.success) {
                setOtpSent(true);
                setOtpError('');
                setSuccessMessage('OTP sent to email. Please check.'); // Set success message here
                setOtpCode(response.data.otp.toString());
                setOtpTimestamp(response.data.timestamp);
            } else {
                setOtpError('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setOtpError('Failed to send OTP. Please try again.');
        }
    }

    async function verifyOTP() {
        try {

            const currentTime = Date.now();
          
            if (currentTime - otpTimestamp > 120000) {
                setOtpError('OTP expired. Please request a new one.');
                return;
            }
            if (otp === otpCode) {
                setOtpVerified(true);
                return { success: true }; 
            } else {
                setOtpError('Invalid OTP. Please try again.');
                return { success: false }; 
            }
        } catch (error) {
            console.error(error);
            setOtpError('Failed to verify OTP. Please try again.');
            return { success: false }; 
        }
    }
    
    async function handleResetPassword() {
        try {
           
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if (!passwordRegex.test(newPassword)) {
                setResetError('Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
                return;
            }
    
            
            const otpVerificationResponse = await verifyOTP();
            if (!otpVerificationResponse.success) {
                setResetError('Invalid OTP. Please try again.');
                return;
            }
        
            
            const response = await axios.post(`${ApiURL}/Hotel/Reset/reset-password`, {email,newPassword });
            console.log(response); // Log the response for inspection
    
            
            if (response.status === 200 && response.data.success) {
                
                setResetSuccess(true); 
                setResetError('');
                setOtpVerified(false); 
                setOtpSent(false); 
                setNewPassword(''); 
                setOTP(''); 
                setSuccessMessage('Password reset successfully'); 
            } else {
                // Password reset failed
                setResetError('Failed to reset password. Please try again.');
            }
        } catch (error) {
            console.error("Error in resetting password:", error);
            setResetError('Failed to reset password. Please try again.');
        }
    }
    
    return (
        <div className="container mt-5">
            <h6>check your email for otp</h6>
            <br></br>
            {successMessage && resetSuccess && <Alert variant="success">{successMessage}</Alert>}
            {!resetSuccess && (
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" onClick={handleSendOTP}>Send OTP</Button>
                    <br />
                    {otpError && <Alert variant="danger" className="mt-3">{otpError}</Alert>}
                </Form>
            )}
            <br />
            {otpSent && (
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="OTP" value={otp} onChange={(e) => setOTP(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" onClick={verifyOTP}>Verify OTP</Button>
                </Form>
            )}
            {otpVerified && (
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" onClick={handleResetPassword}>Reset Password</Button>
                    {resetError && <Alert variant="danger" className="mt-3">{resetError}</Alert>}
                </Form>
            )}
        </div>
    );
}

export default PasswordReset;
