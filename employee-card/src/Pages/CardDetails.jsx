import React, { useState, useEffect } from 'react'
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { useLocation, useNavigate } from 'react-router-dom'
import { Card,Row,Col, Image } from 'react-bootstrap'
import {BsFillTelephoneFill} from 'react-icons/bs';
import {BiLogoWhatsapp} from 'react-icons/bi';
import { HiOutlineMail } from 'react-icons/hi';
import { MdOutlineLocationOn } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import { AiTwotoneEdit } from 'react-icons/ai';
import dummyuser from '../assets/dummyuser.jpg';

const CardDetails = () => {
    const location=useLocation();
    let val=location.pathname.split('/');
    const [id, setId] =useState(val[2]);
    const [userValue, setUserValue] =useState();
    const db = getDatabase();
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
    <div>
    <Card style={{width:"300px", height:"auto" ,marginTop:"2rem" , padding:'1rem', backgroundColor:'greay', textDecoration:'none' }}>
    {/* <Row>
        <Col xs={12} md={10} lg={10}>
        </Col>
        <Col xs={12} md={2} lg={2} > <AiTwotoneEdit onClick={handleEdite} /></Col>
    </Row> */}
        <Row>
            <Col>
                <Image variant="top" src={`${userValue?.img_url ? userValue?.img_url : dummyuser}`} style={{width:'100px', height:'100px'}} roundedCircle/>
            </Col>
        </Row>
        <Row>
            <Card.Text >{userValue?.role}-{userValue?.username}</Card.Text>
        </Row>
        <Card.Body>
            <Row>
            <Card.Title style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>Contact Data</Card.Title>
                <Col xs={12} style={{textAlign:'left'}}>
                    <Card.Text ><BsFillTelephoneFill style={{color:'#5F8CBF'}}/> {userValue?.contact}</Card.Text>
                    <Card.Text ><BiLogoWhatsapp style={{color:'green'}}/> {userValue?.whats_app}</Card.Text>
                    <Card.Text ><TbWorld style={{color:'grey'}}/> {userValue?.company_name}</Card.Text>
                    <Card.Text ><HiOutlineMail style={{color:'red'}} /> {userValue?.email}</Card.Text>
                </Col>
            </Row>
            <br />
            <Row>
                <Card.Title style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>Address Data</Card.Title>
                <Col xs={12} style={{textAlign:'left'}}>
                <Card.Text ><MdOutlineLocationOn style={{color:'red'}} />{userValue?.address}</Card.Text>
                </Col>
            </Row>
        </Card.Body>
        </Card>
    </div>
  )
}

export default CardDetails