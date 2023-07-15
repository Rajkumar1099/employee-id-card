import React, { useState, useEffect, useRef } from 'react'
import { getDatabase, ref, onValue, updateStarCount, postElement } from 'firebase/database';
import { Card, Button, Image, Row,Col } from 'react-bootstrap';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useBarcode } from 'react-barcodes';
import { database } from '../firebase';
import { useParams } from 'react-router-dom';
function Details() {
    const{id} =useParams()
    const barcodeRef=useRef(null)
    const [data, setData] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    console.log('data',userDetails, id, data)
    const userId=localStorage.getItem('uid')
    const userEmail= localStorage.getItem('userEmail')
    useEffect(()=>{
        const db = getDatabase();
        const fetchPosts = () => {
            const postsRef = ref(db, 'posts');
            onValue(postsRef, (snapshot) => {
              const postData = snapshot.val();
              const postList = Object.entries(postData).map(([key, value]) => (
                {
                id: key,
                ...value,
              }));
              setData(postList);
            });
          };
          fetchPosts();
    },[])

     const userValue= data.find((user)=> user.email===userEmail)
      console.log('value', userValue)
      const details= JSON.stringify(userValue?.email)
    const { inputRef } = useBarcode({
        value: `${userValue?.email}`,
        options: {
          background: '#ccffff',
          fontSize: 20,
          margin: 30,
          fontOptions: "bold",
          width: 1,
          height:70
        },
        format: "ean13",
        lastChar: ">"
      });

  return (
    <div>
    <Card style={{width:"300px", height:"auto" ,marginTop:"2rem" , padding:'1rem', backgroundColor:'greay'}}>
      <Row>
        <Col>
            <Image variant="top" src="https://dummyimage.com/10" style={{width:'100px', height:'100px'}} roundedCircle/>
        </Col>
      </Row>
      <Card.Body>
        <Card.Title>Card Detail</Card.Title>
        <Card.Text>Name: {userValue?.username}</Card.Text>
        <Card.Text>Contact: {userValue?.contact}</Card.Text>
        <Card.Text>Address: {userValue?.address}</Card.Text>
        <Row>
            <Col>
                <svg ref={inputRef}/>
            </Col>
        </Row>
        {/* <Row>
            <Col>
                <Barcode value={details} />
            </Col>
        </Row> */}
      </Card.Body>
    </Card>
    </div>
  )
}

export default Details