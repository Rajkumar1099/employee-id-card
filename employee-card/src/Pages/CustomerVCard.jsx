import React ,{useEffect, useState}from 'react'
import { Card, Image, Row, Col, Badge } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom';
import {BsFillTelephoneFill} from 'react-icons/bs'
import {BiLogoWhatsapp} from 'react-icons/bi'
import { HiOutlineMail } from 'react-icons/hi'
import { TbWorld } from 'react-icons/tb';
import dummyuser from '../assets/dummyuser.jpg';
import { MdOutlineLocationOn } from 'react-icons/md';
import Threads from '../assets/threads.svg'
import { AiFillLinkedin } from 'react-icons/ai';
import {BiLogoTwitter} from 'react-icons/bi';
import { AiFillFacebook } from 'react-icons/ai'
import { FaInstagramSquare } from 'react-icons/fa'
import { BsInstagram } from 'react-icons/bs'
import { getDatabase, ref, onValue, off } from 'firebase/database';
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
        <div>
            <Card style={{ height:"auto" ,marginTop:"2rem" , padding:'1rem', backgroundColor:'greay', textDecoration:'none' }}>
                <div style={{width:'100%', height:'100px', backgroundColor:'#f5b21f' }}>
                    <Row>
                        <Col style={{textAlign: 'right', marginTop: '5px', marginRight: '5px'}}> 
                            {/* <div className='btn' style={{padding: '2px 10px', fontFamily: 'Aleo Bold', fontSize: '9px', backgroundColor: '#796EB2', borderRadius: '8px', textTransform: 'uppercase', color: '#fff' }} onClick={()=>deleteItemByKey(userValue.id)}  >Remove</div> */}
                            {/* <AiTwotoneDelete style={{color:'#1e1545'}} onClick={()=>deleteItemByKey(userValue.id)} /> */}
                        </Col>
                    </Row>
                </div>
                <Row style={{textAlign:'center', marginTop:'-70px' }}>
                        <Col>
                            <Image variant="top" src={`${userValue?.img_url ? userValue?.img_url : dummyuser}`} style={{width:'100px', height:'100px'}} roundedCircle/>
                        </Col>
                    </Row>
                <Row style={{textAlign:'center' }}>
                    <div ><div className='h5'>{userValue?.firstname}</div><div className='h6'>{userValue?.role}</div></div>
                </Row>
                <hr style={{borderTop: '1px solid #f5b21f'}} />
                
                    <Card.Body>
                        <Row>
                            <Col xs={12} style={{textAlign:'left' , color:'#1E1545' , fontWeight:'normal', fontFamily:'Aleo Bold'}} >
                                {userValue?.contact  ?
                                    <Row>
                                        <Col xs={1} ><BsFillTelephoneFill style={{color:'#f5b21f'}}/></Col> 
                                        <Col xs={10}> <Card.Text style={{color: '#1e1545'}} > {userValue?.contact}</Card.Text> </Col> 
                                    </Row>
                                :'' }
                                {userValue?.whats_app  ? 
                                    <Row>
                                        <Col xs={1} ><BiLogoWhatsapp style={{color:'#f5b21f'}}/> </Col> 
                                        <Col xs={10}> <Card.Text style={{color: '#1e1545'}} > {userValue?.whats_app}</Card.Text> </Col> 
                                    </Row>
                                :''}
                                {userValue?.company_name ?
                                    <Row>
                                        <Col xs={1} ><TbWorld style={{color:'#f5b21f'}}/> </Col> 
                                        <Col xs={10}> <Card.Text style={{color: '#1e1545'}} > {userValue?.company_name}</Card.Text> </Col> 
                                    </Row>
                                :''} 
                                {userValue?.email ? 
                                    <Row>
                                        <Col xs={1} ><HiOutlineMail style={{color:'#f5b21f'}}/> </Col> 
                                        <Col xs={10}> <Card.Text style={{color: '#1e1545'}} > {userValue?.email}</Card.Text> </Col> 
                                    </Row>
                                :''}
                                {userValue?.address ? 
                                    <Row>
                                        <Col xs={1} ><MdOutlineLocationOn style={{color:'#f5b21f'}}/> </Col> 
                                        <Col xs={10}> <Card.Text style={{color: '#1e1545'}} > {userValue?.address}</Card.Text> </Col> 
                                    </Row>
                                :''}
                            </Col>
                        </Row>
                    </Card.Body>
               
                <hr style={{borderTop: '1px solid #f5b21f', paddingTop: '4px'}} />
                <Row style={{padding:'0 0 0 15px', textAlign: 'center'}}>
                    <Col xs={2} sm={2} md={2} lg={2}  style={{textAlign: 'center'}}>
                       {userValue?.linkedIn  ===''? <AiFillLinkedin style={{color:'#1e1545' , cursor:'pointer'}} />:<AiFillLinkedin style={{color:'#0A66C2' , cursor:'pointer'}} />}
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} style={{textAlign: 'center'}}>
                    {userValue?.twitter ===''? <BiLogoTwitter style={{color:'#1e1545' , cursor:'pointer'}} />:<BiLogoTwitter style={{color:'#0A66C2' , cursor:'pointer'}} />}
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} style={{textAlign: 'center'}}>
                    {userValue?.facebook ===''? <AiFillFacebook style={{color:'#1e1545' , cursor:'pointer'}} />: <AiFillFacebook style={{color:'#0A66C2' , cursor:'pointer'}} />}
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} style={{textAlign: 'center'}}>
                    {userValue?.insta ===''? <BsInstagram style={{color:'#1e1545' , cursor:'pointer'}} />:<BsInstagram style={iconStyle} />}
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2}style={{textAlign: 'center'}}>
                    {userValue?.thread ===''? <img src={Threads} alt="" style={{cursor:'pointer'}} />:<img src={Threads} alt="" width={15} style={{cursor:'pointer'}} />}
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default CustomerVCard

