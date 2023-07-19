import React, { useState, useEffect } from 'react'
import { Col, Image } from 'react-bootstrap'
import logo from '../../Common/Images/profile-image.jpg'
import { getDatabase, ref, onValue} from 'firebase/database';

export const Logout = () => {
    const[data, setData] = useState([])
    let user=sessionStorage.getItem('userId');

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
      },[user])
      const userValue= data.find((user)=> user.id===user)
      console.log('userValue' ,userValue, user, data)
  return (
    <div>
        {
            data!==null || undefined ? <Image src={logo} style={{widt:'50px', height:'50px'}} roundedCircle/> :<Image src={logo} style={{widt:'50px', height:'50px'}} roundedCircle/>
        }
    </div>
  )
}
