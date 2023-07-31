import React, { useState, useEffect, useRef } from 'react'
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { Card, Button, Image, Row,Col } from 'react-bootstrap';
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

function Details() {
    const {id} =useParams();
    const [userValue, setUserValue] = useState(null);
    const navigate= useNavigate()
    const db = getDatabase();
    let userData = sessionStorage.getItem('userData');
    userData = JSON.parse(userData);
    const userRole = userData !== null ? userData.userRole : null
    const handleEdite=()=>{
        if ( userRole == 'customer'){
            navigate(`/user/edit/${id}`);
        }
        if ( userRole == 'admin'){
            navigate(`/admin/edit/${id}`);
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
          // Clean up the listener when the component unmounts
          return () => {
            off(postsRef, onDataUpdate);
          };
        };
        fetchPosts();
      }, [db, id]);
  return (
    <div className="row">
        <div id="msform" className="col-md-12 col-md-offset-3">
            <fieldset>
                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <Image  src={userValue?.img_url ? userValue?.img_url : dummyuser } width={120} roundedCircle />
                        <AiTwotoneEdit className='edit-btn' onClick={handleEdite} />
                    </Col>
                    <div className="h2 fs-title">{userValue?.firstname} {userValue?.lastname}</div>
                    <div className="h6">{userValue?.role}</div>    
                </Row>
                <div className="h2 fs-title">{userValue?.firstname} {userValue?.lastname}</div>
                <div className="h6">{userValue?.role}</div>
                <hr />
                <h3 className="h4 fs-subtitle">Personal Info</h3>
                <hr />
                <div>
                    <Row>
                        <Card.Text >{userValue?.role}-{userValue?.firstname}</Card.Text>
                        <Col xs={12} style={{textAlign:'left'}}>
                            {userValue?.company_name ?<Card.Text ><TbWorld style={{color:'#fbaa19'}}/> {userValue?.company_name}</Card.Text>:''}
                            {userValue?.email ? <Card.Text ><HiOutlineMail style={{color:'#fbaa19'}} /> {userValue?.email}</Card.Text> :''}
                            {userValue?.contact  ? <Card.Text ><BsFillTelephoneFill style={{color:'#fbaa19'}}/> {userValue?.contact}</Card.Text> :'' }
                            {userValue?.whats_app  ? <Card.Text ><BiLogoWhatsapp style={{color:'green'}}/> {userValue?.whats_app}</Card.Text> :''}
                            
                        </Col>
                    </Row>
                </div>
            </fieldset>
        </div>
        <div id="msform" className="col-md-12 col-md-offset-3">
           <fieldset>
                <Row>
                    <Col xs={12} md={10} lg={10}>
                    </Col>
                    <Col xs={12} md={2} lg={2} > <AiTwotoneEdit onClick={handleEdite} /></Col>
                </Row>
                <h3 className="h4 fs-subtitle">Social Networks</h3>
                <hr />
                
                <div>
                    <Row>
                        <Col xs={12} style={{textAlign:'left'}}>
                            {userValue?.linkedIn  ? <Card.Text ><AiFillLinkedin style={{color:'#fbaa19'}}/> {userValue?.linkedIn}</Card.Text> :'' }
                            {userValue?.twitter  ? <Card.Text ><BiLogoTwitter style={{color:'green'}}/> {userValue?.twitter}</Card.Text> :''}
                            {userValue?.insta ?<Card.Text ><FaInstagramSquare style={{color:'#fbaa19'}}/> {userValue?.insta}</Card.Text>:''} 
                            {userValue?.facebook ? <Card.Text ><AiFillFacebook style={{color:'#fbaa19'}} /> {userValue?.facebook}</Card.Text> :''}
                        </Col>
                    </Row>
                </div>
            </fieldset>
        </div> 
        <div id="msform" className="col-md-12 col-md-offset-3">
           <fieldset>
                <Row>
                    <Col xs={12} md={10} lg={10}>
                    </Col>
                    <Col xs={12} md={2} lg={2} > <AiTwotoneEdit onClick={handleEdite} /></Col>
                </Row>
                <h3 className="h4 fs-subtitle">Personal Details</h3>
                <hr />
                
                <div>
                    <Row>
                        <Card.Text ></Card.Text>
                        <Col xs={12} style={{textAlign:'left'}}>
                        {userValue?.address ? <Card.Text ><MdOutlineLocationOn style={{color:'#fbaa19'}} />{userValue?.address}</Card.Text> :''} 
                        </Col>
                    </Row>
                </div>
            </fieldset>
        </div> 
    </div>
  )
}

export default Details