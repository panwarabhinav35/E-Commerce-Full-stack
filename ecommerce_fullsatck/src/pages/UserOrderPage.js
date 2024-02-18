import React from 'react'
import Navbar from '../features/navbar/navbar'
import UserOrder from '../features/user/Components/UserOrder'

const UserOrderPage = () => {
  return (
    
    <Navbar>
        <h1 className='mx-auto text-2xl'> My Orders</h1>
        <UserOrder></UserOrder>
    </Navbar>
  )
}

export default UserOrderPage