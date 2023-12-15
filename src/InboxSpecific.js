import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate, useParams } from 'react-router-dom'
import { inboxAction } from './Store'

const InboxSpecific = () => {
    const mail=useSelector(state=>state.inbox.items)
    const {id} = useParams()
    const item=mail.find(i=>i.id===id) 
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const dothandler=()=>{
        dispatch(inboxAction.dotremover(id))
    }
    useEffect(()=>{
        dothandler();  
    },[])

    const removeHandler=()=>{
        dispatch(inboxAction.remover(id))
        navigate('/inbox')    
    }
    
  return (
    <div className='w-100 mx-3'> 
        <div className='px-2 w-100'>
            <h2 className='text-center'>{item.subject}</h2>
            <div className='d-flex justify-content-between'>
             <p><strong>To: </strong>{item.sender}</p>
             <button className="trash-button" onClick={removeHandler}>🚮</button>
            </div>
            <p><strong>Time: </strong> {item.time}</p>  
        </div>
        <p className="mailContent p-1 mx-2">{item.content}</p>      
    </div>
   
  )
}

export default InboxSpecific