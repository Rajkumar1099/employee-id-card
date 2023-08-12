import React ,{useEffect, useState}from 'react'
import { Card, Image, Row, Col, Badge } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom';
import {BsFillTelephoneFill} from 'react-icons/bs'
import {BiLogoWhatsapp} from 'react-icons/bi'
import { HiOutlineMail } from 'react-icons/hi'
import { TbWorld } from 'react-icons/tb';
import dummyuser from '../assets/dummyuser.jpg';
import {AiTwotoneDelete} from 'react-icons/ai'
import { MdOutlineLocationOn } from 'react-icons/md';
import { AiTwotoneEdit } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';
import {BiLogoTwitter} from 'react-icons/bi';
import { AiFillFacebook } from 'react-icons/ai'
import { FaInstagramSquare } from 'react-icons/fa'
import { getDatabase, ref, onValue, off } from 'firebase/database';
const  CustomerVCard = () => {
    const [link, setLink] = useState(false)
    const {id} =useParams()
    const [userValue, setUserValue] =useState()

      const linearGradient = 'linear-gradient(to bottom right, red, pink, yellow)';
      const iconStyle = {
        backgroundImage: linearGradient,
      };
console.log('id', id)
      useEffect(()=>{
        const db=getDatabase()
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
      },[])
    
    // console.log('value', Object.values(userValue).includes(whats_app))
    return (
        <div>
            <Card style={{width:"250px", height:"auto" ,marginTop:"2rem" , padding:'1rem', backgroundColor:'greay', textDecoration:'none' }}>
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
                    <Card.Text ><div className='h5'>{userValue?.firstname}</div><div className='h6'>{userValue?.role}</div></Card.Text>
                </Row>
                <hr style={{borderTop: '1px solid #f5b21f'}} />
                <NavLink to={`/vcard/${id}`} style={{ textDecoration: 'none' }} replace={true} >
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
                </NavLink>
                <hr style={{borderTop: '1px solid #f5b21f', paddingTop: '4px'}} />
                <Row>
                    <Col>
                        <AiFillLinkedin style={{color:'#0A66C2'}} />
                    </Col>
                    <Col>
                        <BiLogoTwitter style={{color:'#0A66C2'}} />
                    </Col>
                    <Col>
                        <AiFillFacebook style={{color:'#1877F2'}}/>
                    </Col>
                    <Col>
                        <FaInstagramSquare style={iconStyle}/>
                    </Col>
                </Row>
                
            </Card>         
        </div>
    )
}

export default CustomerVCard

