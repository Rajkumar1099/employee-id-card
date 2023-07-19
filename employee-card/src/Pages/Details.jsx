import React, { useState, useEffect, useRef } from 'react'
import { getDatabase, ref, onValue} from 'firebase/database';
import { Card, Button, Image, Row,Col } from 'react-bootstrap';
import { useBarcode } from 'react-barcodes';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {AiTwotoneEdit} from 'react-icons/ai'
function Details() {
    const {id} =useParams()
    const [user, setUser] = useState(null);
    const [data, setData] = useState([]);
    const userId=sessionStorage.getItem('userId')
    const navigate=useNavigate()
    const auth = getAuth();
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    }, [auth]);
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
    },[userId])
    const userValue= data.find((user)=> user.id===userId)
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
    <Card style={{width:"300px", height:"auto" ,marginTop:"2rem" , padding:'1rem', backgroundColor:'greay'}}>
      <Row>
        <div style={{ position: 'absolute', top: '5px', left: '105px', cursor: 'pointer' }}>
           {
            user?.uid === id ?  <AiTwotoneEdit onClick={()=>{navigate(`/signup/${user.uid}`)}} /> :''
           }
        </div>
      </Row>
      <Row>
        <Col>
            <Image variant="top" src={`${userValue?.img_url}`} style={{width:'100px', height:'100px'}} roundedCircle/>
        </Col>
      </Row>
      <Card.Body>
        <Card.Title>Card Detail</Card.Title>
        <Card.Text>Name: {userValue?.username}</Card.Text>
        <Row>
            <Col>
                <svg ref={inputRef}/>
            </Col>
        </Row>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Details