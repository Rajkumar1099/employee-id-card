import React , {useEffect, useState} from 'react'
import { Container, Row, Col,Form, InputGroup, Button, Image } from 'react-bootstrap'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [error, setError] = useState(false)
    const navigate=useNavigate()
    const [authDetail, setAuthDetail] = useState({
        email:'',
        password:''
    })
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setAuthDetail({
            ...authDetail,
            [name]:value
        })
    }
    const signIn = async(email, password) => {
        console.log("data", email, password)
        localStorage.setItem("userEmail", email)
        try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem('uid', user.uid)
        const token = await user.getIdToken();
        console.log('User signed in:', user, token);
      } catch (error) {
        console.error('Error signing in:', error);
      }
      };
    const handleLogin=(e)=>{
        e.preventDefault()
        signIn(authDetail.email, authDetail.password).then(() => {
            navigate('/details')
            setAuthDetail({
                email:'',
                password:''
            })
          });
    }
  return (
    <div className='container '>
        <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
            <div className='h4'>Login</div>
        </Col>
        </Row>
        <Row >
            <Col xs={12} sm={6} md={6} lg={6}>
                <Form>
                    <InputGroup hasValidation>
                        <InputGroup.Text>password</InputGroup.Text>
                        <Form.Control type="password" name='password' onChange={handleChange}/>
                        <Form.Control.Feedback type="invalid">
                        Please choose a username.
                        </Form.Control.Feedback>
                    </InputGroup>
                    <br/>
                    <InputGroup hasValidation>
                        <InputGroup.Text>User Email</InputGroup.Text>
                        <Form.Control type="text" name='email' onChange={handleChange}/>
                        <Form.Control.Feedback type="invalid">
                        Please choose a email.
                        </Form.Control.Feedback>
                    </InputGroup>
                    <br/>
                    <Row>
                        <Col xs={12} sm={6} md={6} lg={6} >
                            <div className='btn btn-primary w-100 mt-2' onClick={(e)=>handleLogin(e)}>Login</div>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <div className='btn btn-primary w-100 mt-2' onClick={()=>{navigate('/register')}}>Register</div>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    </div>
  )
}

export default Login