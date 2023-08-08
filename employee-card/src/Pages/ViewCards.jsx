import React ,{useEffect, useState}from 'react'
import { getDatabase, ref, onValue , remove} from 'firebase/database';
import { Row ,Col} from 'react-bootstrap';
import Cards from './Cards';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewCards = () => {
    const [data, setData]= useState([]);
    const location=useLocation();
    const navigate=useNavigate();
    let userData = sessionStorage.getItem('userData');
    userData = JSON.parse(userData);
    const userRole = userData !== null ? userData.userRole : null;
    const userId = userData !== null ? userData.userId : 0;
    const handleCreateUser=(e)=>{
        e.preventDefault();
        navigate('/admin/card/add')
    }

    const deleteItemByKey = (itemKey) => {
        console.log('id', itemKey)
        const db = getDatabase();
        const postRef = ref(db, 'posts/' + itemKey);
        remove(postRef)
          .then(() => {
            console.log('Post deleted successfully.');
            alert('Post deleted successfully.')
          })
          .catch((error) => {
            console.error('Error deleting post:', error);
            alert(error)
          });
      };

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
              let postData = snapshot.val();
              postData = postData !== null ? postData : [];
              const postList = Object.entries(postData).map(([key, value]) => (
                {
                id: key,
                ...value,
              }));
              setData(postList);
            });
          };
          fetchPosts();
      },[data.length])

  return (
    <div style={{minHeight:'100vh'}}>
        <Row className='p-4'>
            <Col xs={12} md={10} lg={10}></Col>
            <Col xs={12} md={10} lg={2}>
                <div className='btn btn-secondary' onClick={handleCreateUser}>Create New User</div>
            </Col>
        </Row>
        <Row xs="auto">
            {
            data.length > 0 
            ? data ?.map((value, i) => {
              return (<Cards key={i} userValue={value} deleteItemByKey={deleteItemByKey}/>)
              })
              : <div className='container'> 
              <div className='h3'>No Item exist</div>
               </div>
            }
        </Row>
    </div>
  )
}

export default ViewCards