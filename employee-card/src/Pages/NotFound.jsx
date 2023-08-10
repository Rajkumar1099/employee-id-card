import React from 'react';
import logo from '../assets/brand.png';

const NotFound = () => {
  return (
    <div className='container'>
      <div style={{textAlign: 'center'}}>
        <div className="p-4">
          <img src={logo} width={160} alt="" />
          <h1 style={{fontFamily: 'Aleo-bold' ,fontSize:'100px', color:"#F5B21F "}}>404 !</h1>
          <h4 style={{color:'#1E1545'}}>Page Not Found</h4>
        </div>
      </div>
    </div>
  )
}

export default NotFound