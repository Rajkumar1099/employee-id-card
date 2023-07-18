import React from 'react'
import './Notification.css'
const Notification = ({title}) => {
  return (
    <div className="moving-message">{` Welcome to our ${title} ! `}</div>
  )
}

export default Notification