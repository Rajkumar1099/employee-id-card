import React, { useState, useEffect, useRef } from 'react'
import { getDatabase, ref, onValue} from 'firebase/database';
import { Card, Button, Image, Row,Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import {BsFillTelephoneFill} from 'react-icons/bs'
import {BiLogoWhatsapp} from 'react-icons/bi'
import { HiOutlineMail } from 'react-icons/hi'
import { MdOutlineLocationOn } from 'react-icons/md'
import { TbWorld } from 'react-icons/tb'

function Details() {
    const {id} =useParams();
    const [data, setData] = useState([]);
    const [userValue, setUserValue] = useState(null);
    console.log('data',id)
    const db = getDatabase();
    useEffect(() => {
        const fetchPosts = async () => {
          const postsRef = ref(db, 'posts/' + id);
          const onDataUpdate = (snapshot) => {
            const postData = snapshot.val();
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
    
console.log('value', userValue)
  return (
    <div>
   <Card style={{width:"300px", height:"auto" ,marginTop:"2rem" , padding:'1rem', backgroundColor:'greay', textDecoration:'none' }}>
        <Row>
            <Col>
                <Image variant="top" src={`${userValue?.img_url}`} style={{width:'100px', height:'100px'}} roundedCircle/>
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

export default Details