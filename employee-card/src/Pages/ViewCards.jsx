import React ,{useEffect, useState}from 'react'
import { getDatabase, ref, onValue } from 'firebase/database';
import { Row} from 'react-bootstrap';
import Cards from './Cards';
import { useLocation } from 'react-router-dom';

const ViewCards = () => {
    const [data, setData]= useState([]);
    const location=useLocation();
    let userData = sessionStorage.getItem('userData');
    userData = JSON.parse(userData);
    const userRole = userData !== null ? userData.userRole : null;
    const userId = userData !== null ? userData.userId : 0;

    useEffect(()=>{
        const db = getDatabase();
        let postsRef=null;
        const fetchPosts = () => {
            if( userRole == 'admin' ) {
                 postsRef = ref(db, 'posts');
            } else if ( userRole == 'user' ) {
                postsRef = ref(db, 'posts/'+userId);
            }
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