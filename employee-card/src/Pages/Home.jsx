import React , {useState, useEffect} from 'react'
import { InputGroup, Form,Row , Col } from 'react-bootstrap'
import {  getDatabase,ref, child, push, update , onValue} from "firebase/database";
import { getStorage ,getDownloadURL,uploadBytes,ref as storageRef} from 'firebase/storage';
import { database , auth} from '../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const[error, setError] = useState(false);
    const[userId, setUserId] = useState('');
    const navigate=useNavigate()
    const[profileUrl, setprofileUrl] = useState(null)
    const [userData, setUserData] = useState({
        username:'',
        email:'',
        address:'',
        contact:'',
        img_url:'',
        password:''
    })
    const handleChange=(e)=>{
    const {name , value} = e.target;
        setUserData({
            ...userData,
            [name]:value
        })
    }
    const handleCreateData=(e)=>{
        e.preventDefault();
        console.log(userData);
        createUser( userData.email,userData.password, userData.contact);
    }
    function writeNewPost( username, address, email, contact, img_url, password) {
        const db = getDatabase();
        const user = auth.currentUser;
        // A post entry.
        const postData = {
            username: username,
            address: address,
            email: email,
            contact: contact,
            img_url:img_url,
            password:password
        };
        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'posts')).key;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        setUserId(newPostKey)
        const updates = {};
        updates['/posts/' + userId] = postData;
        // updates['/user-posts/' + uid + '/' + newPostKey] = postData
        return update(ref(db), updates);
    }

    async function uploadFileAndPostUrl(file) {
        try {
            const storage = getStorage();
            const storageData = storageRef(storage, file.name); // Update the way of creating the reference
            // Upload the file to Firebase Storage
            await uploadBytes(storageData, file);
            // Get the file's download URL
            const fileUrl = await getDownloadURL(storageData);
            console.log('url', fileUrl)
            setprofileUrl(fileUrl)
            console.log("File URL posted to the database:", fileUrl);
        } catch (error) {
          console.error("Error uploading file and posting URL:", error);
        }
      }
    const createUser = async(email,password,phone) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password, phone);
            const user = userCredential.user;
            setUserId(user.uid)
        } catch (error) {
            console.log(error)
        }
      };

    useEffect(()=>{
        if(userData.username !=='' && userData.address!=='' && userData.email!=='' && userData.contact!=='' && userData.password !=='')
        {
            writeNewPost( userData.username, userData.address, userData.email, userData.contact, profileUrl, userData.password) 
            navigate('/login')
        }
    },[userId])

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
                <Form.Control
                    type='file'
                    name='img_url'
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={(e) => uploadFileAndPostUrl(e.target.files[0])}
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