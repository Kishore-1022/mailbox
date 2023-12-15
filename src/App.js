import Signup from "./Signup";
import Login from "./Login";
import Compose from './Compose';
import Header from './Header';
import Inbox from "./Inbox";
import Sentbox from "./Sentbox";
import { Route,Routes } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import Sidebar from "./Sidebar";
import SentboxSpecific from "./SentboxSpecific";
import InboxSpecific from "./InboxSpecific";
import { postSentboxData,fetchSentboxData ,postInboxData,fetchInboxData} from "./Store";
import { useEffect } from "react";


function App() {
  const email=useSelector(state=>state.mail.email)
  const mailState=useSelector(state=>state.mail)
  const inboxState=useSelector(state=>state.inbox)

  const dispatch=useDispatch()
 
  useEffect(()=>{
    dispatch(fetchSentboxData())
    dispatch(fetchInboxData())
  },[])

  useEffect(()=>{
    postSentboxData(mailState.items)
    
  },[mailState])

  useEffect(()=>{
    postInboxData(inboxState.items)
  },[inboxState])

  return (
    <>
      {email && <Header/>}
      <div className="d-flex">
        {email  && <Sidebar/>}
          <Routes>  
            <Route path="/" element={< Login/> }/>
            <Route path='/sentbox' element={<Sentbox/>}/>
            <Route path='/sentbox/:id' element={<SentboxSpecific/>}/>
            <Route path='/inbox' element={<Inbox/>}/>
            <Route path='/inbox/:id' element={<InboxSpecific/>}/>
            <Route path='/compose' element={<Compose />}/>
            <Route path='/signup' element={<Signup/>}/>
          </Routes>
      
      </div> 
    </>
  );
}

export default App;
