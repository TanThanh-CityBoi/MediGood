import React from 'react'
import { Link } from 'react-router-dom'
import './Page404.scss'
const Page404 = () => {
  return (
    <div className='page404-wrapper'>
      <img src='./404IMG.jpg'></img>
      <div>
        <h1>404</h1>
        <p>Oops, Page Not Found!</p>
        <Link to={'/trang-chu'}>Home Page</Link>
      </div>
    </div>
  )
}

export default Page404
