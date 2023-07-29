import React , { useState} from 'react'
import { Row, Col,Form, InputGroup, Image } from 'react-bootstrap'
import { signInWithEmailAndPassword, signInWithPhoneNumber, getAuth, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import Notification from '../Notification/Notification';
import banner from '../../assets/banner.jpg';
import logo from '../../assets/brand.png';
import { getDatabase, ref, onValue} from 'firebase/database';

const AdminLogin = () => {
    const [error, setError] = useState(false);
    const [role, setRole]=useState(null);
    const [data, setData]=useState([])
    const navigate=useNavigate();
    const locationData = useLocation();
    const page = locationData.pathname === '/user' ? "User Login" : "Admin Login";

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

    const getUserData = async(userId, token)=>{
        const db = getDatabase();
        const postsRef = await ref(db, 'users/'+userId);
        onValue(postsRef, (snapshot) => {
            const postData = snapshot.val();
            const userData = {};
            userData['userId'] = userId;
            userData['userRole'] = postData.role; // admin or user
            userData['token'] = token;
            sessionStorage.setItem("userData", JSON.stringify(userData) );
            if(postData.role === 'admin') {
                navigate(`/admin/vcard`);
           }
           if(postData.role ==='customer') {
                navigate(`/user/details/${userId}`)
           }
        });
    }
    const signIn = async(email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword( auth, email, password);
            const user = userCredential.user;
            const token = await user.getIdToken();
                getUserData(user.uid, token);
        } catch (error) {
            alert(`Wrong Email or Password `)
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
    <div className='container' style={{marginTop: '30px'}}>
        <Row className='mt-4'>
            <Col style={{textAlign: 'center'}} xs={12} sm={6} md={6} lg={6}>
                <Image src={banner} style={{borderRadius:'5px'}} fluid />
            </Col>
            <Col xs={12} sm={6} md={6} lg={6} style={{margin:"0px"}} >
                <div className='p-5' >
                    <div className="text-center">
                        <Image width={120} src={logo} style={{borderRadius:'5px', textAlign: 'center'}} fluid />
                        <div className="h4 p-3" style={{color:"#1e1545", fontWeight:"800"}}>NFC Card - {page}</div>
                    </div>
                    <Form className='form-harizontal'>
                        <div>
                            <Form.Group>
                                <Form.Control className='form-control form-control-lg' type="email" name='email' placeholder='Email' onChange={handleChange} />
                            </Form.Group>
                        </div>
                        <div className='mt-4'>
                            <Form.Group>
                                <Form.Control className='form-control form-control-lg' type="password" name='password' placeholder='Password' onChange={handleChange} />
                            </Form.Group>
                        </div>
                        <div className="mt-4">
                            <Row>
                                <Col xs={12} sm={6} md={6} lg={6} >
                                    <div className='btn d-block btn-lg' style={{background: "#F4B11E", color: "#ffffff", marginBottom:'10px'}} onClick={(e)=>handleLogin(e)}>Login</div>
                                </Col>
                                <br />
                                <Col xs={12} sm={6} md={6} lg={6}>
                                    <div className='btn btn-secondary d-block btn-lg' onClick={()=>{navigate('/')}}>Back</div>
                                </Col>
                            </Row>
                        </div>                        
                    </Form>
                </div>
                
            </Col>
        </Row>
    </div>
  )
}
export default AdminLogin;