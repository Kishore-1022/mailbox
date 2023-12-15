import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector ,useDispatch} from 'react-redux'
import { mailAction } from './Store'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const email=useSelector(state=>state.mail.email)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const logoutHandler=()=>{
    dispatch(mailAction.logout())
    navigate('/')
  }
  return (
    <div className='d-flex justify-content-between tel px-2'>
      <h3 className='mt-3 '>MailBox</h3>
      <div className='text-center'>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOCIi4qfj3pBIPB6CkMr8yiTMsIgekdCYkbQ&usqp=CAU"
        alt=""
        className="profile-image "/>
        <p>{email}</p>
      </div>
      <div><Button className='mt-3' onClick={logoutHandler}>Logout</Button></div>
      
    </div>
  )
}

export default Header