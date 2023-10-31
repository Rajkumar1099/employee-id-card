import React ,{useEffect, useState}from 'react'
import { Card, Image, Row, Col, Badge } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom';
import {FaSquarePhone} from 'react-icons/fa6'
import {BiLogoWhatsapp} from 'react-icons/bi'
import { ImMail} from 'react-icons/im'
import { TbWorld } from 'react-icons/tb';
import dummyuser from '../assets/dummyuser.jpg';
import { MdOutlineLocationOn } from 'react-icons/md';
import Threads from '../assets/threads.svg'
import { AiFillLinkedin } from 'react-icons/ai';
import {BiLogoTwitter} from 'react-icons/bi';
import { AiFillFacebook } from 'react-icons/ai'
import {BiLogoPinterest} from 'react-icons/bi'
import { BsYoutube } from "react-icons/bs"
import { BsInstagram } from 'react-icons/bs'
import { FaWhatsappSquare } from 'react-icons/fa'
import { getDatabase, ref, onValue, off } from 'firebase/database';
import 'font-awesome/css/font-awesome.min.css';
import logo from "../assets/brand.png"
const  CustomerVCard = () => {
    const [link, setLink] = useState(false)
    const {id} =useParams();
    const [userValue, setUserValue] =useState();
      const linearGradient = 'linear-gradient(to bottom right, red, pink, yellow)';
      const iconStyle = {
        backgroundImage: linearGradient,
      };
      useEffect(()=>{
        const db=getDatabase()
        const fetchPosts = async () => {
            const postsRef = ref(db, 'posts/' + id);
            const onDataUpdate = (snapshot) => {
              const postData = snapshot.val() !== null ? snapshot.val() : [];
              console.log("post",postData)
              setUserValue(postData);
            };
            onValue(postsRef, onDataUpdate);;
            return () => {
              off(postsRef, onDataUpdate);
            };
          };
          fetchPosts();
      },[]);
    return (
        <div style={{height:'100%'}}>
            <Card style={{ height:"auto" ,marginTop:"2rem" , padding:'1rem', backgroundColor:'greay', textDecoration:'none' }}>
                <div style={{textAlign:'center',width:'100%', height:'130px',  backgroundColor:'#f5b21f' , clipPath: "polygon(100% 1%, 65% 50%, 100% 15%, 100% 74%, 52% 49%, 0 74%, 0 33%, 36% 49%, 1% 23%, 0 1%)"}}>
                    <Row>
                        <Col > 
                            <div style={{color:'#000000',fontFamily: 'Aleo Bold', fontSize:'20px'}}>
                                <Image width={50} src={logo} style={{borderRadius:'5px', textAlign: 'center'}} fluid />
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row style={{ marginTop:'-65px'}}>
                    <Col>
                       <div style={{textAlign:'center', backgroundColor:'#796EB2'}}>
                            <Image variant="top" src={`${userValue?.img_url ? userValue?.img_url : dummyuser}`} style={{width:'80px', height:'80px', backgroundColor:'#f5b21f', backgroundColor:'inherit'}} roundedCircle/>
                       </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{textAlign:'center', marginLeft:'10px', color:'#796EB2' }} className='h5'>{userValue?.firstname} {userValue?.lastname}</div>
                        <div style={{textAlign:'center', marginLeft:'10px', fontSize:'12px', color:'#796EB2' }}>{userValue?.role} at  {userValue?.company_name} </div>
                    </Col>
                </Row>
                <hr style={{borderTop: '1px solid #f5b21f'}} />
                    <Card.Body>
                        <Row style={{textAlign:'center' }}>
                            {/* <div >
                                <div style={{color:'#1E1545' , fontWeight:'normal', fontSize:'25px',fontFamily:'Aleo Bold', lineHeight:'50px'}}>{userValue?.role}</div>
                            </div> */}
                        </Row>
                        <Row>
                            <Col xs={12} style={{textAlign:'left' , color:'#1E1545' , fontWeight:'normal', fontFamily:'Aleo Bold'}} >
                                {userValue?.contact  ?
                                    <Row>
                                        <Col xs={2} ><FaSquarePhone style={{color:'#f5b21f', fontSize:'20px'}}/></Col> 
                                        <Col xs={10}> <Card.Text style={{color: '#1e1545'}} > {userValue?.contact}</Card.Text> </Col> 
                                    </Row>
                                :'' }
                                {userValue?.whatsapp  ? 
                                    <Row>
                                        <Col xs={2} ><FaWhatsappSquare style={{color:'#f5b21f', fontSize:'20px'}}/> </Col> 
                                        <Col xs={10}> <Card.Text style={{color: '#1e1545'}} > {userValue?.whatsapp}</Card.Text> </Col> 
                                    </Row>
                                :''}
                                {userValue?.email ? 
                                    <Row>
                                        <Col xs={2} ><ImMail style={{color:'#f5b21f' , fontSize:'20px'}}/> </Col> 
                                        <Col xs={10}> <Card.Text style={{color: '#1e1545'}} > {userValue?.email}</Card.Text> </Col> 
                                    </Row>
                                :''}
                                 {userValue?.company_name ?
                                    <Row>
                                        <Col xs={2} ><TbWorld style={{color:'#f5b21f', fontSize:'20px'}}/> </Col> 
                                        <Col xs={10}> <Card.Text style={{color: '#1e1545'}} > {userValue?.company_name}</Card.Text> </Col> 
                                    </Row>
                                :''}
                                {userValue?.address ? 
                                    <Row>
                                        <Col xs={2} ><MdOutlineLocationOn style={{color:'#f5b21f' , fontSize:'20px'}}/> </Col> 
                                        <Col xs={10}> <Card.Text style={{color: '#1e1545'}} > {userValue?.address}</Card.Text> </Col> 
                                    </Row>
                                :''}
                            </Col>
                        </Row>
                    </Card.Body>

                <hr style={{borderTop: '1px solid #f5b21f', paddingTop: '4px'}} />
                <Row style={{textAlign: 'center'}}>
                    { userValue?.linkedIn !=="" ?
                     <Col xs={2} sm={2} md={2} lg={2}  style={{textAlign: 'center'}}>
                       {userValue?.linkedIn  ===''? "":<AiFillLinkedin style={{color:'#0A66C2' , cursor:'pointer',fontSize:'25px'}} />}
                    </Col> 
                    :'' }
                    <Col xs={2} sm={2} md={2} lg={2} style={{textAlign: 'center'}}>
                        {userValue?.twitter ===''? "":<BiLogoTwitter style={{color:'#0A66C2' , cursor:'pointer' ,fontSize:'25px'}} />}
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} style={{textAlign: 'center'}}>
                        {userValue?.facebook ===''? "": <AiFillFacebook style={{color:'#0A66C2' , cursor:'pointer' ,fontSize:'25px'}} />}
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} style={{textAlign: 'center'}}>
                        {userValue?.insta ===''? "":<BsInstagram style={iconStyle} />}
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} style={{textAlign: 'center'}}>
                    {userValue?.youtube ===''? "":<BsYoutube style={{color:'#B7081B' , cursor:'pointer' ,fontSize:'25px' ,fontSize:'25px'}} />}
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2}style={{textAlign: 'center'}}>
                    {userValue?.pinterest ===''? "":<BiLogoPinterest style={{color:'#B7081B' , cursor:'pointer' ,fontSize:'25px'}} />}
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default CustomerVCard

