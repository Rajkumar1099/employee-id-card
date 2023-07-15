import React , {useState, useEffect} from 'react'
import { InputGroup, Form,Row , Col } from 'react-bootstrap'
import {  getDatabase,ref, child, push, update , onValue} from "firebase/database";
import { database , auth} from '../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
const Home = () => {
    const[error, setError] = useState(false)
    const[userId, setUserId] = useState('')
    const [userData, setUserData] = useState({
        username:'',
        email:'',
        address:'',
        contact:'',
        password:''
    })
    const navigate=useNavigate()
    const handleChange=(e)=>{
    const {name , value} = e.target;
        setUserData({
            ...userData,
            [name]:value
        })
    }
    const handleCreateData=(e)=>{
            e.preventDefault();
            // createNewUsers(userData);
        writeNewPost( userData.username, userData.address, userData.email, userData.contact, userData.password) 
        createUser( userData.email,userData.password, userId)
        setUserData({
            username:'',
            email:'',
            address:'',
            contact:'',
            password:''
        })
    }
 
    function writeNewPost( username, address, email, contact, password) {
        const db = getDatabase();
        const user = auth.currentUser;
        // A post entry.
        const postData = {
        username: username,
        address: address,
        email: email,
        contact: contact,
        password:password
        };

        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'posts')).key;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        setUserId(newPostKey)
        const updates = {};
        updates['/posts/' + newPostKey] = postData;
        // updates['/user-posts/' + uid + '/' + newPostKey] = postData
        return update(ref(db), updates);
    }
    const createUser = async(email,password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password, userId);
            const user = userCredential.user;
            setError((t)=>!t)
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
      };
useEffect(()=>{
    setUserData({
    username:'',
    email:'',
    address:'',
    contact:'',
    password:''
})
},[error])

  return (
<Col xs={12} sm={6} md={6} lg={6}>
    <div className='h4'> Create Id Card</div>
    <Form>
        <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">User Name</InputGroup.Text>
        <Form.Control
            type='test'
            name='username'
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleChange}
        />
        </InputGroup>
        <br />
        <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">User email</InputGroup.Text>
        <Form.Control 
            type="email"
            name='email'
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleChange}
        />
        </InputGroup>
        <br />
        <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Contact</InputGroup.Text>
        <Form.Control
            type='number'
            name='contact'
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleChange}
        />
        </InputGroup>
        <br />
        <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Address</InputGroup.Text>
        <Form.Control
            type='text'
            name='address'
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleChange}
        />
        </InputGroup>
        <br />
        <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Password</InputGroup.Text>
        <Form.Control
            type='password'
            name='password'
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleChange}
        />
        </InputGroup>
        <br/>
        <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
            <div className='btn btn-primary w-100 m-2' onClick={(e)=>handleCreateData(e)}>Save</div>
        </Col>
        
        <Col xs={12} sm={6} md={6} lg={6}>
            <div className='btn btn-primary w-100 m-2' onClick={()=>{setError((t)=>!t)}}>Cancel</div>
        </Col>
        </Row>
    </Form>
</Col>
  )
}

export default Home