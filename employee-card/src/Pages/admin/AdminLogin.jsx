import React , { useEffect, useRef, useState} from 'react'
import { Row, Col,Form, InputGroup, Image } from 'react-bootstrap'
import { signInWithEmailAndPassword, signInWithPhoneNumber, getAuth, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import banner from '../../assets/banner.jpg';
import logo from '../../assets/brand.png';
import { getDatabase, ref, onValue} from 'firebase/database';

const AdminLogin = () => {
    const navigate=useNavigate();
    const locationData = useLocation();
    const [showForgot, setShowForgot] = useState(false);
    const [uuid, setUuId]=useState('')
    /* Forgot Password */
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const Auth = getAuth();

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

    const [page, setPage]=useState('');

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

    const getUserData = async(userId)=>{
        const db = getDatabase();
        const postsRef = ref(db, 'users/'+ userId);
        const userData={}
        onValue(postsRef, (snapshot) => {
            const postData = snapshot.val();
            userData['userId'] = userId;
            userData['isActive'] = postData?.isActive === undefined ? 0 : postData.isActive;
            userData['userRole'] = postData?.role // admin or user
           
            if(postData.role === 'admin') {
                sessionStorage.setItem("userData", JSON.stringify(userData) );
                navigate(`/admin/vcard`)
           }
        });
    }
    // const checkIsActive=(uuid, userData)=>{
    //     const db = getDatabase()
    //     const userActive = ref(db, 'posts/' + uuid);
    //     const onDataUpdate = (snapshot) => {
    //     const postData = snapshot.val() !== null ? snapshot.val() : [];
    //      onValue(userActive, onDataUpdate);
    //       if(postData.isActive === '1')
    //       {
    //         console.log('login', postData.isActive)
    //         sessionStorage.setItem("userData", JSON.stringify(userData) );
    //         navigate(`/user/details/${uuid}`)
    //       }
    //       else if(postData.isActive === '0')
    //       {
    //         alert('Wrong Email or Password ')
    //       }
    //     }
    // }

    const signIn = async(email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword( auth, email, password);
            const user = userCredential.user;
            const token = await user.getIdToken();
            getUserData(user.uid);
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

    useEffect(()=>{
        if(locationData.pathname === '/' || '/user')
        {
            setPage("User Login")
        }
        if(locationData.pathname === '/admin')
        {
            setPage("Admin Login")
        }
       
    },[locationData.pathname])

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleLogin(e);
        }
      };

  return (
    <div  style={{minHeight:'100vh', paddingTop:'40px'}}>
        <Row>
            <Col style={{textAlign: 'center'}} xs={12} sm={6} md={6} lg={6}>
                <Image src={banner} style={{borderRadius:'5px'}} fluid />
            </Col>
            <Col xs={12} sm={6} md={6} lg={6} style={{margin:"0px"}} >
                <div className='p-2' >
                    <div className="text-center">
                        <Image width={120} src={logo} style={{borderRadius:'5px', textAlign: 'center'}} fluid />
                        <div className="h4 p-3" style={{color:"#1e1545", fontWeight:"800"}}>NFC Card - {page}</div>
                    </div>
                    { showForgot ?  <Form className='form-harizontal'>
                        {successMessage && <p>{successMessage}</p>}
                        {errorMessage && <p>{errorMessage}</p>}
                        <div>
                            <Form.Group>
                                <Form.Control 
                                className='form-control form-control-lg' 
                                type="email"
                                 name='email' 
                                 placeholder='Email'
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                        </div>
                        <div className="mt-4">
                            <Row>
                                <Col xs={12} sm={6} md={6} lg={6} >
                                    <div className='btn d-block btn-lg' style={{background: "#F4B11E", color: "#ffffff", marginBottom:'10px'}} onClick={handleForgotPassword}>Send Reset Password</div>
                                </Col>
                                <br />
                                <Col xs={12} sm={6} md={6} lg={6}>
                                    <div className='btn btn-secondary d-block btn-lg' onClick={()=>setShowForgot((t)=>!t)}>Back</div>
                                </Col>
                            </Row>
                        </div>                        
                    </Form>:
                    <Form className='form-harizontal'>
                        <div>
                            <Form.Group>
                                <Form.Control className='form-control form-control-lg' type="email" name='email' placeholder='Email'  onChange={handleChange} />
                            </Form.Group>
                        </div>
                        <div className='mt-4'>
                            <Form.Group>
                                <Form.Control className='form-control form-control-lg' type="password" name='password' onKeyPress={handleKeyPress} placeholder='Password' onChange={handleChange} />
                            </Form.Group>
                            <Row>
                                <Col xs={6} sm={12} md={6} lg={6}>
                                {
                                    <div className='text' style={{color:'#1E1446', textDecoration:'none'}} onClick={()=>{navigate('/user')}}>User login</div>
                                }
                                </Col >
                                <Col xs={6} sm={12} md={6} lg={6}>
                                <div className='text' style={{color:'#1E1446', textDecoration:'none'}} onClick={()=>setShowForgot((t)=>!t)}>Forgot password</div>
                                </Col>
                            </Row>
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
                    }
                </div>
            </Col>
        </Row>
    </div>
  )
}
export default AdminLogin;