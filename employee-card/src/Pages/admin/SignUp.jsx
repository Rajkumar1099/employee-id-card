import React , {useState} from 'react'
import { Form , Row, InputGroup, Col, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../firebase'

const SignUp = () => {
    const navigate=useNavigate()
    const [authDetail, setAuthDetail]= useState({
        email:'',
        password:'',
    })

    const handleChange=(e)=>{
        const {name, value}=e.target;
        setAuthDetail({
            ...authDetail,
            [name]:value
        })
    }

    const handleSignUp=(e)=>{
        e.preventDefault()
        createUser(authDetail.email, authDetail.password).then(() => {
            navigate('/');
          });
        }
    const createUser = async(email,password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('user', user)
        } catch (error) {
            console.log(error)
        }
      };
  return (
    <div className='container'> 
        <Row>
            <Col xs={12}  md={6} lg={3}>
                <div className='h4'>Register</div>
            </Col>
        </Row>
        <Row>
            <Col  xs={12}  md={4} lg={4}>
            <Form>
                <InputGroup hasValidation>
                    <InputGroup.Text>User name</InputGroup.Text>
                    <Form.Control type="text" name='username' onChange={handleChange}/>
                    <Form.Control.Feedback type="invalid">
                    Please choose a username.
                    </Form.Control.Feedback>
                </InputGroup>
                <InputGroup hasValidation>
                    <InputGroup.Text>User Email</InputGroup.Text>
                    <Form.Control type="email" name='email' onChange={handleChange}/>
                    <Form.Control.Feedback type="invalid">
                    Please choose a email.
                    </Form.Control.Feedback>
                </InputGroup>
                <InputGroup hasValidation>
                    <InputGroup.Text>User password</InputGroup.Text>
                    <Form.Control type="password" name='password' onChange={handleChange}/>
                    <Form.Control.Feedback type="invalid">
                    Please choose a user password.
                    </Form.Control.Feedback>
                </InputGroup>
                <Row>
                    <Col xs={12} sm={6} md={6} lg={8} >
                        <div className='btn btn-primary  mt-2' onClick={(e)=>handleSignUp(e)}>Register</div>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={4} >
                        <div className='btn btn-primary  mt-2' onClick={()=>{navigate('/login')}}>Login</div>
                    </Col>
                </Row>
            </Form>
            </Col>
        </Row>
    </div>
  )
}

export default SignUp;