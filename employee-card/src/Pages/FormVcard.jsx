import React , {useState, useEffect} from 'react'
import { InputGroup, Form,Row , Col } from 'react-bootstrap'
import {  getDatabase,ref, child, push, update , onValue} from "firebase/database";
import { getStorage ,getDownloadURL,uploadBytes,ref as storageRef} from 'firebase/storage';
import { database , auth} from '../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import './FormVcard.css'
const FormVcard = () => {
    const[error, setError] = useState(false);
    const[userId, setUserId] = useState('');
    const navigate=useNavigate()
    const[profileUrl, setprofileUrl] = useState(null)
    const [userData, setUserData] = useState({
        firstname:'',
        lastname:'',
        email:'',
        contact:'',
        password:'',
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
        createUser( userData.email,userData.password, userData.contact);
    }
    function writeNewPost( firstname, lastname, email, contact) {
        const db = getDatabase();
        const user = auth.currentUser;
        // A post entry.
        const postData = {
           firstname:firstname,
           lastname:lastname,
            email: email,
            contact: contact,
            address:'',
            img_url:'',
            linkedIn:'',
            twitter:'',
            instagram:'',
            facebook:'',
            role:'',
            company_name:'',
            created_at: new Date().toJSON()
        };
        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'posts')).key;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        setUserId(newPostKey);
        const updates = {};
        updates['/posts/' + userId] = postData;
        // updates['/user-posts/' + uid + '/' + newPostKey] = postData
        return update(ref(db), updates);
    }

    // async function uploadFileAndPostUrl(file) {
    //     try {
    //         const storage = getStorage();
    //         const storageData = storageRef(storage, file.name); // Update the way of creating the reference
    //         // Upload the file to Firebase Storage
    //         await uploadBytes(storageData, file);
    //         // Get the file's download URL
    //         const fileUrl = await getDownloadURL(storageData);
    //         console.log('url', fileUrl)
    //         setprofileUrl(fileUrl)
    //         console.log("File URL posted to the database:", fileUrl);
    //     } catch (error) {
    //       console.error("Error uploading file and posting URL:", error);
    //     }
    //   }
    const createUser = async(email,password,phone) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password, phone);
            const user = userCredential.user;
            setUserId(user.uid)
        } catch (error) {
            console.log(error)
        }
      };

      const createNewUsers=(role)=>{
        const db = getDatabase();
        const user = auth.currentUser;
        // A post entry.
        const postData = {
            role:'customer',
            created_at:new Date().toJSON()
        };
        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'users')).key;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        setUserId(newPostKey)
        const updates = {};
        updates['/users/' + userId] = postData;
        // updates['/user-posts/' + uid + '/' + newPostKey] = postData
        return update(ref(db), updates);
      }
    useEffect(()=>{
        if(userData.firstname !=='' && userData.address!=='' && userData.email!=='' && userData.contact!=='' && userData.password !=='')
        {
            writeNewPost( userData.firstname,userData.lastname, userData.email, userData.contact) 
            createNewUsers(userData.role)
            navigate('/admin/vcard')
        }
    },[userId])

  return (
    <div style={{alignContent:'center', padding:'auto'}}>
        <Col  xs={12} sm={6} md={6} lg={6}>
            <br/>
            <div className='bg-light p-5'>
                <div className='h2'>
                    Create Users
                </div>
                <br />
                <Form>
                    <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">First Name</InputGroup.Text>
                    <Form.Control
                        type='text'
                        name='firstname'
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={handleChange}
                    />
                    </InputGroup>
                    <br/>
                    <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Last Name</InputGroup.Text>
                    <Form.Control
                        type='text'
                        name='lastname'
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={handleChange}
                    />
                    </InputGroup>
                    <br />
                    <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Email</InputGroup.Text>
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
                    <InputGroup.Text id="inputGroup-sizing-sm">Phone</InputGroup.Text>
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
                        <div className='btn btn-primary w-100 m-2' onClick={()=>{navigate('/admin/vcard')}}>Cancel</div>
                    </Col>
                    </Row>
                </Form>
            </div>
        </Col>
    </div>
    )
    }
export default FormVcard;
