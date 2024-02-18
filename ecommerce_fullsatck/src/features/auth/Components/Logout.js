import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser, signOutAsync } from '../authSlice'
import { Navigate } from 'react-router-dom'

const Logout = () => {
    const dispatch =useDispatch()
    useEffect(()=>{
        dispatch(signOutAsync())

    },[dispatch])
    const user =useSelector(selectLoggedInUser)
  return (
    <div>
        {!user && <Navigate to='/' replace='true'></Navigate>}
    </div>
  )
}

export default Logout