import React from 'react'
import { selectLoggedInUser } from '../authSlice'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectUserInfo } from '../../user/userSlice'

const ProtectedAdmin = ({children}) => {
    const loggedInUser =useSelector(selectLoggedInUser)
    const userInfo = useSelector(selectUserInfo)
    // console.log(loggedInUser)

    if(!loggedInUser){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    if(loggedInUser && userInfo.role!=="admin"){
        return <Navigate to='/' replace={true}></Navigate>
    }
  return (children)
}

export default ProtectedAdmin