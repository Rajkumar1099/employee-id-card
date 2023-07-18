import React , {useEffect, useState} from 'react'
import { Container, Row, Col,Form, InputGroup, Button, Image } from 'react-bootstrap'
import { signInWithEmailAndPassword, signInWithPhoneNumber , getAuth, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase'
import { NavLink, useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification'
import logo from '../../Common/Images/lookatmeprintLogo.png'
const Login = () => {
    const [error, setError] = useState(false);
    const [user, setUser]=useState(null);
    const navigate=useNavigate();
    const [authDetail, setAuthDetail] = useState({
        email:'',
        password:''
    });

    const currentYear = new Date().getFullYear();

    const handleChange=(e)=>{
        const {name, value} = e.target;
        setAuthDetail({
            ...authDetail,
            [name]:value
        })
    }

    const signIn = async(email, password) => {
        try {
        const userCredential = await signInWithEmailAndPassword( auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();
        sessionStorage.setItem("userId", user.uid);
        navigate(`login/view/${user.uid}`)
        console.log('User signed in:', user, token);
      } catch (error) {
        console.error('Error signing in:', error);
      }
      };
    const handleLogin=(e)=>{
        e.preventDefault()
        signIn(authDetail.email, authDetail.password).then(() =>{
            setAuthDetail({
                email:'',
                password:''
            })
          });
    }
  return (
    <div className='container '>
        <Row>
            <Notification title='LookAtMePrint'/>
        </Row>
        <br/>
        <Row >
            <Col xs={12} sm={6} md={6} lg={4}>
                <Image src={logo} fluid/>
            </Col>
            <Col xs={12} sm={6} md={6} lg={6}>
                <Form>
                    <InputGroup hasValidation>
                        <InputGroup.Text>email</InputGroup.Text>
                        <Form.Control type="email" name='email' onChange={handleChange}/>
                        <Form.Control.Feedback type="invalid">
                        Please choose a phone.
                        </Form.Control.Feedback>
                    </InputGroup>
                    <br/>
                    <InputGroup hasValidation>
                        <InputGroup.Text>password</InputGroup.Text>
                        <Form.Control type="password" name='password' onChange={handleChange}/>
                        <Form.Control.Feedback type="invalid">
                        Please choose a password.
                        </Form.Control.Feedback>
                    </InputGroup>
                    <Row>
                        <Col xs={12} sm={6} md={6} lg={6}>
                           
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <NavLink className='text-primary' to='/forgot-password'>Forgot password
                            </NavLink>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col xs={12} sm={6} md={6} lg={6} >
                            <div className='btn btn-primary w-100 mt-2' onClick={(e)=>handleLogin(e)}>Login</div>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <div className='btn btn-secondary w-100 mt-2' onClick={()=>{navigate('/signup')}}>Create New acount</div>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
        <br/>
        <Row>
            <Col xs={12} sm={10} md={10} lg={10}>
            <div className='text'> © {`${currentYear}`}, 24X7 sec, Inc. or its affiliates. All rights reserved.</div>
            </Col>
        </Row>
        <br/>
    </div>
  )
}
export default Login