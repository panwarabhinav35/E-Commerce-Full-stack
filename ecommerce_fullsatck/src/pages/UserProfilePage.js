import React from 'react'
import Navbar from '../features/navbar/navbar'
import UserProfile from '../features/user/Components/UserProfile'

const UserProfilePage = () => {
  return (
    <Navbar>
        <h1 className='mx-auto text-2xl'> My Orders</h1>
        <UserProfile></UserProfile>
    </Navbar>
  )
}

export default UserProfilePage