import {React,useState,useEffect} from 'react';
import {getUserByUsername} from '../services/firebase';
import '../index.css';
import {Link} from 'react-router-dom';

export default function SearchBar(){

    const [value,setValue]=useState('');
    const [user,setUser]=useState([]);
    useEffect(async()=>{
        if(!value) 
        {
            return null
        }
        else {
            let result= await getUserByUsername(value);
            if(result.length<1)
            {
                console.log("no user found")
            }
            else {setUser(result.map(user=> user));
            console.log(user)}
               
        }
             
    },[value])
    function handleInput(event){

       setValue(event.target.value);
    }
    return ( <div class="pt-2 mx-auto text-gray-600">
    <input class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm w-full focus:outline-none"
      type="search" onChange={handleInput} name="search" placeholder="Search"/>
   
   {user.length>0 &&value.length>0?<div className="userlist-content border-2 border-blue-400 rounded"><div className="flex flex-start justify-between"><img className="rounded-full h-8 w-8 flex w-20 object-contain"src={user[0].profileUrl}/><Link to={`/p/${user[0].username}`}><p className="inline-flex">{user[0].fullName}{
       user[0].verified?<svg xmlns="http://www.w3.org/2000/svg" className="fill-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>: ""
   }</p></Link></div></div> : ''}
  </div>
  )
}