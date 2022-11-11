import {firebase,FieldValue,storage,doc,onSnapshot } from "../lib/firebase";
import React, {useContext, useReducer,useEffect,useState} from 'react';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes'
import {Link} from 'react-router-dom';
import '../index.css'
import SearchBar from './searchbar';
import  {Notification,Actions} from './notifications';

import { getUserByUsername,getUserPhotosByUsername,getUserByUserId } from '../services/firebase';
import {BsFillCaretUpFill} from 'react-icons/bs';

export default function Header()
{ 
    const [photoUrl,setPhotoUrl]=useState('');
    const [docId,setdocId]=useState('');
    const {firebase}= useContext(FirebaseContext);
    const {user}=useContext(UserContext);
    const [notification,setNotification]= useState([]);
    const [action,setAction]=useState([]);
    useEffect(()=>{
        async function getData(user)
        {
            console.log('user');
           let result= await getUserByUsername(user);
           console.log('result',result);
        //    let photos=await getUserPhotosByUsername(user);
           

           //setting action state
           
            setAction(result[0].actions); 
           
          
         
          //Setting the notification state
           setNotification(result[0].notification);

           //seting profile picture
           return result.map(item => {setPhotoUrl(item.profileUrl)
        setdocId(item.docId);
    })
               
    
        } 
    
        getData( !user?"": user.displayName)
    },[])
   

    console.log(photoUrl)
    return (<header className="sticky top-0 z-10 h-16 bg-white border-b border-gray-primary mb-8 shadow-lg w-screen">
        <div className="container mx-auto max-w-screen-lg h-full">
            <div className="flex justify-evenly h-full p-3">
                <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
                    <h1 className="flex justify-center w-full">
                        <Link to={ROUTES.DASHBOARD} aria-label="Instagramlogo">
                            <img src="/images/logo2.png" alt="Slam" className="mt-2 w-12 "/>
                            
                        </Link>
                        
                    </h1>
                </div>
                <h1 className="flex justify-center w-full">
                        <SearchBar/>
                        
                    </h1>
               
                <div className="text-gray-700 text-center flex items-center">
                    { user? (
                     <React.Fragment>

                         

                        <Actions username={user.displayName} userId={user.uid} action={action} docId={docId}setAction={data=> setAction(data)}/>
                          <Notification username={user.displayName} notification={notification} docId={docId}setNotification={(data)=> setNotification(data)}/>
                         <Link to={ROUTES.UPLOAD}>
                          <div className="rounded bg-blue-600 p-1 py-1 mx-1 my-1 text-white pointer-cursor hover:bg-blue-500">Upload</div>
                         </Link>
                        
                         <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                         <div className="rounded bg-blue-600 p-1 py-1 text-white pointer-cursor hover:bg-blue-500">Home</div>
                         </Link>
                         <button className="rounded bg-blue-600 p-1 py-1 mx-1 my-1 text-white pointer-cursor hover:bg-blue-500" 
                         type="button"
                         title="Sign-Out"
                         onClick={()=>firebase.auth().signOut()} 
                         onKeyDown={(event)=>{
                             if(event.key==="Enter"){
                                firebase.auth().signOut()
                             }
                         }}                       
                        >
                           LogOut
                        </button>
                        {/* <div className="flex-items-center">
                            <Link to={`/p/${user.displayName}`}>
                                <img className="rounded-full h-8 w-8 flex w-20 object-cover" src={photoUrl} alt={`${user.displayName} profile`}/>
                            </Link>
                        </div> */}
                         </React.Fragment>
                    ):(
                        <React.Fragment>
                            <Link to={ROUTES.LOGIN}>
                                <button type='button'
                                className="bg-blue-700 font-bold text-sm rounded text-white medium w-20 h-8">
                                    Login

                                </button>
                            </Link>
                            <Link to={ROUTES.LOGIN}>
                                <button type='button'
                                className="bg-white-medium font-bold text-sm rounded text-blue w-20 h-8">
                                    Sign Up

                                </button>
                            </Link>
                        </React.Fragment>
                    )

                    }
                </div>
            </div>
        </div>
    </header>)
}