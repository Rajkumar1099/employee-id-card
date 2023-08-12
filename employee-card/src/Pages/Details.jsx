import React, { useState, useEffect, useRef } from 'react'
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { Card, Button, Image, Row,Col, Badge } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import {BsFillTelephoneFill} from 'react-icons/bs';
import {BiLogoWhatsapp} from 'react-icons/bi';
import { HiOutlineMail } from 'react-icons/hi';
import { MdOutlineLocationOn } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import { AiTwotoneEdit } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';
import {BiLogoTwitter} from 'react-icons/bi';
import { AiFillFacebook } from 'react-icons/ai'
import { FaInstagramSquare } from 'react-icons/fa'
import dummyuser from '../assets/dummyuser.jpg';
import '../assets/css/style.css';
import { getUserDetails } from '../Redux/User/Action';
import { useDispatch } from 'react-redux';
import '../assets/css/details.css'

function Details() {
    const {id} =useParams();
    const dispatch=useDispatch();
    const [userValue, setUserValue] = useState(null);
    const navigate= useNavigate()
    const db = getDatabase();
    let userData = sessionStorage.getItem('userData');
    userData = JSON.parse(userData);
    const userRole = userData !== null ? userData.userRole : null
    const handleEdite=(steps)=>{
        if ( userRole == 'customer'){
            navigate(`/user/edit/${id}/${steps}`);
        }
        if( userRole == 'admin'){
            navigate(`/admin/edit/${id}/${steps}`);
        }
    }
    useEffect(() => {
        const fetchPosts = async () => {
          const postsRef = ref(db, 'posts/' + id);
          const onDataUpdate = (snapshot) => {
            const postData = snapshot.val() !== null ? snapshot.val() : [];
            setUserValue(postData);
          };
          onValue(postsRef, onDataUpdate);
          return () => {
            off(postsRef, onDataUpdate);
          };
        };
        fetchPosts();
      }, []);
  return (
    <div className="row">
        <div id="msform">
            <fieldset>
                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <Image  src={userValue?.img_url ? userValue?.img_url : dummyuser } width={120} roundedCircle />
                        {
                            userData !== null ? <AiTwotoneEdit className='edit-btn' onClick={()=>handleEdite(1)} /> :''
                        }
                    </Col>
                </Row>
                <div className="h2 fs-title">{userValue?.firstname} {userValue?.lastname}</div>
                <div className="h6">{userValue?.role}</div>
                <hr />
                <h3 className="h4 fs-subtitle">Personal Info</h3>
                <hr />
                <div>
                    <Row> 
                       <Col style={{textAlign:'left'}}>
                       {  userValue?.company_name ?
                                <div><TbWorld style={{color:'#fbaa19'}}/>&nbsp;{userValue?.company_name}</div>
                                :''
                            }
                            {
                            userValue ?.contact ?
                                <div ><BsFillTelephoneFill style={{color:'#fbaa19'}}/>&nbsp;{userValue?.contact}</div>
                                :''
                            }
                            {userValue?.email ?
                                <div style={{padding:'2px'}}><HiOutlineMail style={{color:'#fbaa19'}}/>&nbsp;{userValue?.email}</div>
                                :''
                            }
                            
                            {userValue?.whats_app ?
                                <div ><BsFillTelephoneFill style={{color:'#fbaa19'}}/>&nbsp;{userValue?.whats_app}</div>
                                :''
                            }                        
                       </Col>
                    </Row>
                </div>
            </fieldset>
        </div>
{
    userData !==null ?  <div id="msform" className="col-md-12 col-md-offset-3">
    <fieldset>
         <Row>
             <Col xs={12} md={10} lg={10}>
             </Col>
             <Col xs={12} md={2} lg={2} > 
                 {
                     userData?.userRole !=='' ? <AiTwotoneEdit className='edit-btn' onClick={()=>handleEdite(2)} /> :''
                 }
             </Col>
         </Row>
         <h3 className="h4 fs-subtitle">Social Networks</h3>
         <hr />
         <div>
             <Row>
                 <Col xs={12} style={{textAlign:'left'}}>
                     {userValue?.linkedIn  ?
                     <div > <AiFillLinkedin style={{color:'#fbaa19'}}/>&nbsp;&nbsp;LinkedIn</div>
                     :''
                     }
                     {
                     userValue?.twitter  ?
                            <div><BiLogoTwitter style={{color:'#fbaa19'}}/>&nbsp;&nbsp;Twitter</div> 
                     :''
                      }
                     {userValue?.insta ?
                     <div><FaInstagramSquare style={{color:'#fbaa19'}}/>&nbsp;&nbsp;Instagram</div>
                         :''
                     } 
                     { userValue?.facebook ? 
                     <div><AiFillFacebook style={{color:'#fbaa19'}}/>&nbsp;&nbsp;Facebook</div>
                         :''
                     }
                 </Col>
             </Row>
         </div>
     </fieldset>
 </div> 
  :''
}
{
    userData !==null ?  <div id="msform" className="col-md-12 col-md-offset-3">
    <fieldset>
         <Row>
             <Col xs={12} md={10} lg={10}>
             </Col>
             <Col xs={12} md={2} lg={2} > 
                 {
                     userData !== null ? <AiTwotoneEdit className='edit-btn' onClick={()=>handleEdite(3)} /> :''
                 }
             </Col>
         </Row>
         <h3 className="h4 fs-subtitle">Personal Details</h3>
         <hr />
         
         <div>
             <Row>
                 <Card.Text ></Card.Text>
                 <Col xs={12} style={{textAlign:'left'}}>
                 {userValue?.address ? 
                 <div>
                     <MdOutlineLocationOn style={{color:'#fbaa19'}}/>&nbsp;&nbsp;Address
                 </div>
                     :''
                 } 
                 </Col>
             </Row>
         </div>
     </fieldset>
 </div> :''
}
    </div>
  )
}

export default Details