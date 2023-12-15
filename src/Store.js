import {configureStore, createSlice} from '@reduxjs/toolkit';

const mail=createSlice({
    name:'mail',
    initialState:{ 
        email:localStorage.getItem('mail') || null,
        items:[]},
    reducers:{
        login:(state,action)=>{  
            state.email = action.payload.email;
            localStorage.setItem('mail',action.payload.email)
        },
        logout:(state)=>{       
            state.email=null
            localStorage.removeItem('mail')
        },
        itemhandler:(state,action)=>{
            state.items=[...state.items,action.payload]
        },
        dotremover:(state,action)=>{
            const index=state.items.findIndex(i=>i.id===action.payload)
            state.items[index]={...state.items[index],seen:true}
        },
        remover:(state,action)=>{
            state.items=state.items.filter(i=>i.id!==action.payload) 
        },
        replacement:(state,action)=>{
            state.items=action.payload.items
        }
    }
 })
 const inbox=createSlice({
    name:'inbox',
    initialState:{items:[]},
    reducers:{
        itemhandler:(state,action)=>{
            state.items=[...state.items,action.payload]
        },
        dotremover:(state,action)=>{
            const index=state.items.findIndex(i=>i.id===action.payload)
            state.items[index]={...state.items[index],seen:true}
        },
        remover:(state,action)=>{
            state.items=state.items.filter(i=>i.id!==action.payload) 
        }, 
        replacement:(state,action)=>{
            state.items=action.payload.items
        }  
    }
 })

 const store=configureStore({
    reducer:{mail:mail.reducer,inbox:inbox.reducer}
 })

 export const mailAction=mail.actions
 export const inboxAction=inbox.actions
 export default store

 export const postSentboxData=async(items)=>{
    try{
    const res=await fetch('https://mailbox-5a74c-default-rtdb.asia-southeast1.firebasedatabase.app/sentdata.json',{
        method:'PUT',
        body:JSON.stringify({items}),
        headers: {'Content-Type': 'application/json' },
    })
    const data=await res.json()
   }catch(err){
    console.log(err)
   }
 }
 export const fetchSentboxData=()=>{
    return async(dispatch)=>{ 
        const fetching=async()=>{
            const res =await fetch('https://mailbox-5a74c-default-rtdb.asia-southeast1.firebasedatabase.app/sentdata.json')
            const data=await res.json()
            return data
        }
        try{
           const datum=await fetching()

           dispatch(mailAction.replacement({
            items:datum.items,
           }))
 
        }catch(err){
          console.log(err)
        }
    } 
 }
 
 export const postInboxData=async(items)=>{
    try{
    const res=await fetch('https://mailbox-5a74c-default-rtdb.asia-southeast1.firebasedatabase.app/inboxdata.json',{
        method:'PUT',
        body:JSON.stringify({items}),
        headers: {'Content-Type': 'application/json' },
    })
    const data=await res.json()
   }catch(err){
    console.log(err)
   }
 }
 export const fetchInboxData=()=>{
    return async(dispatch)=>{ 
        const fetching=async()=>{
            const res =await fetch('https://mailbox-5a74c-default-rtdb.asia-southeast1.firebasedatabase.app/inboxdata.json')
            const data=await res.json()
            return data
        }
        try{
           const datum=await fetching()
           
           dispatch(inboxAction.replacement({
            items:datum.items,
           }))    
        }catch(err){
          console.log(err)
        }
    } 
 }