import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const auth = getAuth();
  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent successfully
      setSuccessMessage('Password reset email sent. Please check your inbox.');
      setErrorMessage('');
    })
    .catch((error) => {
      // An error occurred while sending the reset email
      setSuccessMessage('');
      setErrorMessage('Error sending the password reset email. Please try again.');
      console.error('Error sending password reset email:', error);
    });
  };
  
  return (
    <div>
      <h2>Password Reset</h2>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword}>Send Reset Email</button>
    </div>
  );
};

export default ForgotPassword;
