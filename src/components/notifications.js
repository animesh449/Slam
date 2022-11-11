import {React,useEffect,useState} from 'react';
import { getUserByUserId,getUserPhotosByUsername } from '../services/firebase';
import '../index.css';
import {firebase,FieldValue,storage,doc,onSnapshot } from "../lib/firebase";
import { array } from 'prop-types';
import{Link} from 'react-router-dom';
import {formatDistance} from 'date-fns';
import Post from './posts/index';
import Modal from './profile/modal';



/*........................................ActionNotification....................................................*/




export function Actions({userId,username,action,docId,setAction}){
   let [show,setShow]=useState(false);
   let [content,setContent]=useState('');
   let  [userLiked,setuserLiked]=useState(false);

   async function Content(docId){
      const result= await firebase.firestore().collection('photos').doc(docId).get();
      const {likes}=result.data();
      if(likes.includes(userId))
      { 
         setuserLiked(true);
      }

      setContent({...result.data(),docId:result.id,username: username,userLikedPhoto: userLiked});
      console.log(content);
      setShow(true);
   }
   async function notificationListener(username)
   {
      firebase.firestore().collection('users').where('username','==',username).onSnapshot((snapshot)=>{
      let changes=snapshot.docChanges();
      changes.forEach(change=>{
         if(change.type=='modified')
         {
            setAction(change.doc.data().actions);
         }
      })
      },(error)=> console.log(error))
   }
   notificationListener(username)
 
 
     function handleAction()
     { 
        try{
         firebase.firestore().collection('users').doc(docId).update({'actions':[] });
         //   firebase.firestore().collection('users').doc(docId).update({'actions': FieldValue.delete()}) 
           
          console.log('deleted')
        }
       catch(error) {
          console.log(error);
       }
 
     }

  return( <div className='dropdown inline-block'>
      <Modal username={username }show={show} content={content} onClose={()=> setShow(false)}/>

   <div className='notification rounded bg-blue-600 p-1 py-1 mx-1 my-1 text-white pointer-cursor hover:bg-blue-500'><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
 
   </svg>
  { action.length>0?<span className='animate-ping h-2 w-2 rounded bg-red-500 absolute'></span>: ''}
  </div>
<div className='dropdown-content cursor-pointer rounded'>
   {action.length>0? action.map((item,index)=> <p className=' border-l-4 border-blue-400 border-t-0 border-b-0 border-r-0 rounded hover:bg-gray-100' onClick={()=>Content(item.photoDocId)}><span className='text-red-600'>☻</span> <Link to={`/p/${item.username}`}><span className='text-base hover:blue-300'>{item.username}</span></Link> <span>{item.type=='comment'?'commented on a memory of yours': 'adores a memory of yours'}</span><br /><span className='text-xs text-gray-400'>{formatDistance(item.date,new Date())} ago</span></p>): <p>No notifications to show.</p>}
 <div className='border-t-2 border-gray-200 p-2'>
 <div classname=""><span className='text-white px-5 py-1 text-sm bg-red-500 rounded' onClick={handleAction} >Clear</span></div>
    </div>
  
   </div> 
</div>)
}


/*........................................FollowNotification....................................................*/





export  function Notification({username,notification,docId,setNotification}){



 async function notificationListener(username)
  {
     firebase.firestore().collection('users').where('username','==',username).onSnapshot((snapshot)=>{
     let changes=snapshot.docChanges();
     changes.forEach(change=>{
        if(change.type=='modified')
        {
           setNotification(change.doc.data().notification);
        }
     })
     },(error)=> console.log(error))
  }
  notificationListener(username)


    function handleAction()
    { 
       try{
          firebase.firestore().collection('users').doc(docId).update({'notification':[] });
         console.log('deleted')
       }
      catch(error) {
         console.log(error);
      }

    }
 return (
   
     <div className='dropdown inline-block'>
        <div className='notification rounded bg-blue-600 p-1 py-1 mx-1 my-1 text-white pointer-cursor hover:bg-blue-500'><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
</svg>
        {notification.length>0?<span className='animate-ping h-2 w-2 rounded bg-red-500 absolute'></span>: ''}
        </div>
     <div className='dropdown-content cursor-pointer rounded'>
        {notification.length>0? notification.map((item,index)=> <p className='rounded hover:bg-blue-400'><span className='text-red-600'>☻</span> <Link to={`/p/${item.username}`}><span className='text-base hover:blue-300'>{item.username}</span></Link> {item.message}</p>): <p>No notifications to show.</p>}
       <div className='border-t-2 border-gray-200 p-2'>
       <div classname="" onClick={handleAction}><span className='text-white px-5 py-1 text-sm bg-red-500 rounded'>Clear</span></div>
          </div>
        
         </div>
      </div>

 )
}