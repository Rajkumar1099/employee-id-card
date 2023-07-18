import { Form , Row, InputGroup, Col, Button, Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import React, { useState } from "react";
import { getAuth, signInWithPhoneNumber, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [choseMethod, setChoseMethod] = useState(false)
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleSendVerificationCode = async () => {
    try {
      const captchaVerifier = new auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        captchaVerifier
      );
      setVerificationId(confirmationResult.verificationId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await auth.signInWithCredential(credential);
      // User is now logged in with phone number.
      console.log("Phone login successful");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignupWithEmail = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // User is now registered with email and password.
      console.log("Email registration successful");
    } catch (error) {
      console.log(error);
    }
  };


//   const RegisterMethod= choseMethod ? 
//   <Container>
//           <input
//         type="text"
//         placeholder="Phone Number"
//         value={phoneNumber}
//         onChange={(e) => setPhoneNumber(e.target.value)}
//       />
//       <button onClick={handleSendVerificationCode}>
//         Send Verification Code
//       </button>

//       <div>
//         <input
//           type="text"
//           placeholder="Verification Code"
//           value={verificationCode}
//           onChange={(e) => setVerificationCode(e.target.value)}
//         />
//         <button onClick={handleVerifyCode}>Verify Code</button>
//       </div>

//   </Container> 
//   :
//   <Container>
//   <input
//         type="text"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleSignupWithEmail}>Sign up with Email</button>

//       {/* Include a div with id "recaptcha-container" for reCAPTCHA */}
//       <div id="recaptcha-container"></div>
//   </Container>

  return (
    <div>
     <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleSendVerificationCode}>
        Send Verification Code
      </button>
      <div>
        <input
          type="text"
          placeholder="Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <button onClick={handleVerifyCode}>Verify Code</button>
      </div>
    </div>
  );
};

export default SignUp;