import React ,{useEffect, useState}from 'react'
import { getDatabase, ref, onValue } from 'firebase/database';
import { Row} from 'react-bootstrap';
import Cards from './Cards';

const ViewCards = () => {
    const [data, setData]= useState([])
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
      console.log('data', data)
  return (
    <div>
        <Row xs="auto">
            {
            data ?.map((value, i) => {
              return (<Cards key={i} userValue={value} />)
              })
            }
        </Row>
    </div>
  )
}

export default ViewCards