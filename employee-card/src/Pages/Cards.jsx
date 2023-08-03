import React from 'react'
import { Card, Image, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import {BsFillTelephoneFill} from 'react-icons/bs'
import {BiLogoWhatsapp} from 'react-icons/bi'
import { HiOutlineMail } from 'react-icons/hi'
import { MdOutlineLocationOn } from 'react-icons/md'
import { TbWorld } from 'react-icons/tb';
import dummyuser from '../assets/dummyuser.jpg';
import {AiTwotoneDelete} from 'react-icons/ai'

const Cards = ({userValue, deleteItemByKey}) => {

    // console.log('value', Object.values(userValue).includes(whats_app))

  return (
    <div>
        <Card style={{width:"250px", height:"auto" ,marginTop:"2rem" , padding:'1rem', backgroundColor:'greay', textDecoration:'none' }}>
        <Row>
            <Col xs={12} md={10} lg={10}>
            </Col>
            <Col xs={12} md={2} lg={2} > <AiTwotoneDelete style={{color:'#fbaa19'}} onClick={()=>deleteItemByKey(userValue.id)} /></Col>
        </Row>
        <Row style={{textAlign:'center'}}>
            <Col>
                <Image variant="top" src={`${userValue?.img_url ? userValue?.img_url : dummyuser}`} style={{width:'100px', height:'100px'}} roundedCircle/>
            </Col>
        </Row>
        <Row style={{textAlign:'center'}}>
            <Card.Text ><div className='h5'>{userValue?.username}</div><div className='h6'>{userValue?.role}</div></Card.Text>
        </Row>
        <NavLink to={`/vcard/${userValue.id}`} style={{ textDecoration: 'none' }} replace={true} >
        <Card.Body>
            <Row>
            <Card.Title style={{ backgroundColor: '#f0f0f0', padding: '10px',textDecoration:'none' ,color:'grey' }}>Contact Data</Card.Title>
                <Col xs={12} style={{textAlign:'left'}}>
                    {userValue?.contact  ? <Card.Text ><BsFillTelephoneFill style={{color:'#5F8CBF'}}/> {userValue?.contact}</Card.Text> :'' }
                    {userValue?.whats_app  ? <Card.Text ><BiLogoWhatsapp style={{color:'green'}}/> {userValue?.whats_app}</Card.Text> :''}
                    {userValue?.company_name ?<Card.Text ><TbWorld style={{color:'grey'}}/> {userValue?.company_name}</Card.Text>:''} 
                    {userValue?.email ? <Card.Text ><HiOutlineMail style={{color:'red'}} /> {userValue?.email}</Card.Text> :''}
                </Col>
            </Row>
            {/* <br />
            <Row>
                <Card.Title style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>Address Data</Card.Title>
                <Col xs={12} style={{textAlign:'left'}}>
                {userValue?.address ? <Card.Text ><MdOutlineLocationOn style={{color:'red'}} />{userValue?.address}</Card.Text> :''} 
                </Col>
            </Row> */}
        </Card.Body>
        </NavLink>
        </Card>
   
    </div>
  )
}

export default Cards