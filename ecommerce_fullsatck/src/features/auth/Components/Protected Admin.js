import React from 'react'
import { selectLoggedInUser } from '../authSlice'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedAdmin = ({children}) => {
    const loggedInUser =useSelector(selectLoggedInUser)
    // console.log(loggedInUser)

    if(!loggedInUser){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    if(loggedInUser && loggedInUser.role!=="admin"){
        return <Navigate to='/' replace={true}></Navigate>
    }
  return (children)
}

export default ProtectedAdmin