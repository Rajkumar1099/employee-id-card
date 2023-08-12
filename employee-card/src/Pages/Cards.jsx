import React ,{useState}from 'react'
import { Card, Image, Row, Col, Badge , Modal , Button} from 'react-bootstrap'
import { NavLink, Navigate } from 'react-router-dom';
import {BsFillTelephoneFill} from 'react-icons/bs'
import {BiLogoWhatsapp} from 'react-icons/bi'
import { HiOutlineMail } from 'react-icons/hi'
import { TbWorld } from 'react-icons/tb';
import dummyuser from '../assets/dummyuser.jpg';
import { MdOutlineLocationOn } from 'react-icons/md';
import { AiTwotoneEdit } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';
import {BiLogoTwitter} from 'react-icons/bi';
import { AiFillFacebook } from 'react-icons/ai'
import { FaInstagramSquare } from 'react-icons/fa'
import Threads from '../assets/threads.svg'
const Cards = ({userValue, deleteItemByKey}) => {
    const [link, setLink] = useState(false)
    const [isCopied, setIsCopied] = useState(false);

    const copyText = (id) => {
        let text=`http://nfctest.lookatmeprint.com/card/${id}`
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        // Reset the "Copied" state after a short delay
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      };

      const linearGradient = 'linear-gradient(to bottom right, red, pink, yellow)';
      const iconStyle = {
        backgroundImage: linearGradient,
        cursor:'pointer'
      };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteCard=(id)=>{
    // deleteItemByKey(id)
    console.log('delete', id)
    handleClose()
  }
    // console.log('value', Object.values(userValue).includes(whats_app))
    return (
        <Col xs={6} sm={6} md={4} lg={3} >
            <Card style={{ textDecoration:'none' }}>
                <div style={{width:'100%', height:'100px', backgroundColor:'#f5b21f' , borderRadius:'5px'}}>
                    <Row>
                        <Col style={{textAlign: 'right', marginTop: '5px', marginRight: '5px'}}> 
                            <div className='btn' style={{padding: '2px 10px', fontFamily: 'Aleo Bold', fontSize: '9px', backgroundColor: '#796EB2', borderRadius: '8px', textTransform: 'uppercase', color:'#fff' }} onClick={handleShow}>Remove</div>
                        </Col>
                    </Row>
                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete NFC Card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{color:'#F4B11E' , fontSize:'20px'}}>Are you sure ? </Modal.Body>
                    <Modal.Footer>
                    <Button style={{backgroundColor:'#746B87'}} onClick={handleClose}>
                    Cancel
                    </Button>
                    <Button style={{ backgroundColor: '#796EB2'}} onClick={()=>deleteCard(userValue.id)
                    }>
                     YES
                    </Button>
                    </Modal.Footer>
                    </Modal>
                </div>
                <Row style={{textAlign:'center', marginTop:'-70px' }}>
                        <Col>
                            <Image variant="top" src={`${userValue?.img_url ? userValue?.img_url : dummyuser}`} style={{width:'100px', height:'100px'}} roundedCircle/>
                        </Col>
                    </Row>
                    <Row style={{textAlign:'center' }}>
                        <Card.Text >
                            <div className='h5'>{userValue?.firstname}</div>
                        </Card.Text>
                        </Row>
                <hr style={{borderTop: '1px solid #f5b21f'}} />
                <NavLink to={`/vcard/${userValue.id}`} style={{ textDecoration: 'none' }} replace={true} >
                    <Card.Body style={{minHeight: '160px', maxHeight: '160px', overflowY: 'auto', scrollbarWidth: 'thin' }}>
                        <Row style={{textAlign:'center' }}>
                        <Card.Text >
                            <div style={{color:'#1E1545' , fontWeight:'normal', fontSize:'25px',fontFamily:'Aleo Bold', lineHeight:'50px'}}>{userValue?.role}</div>
                        </Card.Text>
                        </Row>
                        <Row>
                            <Col xs={12} style={{textAlign:'left' , color:'#1E1545' , fontWeight:'normal', fontFamily:'Aleo Bold' , lineHeight:'30px'}} >
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
                <Row style={{padding:'0 10px', textAlign: 'center'}}>
                    <Col xs={2} sm={2} md={2} lg={2} >
                       {userValue?.linkedIn  ===''? <AiFillLinkedin style={{color:'#1e1545' , cursor:'pointer'}} />:<AiFillLinkedin style={{color:'#0A66C2' , cursor:'pointer'}} />}
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} >
                    {userValue?.twitter ===''? <BiLogoTwitter style={{color:'#1e1545' , cursor:'pointer'}} />:<BiLogoTwitter style={{color:'#0A66C2' , cursor:'pointer'}} />}
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} >
                    {userValue?.facebook ===''? <AiFillFacebook style={{color:'#1e1545' , cursor:'pointer'}} />: <AiFillFacebook style={{color:'#0A66C2' , cursor:'pointer'}} />}
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} >
                    {userValue?.insta ===''? <FaInstagramSquare style={{color:'#1e1545' , cursor:'pointer'}} />:<FaInstagramSquare style={iconStyle} />}
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} >
                    {userValue?.thread ===''? <img src={Threads} alt="" style={{cursor:'pointer'}} />:<img src={Threads} alt="" width={15} style={{cursor:'pointer'}} />}
                    </Col>
                </Row>
                <hr style={{borderTop: '0.5px solid #f5b21f', paddingTop: '4px'}} />
                <Row style={{padding:'0 10px 10px 10px', margin: '0 10px'}}>
                    <div onClick={()=>{copyText(userValue.id)}} disabled={isCopied}  className='btn'
                        style={{  padding: '2px', backgroundColor: '#796EB2', color: '#fff'}}
                    >
                        {isCopied ? 'Copied!' : 'GENERATE NFC LINK'}
                    </div>
                </Row>
            </Card> 
        </Col>
    )
}

export default Cards

