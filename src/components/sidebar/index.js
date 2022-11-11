import useUser from '../../hooks/use-user';
import User from './user';
import Suggestions from './suggestions'
import{useState} from 'react';
import {FcLeftUp2} from 'react-icons/fc';

export default function Sidebar()
{
    const {user:{ docId,fullName,userId,username,following,profileUrl}}= useUser();
    console.log(fullName,userId,username,following);
    return <div className="p-4 top-0 border border-t-0 border-b-0 rounded" style={{'background':"rgba(0,0,0,0.4)"}}>
        <div className='fixed w-72'> <User username={username} fullname={fullName} profileUrl={profileUrl}/>
        <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
      {  window.scrollY==20 ?<div  onClick={()=> window.scrollTo(0,0)}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mt-20" fill="white" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
</svg>
            </div>:''}</div>
         
    </div>
}
