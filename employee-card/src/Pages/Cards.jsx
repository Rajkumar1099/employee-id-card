import React from 'react'
import { Card, Image, Row, Col } from 'react-bootstrap'
import { useBarcode } from 'react-barcodes';
import { NavLink } from 'react-router-dom';
const Cards = ({userValue}) => {
    const { inputRef } = useBarcode({
        value: `${userValue?.email}`,
        options: {
          background: '#ccffff',
          fontSize: 20,
          margin: 30,
          fontOptions: "bold",
          width: 1,
          height:70,
        },
        format: "ean13",
        lastChar: ">"
      });

  return (
    <div>
    <NavLink to={`/login/view/${userValue.id}`} style={{ textDecoration: 'none' }} >
        <Card style={{width:"300px", height:"auto" ,marginTop:"2rem" , padding:'1rem', backgroundColor:'greay', textDecoration:'none' }}>
        <Row>
            <Col>
                <Image variant="top" src={`${userValue?.img_url}`} style={{width:'100px', height:'100px'}} roundedCircle/>
            </Col>
        </Row>
        <Card.Body>
            <Card.Title>Card Detail</Card.Title>
            <Card.Text >Name: {userValue?.username}</Card.Text>
            <Row>
                <Col>
                    <svg ref={inputRef}/>
                </Col>
            </Row>
        </Card.Body>
        </Card>
    </NavLink>
    </div>
  )
}

export default Cards