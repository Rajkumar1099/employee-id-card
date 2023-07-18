import React, { useState } from 'react';
import { auth } from '../../firebase'; // Import the initialized Firebase app
import { signInWithPhoneNumber, signInWithCredential } from 'firebase/auth';
const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      // Send OTP to the provided phone number
      const confirmationResult = await signInWithPhoneNumber(phoneNumber);
      setVerificationId(confirmationResult.verificationId);
      alert('OTP sent successfully. Please check your phone for the code.');
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      // Verify the OTP entered by the user
      const credential = await signInWithCredential(
        auth.PhoneAuthProvider.credential(verificationId, otp)
      );
      // Access the authenticated user from the credential object
      const user = credential.user;
      console.log('Logged in user:', user);
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div>
      <h2>Phone Login</h2>
      <form>
        <input
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={handleSendOTP}>Send OTP</button>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={handleVerifyOTP}>Verify OTP</button>
      </form>
    </div>
  );
};

export default PhoneLogin;
