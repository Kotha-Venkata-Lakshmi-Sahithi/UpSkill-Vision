import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Forgetpassword.css';

const ForgotPassword = () => {
    const [identifier, setIdentifier] = useState('test@example.com'); // Default email or phone
    const [otp, setOtp] = useState('123456'); // Default OTP
    const [newPassword, setNewPassword] = useState('defaultPass123'); // Default new password
    const [confirmPassword, setConfirmPassword] = useState('defaultPass123'); // Default confirm password
    const [message, setMessage] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier })
            });
            const data = await response.json();

            if (data.status === 'success') {
                setIsOtpSent(true);
                setMessage('OTP sent to your email/phone.');
            } else {
                setMessage('No account found with this email/phone.');
            }
        } catch (error) {
            setMessage('Error connecting to the server. Please try again later.');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier, otp })
            });
            const data = await response.json();

            if (data.status === 'success') {
                setIsOtpVerified(true);
                setMessage('OTP verified! Please set your new password.');
            } else {
                setMessage('Invalid OTP. Please try again.');
            }
        } catch (error) {
            setMessage('Error connecting to the server. Please try again later.');
        }
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier, newPassword })
            });
            const data = await response.json();

            if (data.status === 'success') {
                setMessage('Password reset successful!');
                setTimeout(() => {
                    navigate('/');  
                }, 2000);
            } else {
                setMessage('Password reset failed. Please try again.');
            }
        } catch (error) {
            setMessage('Error connecting to the server. Please try again later.');
        }
    };

    return (
        <div className="forgot-password-container">
            <h1>Forgot Password</h1>
            
            {!isOtpSent && (
                <div>
                    <label>Email or Mobile Number</label>
                    <input
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Enter your email or mobile number"
                        required
                    />
                    <button onClick={handleSendOtp}>Send OTP</button>
                </div>
            )}

            {isOtpSent && !isOtpVerified && (
                <div>
                    <label>Enter OTP</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        required
                    />
                    <button onClick={handleVerifyOtp}>Verify OTP</button>
                </div>
            )}

            {isOtpVerified && (
                <div>
                    <label>New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                    />
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        required
                    />
                    <button 
                        onClick={handleResetPassword} 
                        disabled={newPassword !== confirmPassword || !newPassword || !confirmPassword}
                    >
                        Set Password
                    </button>
                </div>
            )}

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ForgotPassword;
