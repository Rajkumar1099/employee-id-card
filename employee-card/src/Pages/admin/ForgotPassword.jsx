import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const auth = getAuth();

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Email sent successfully
        setMessage("Password reset email sent. Please check your inbox.");
      })
      .catch((error) => {
        // Handle errors here
        setMessage("Error: " + error.message);
      });
  };
  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword}>Send Reset Email</button>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;
