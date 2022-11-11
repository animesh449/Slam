import { useState,useEffect,useContext} from "react";
import {Link, useHistory} from 'react-router-dom';
import FirebaseContext from "../context/firebase";
import * as ROUTES from '../constants/routes';
import '../index.css';
import { doesUsernameExist } from "../services/firebase";
export default function Login()
{
    const history=useHistory();
    const {firebase}=useContext(FirebaseContext);
    const [username,setUsername]=useState('');
    const [fullName,setFullname]=useState('');
    const [emailAddress,setEmailAddress]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');

    const isInvalid=password==='' || emailAddress==="";

    const handleSignUp=async (event)=>{
        event.preventDefault();
        const userNameExist= await doesUsernameExist(username);
        console.log(userNameExist);
        if(userNameExist.length===0)
        { try {
            const createdUserResult=await firebase
            .auth()
            .createUserWithEmailAndPassword(emailAddress,password);
            //authentication 
            //=> email adrresss & password (displayname)
            await createdUserResult.user.updateProfile({
                displayName: username
            });
            await firebase.firestore().collection('users').add({
                userId:createdUserResult.user.uid,
                username:username.toLowerCase(),
                fullName,
                emailAddress: emailAddress.toLowerCase(),
                following: [],
                followers:[],
                notification:[],
                actions:[],
                profileUrl: 'https://firebasestorage.googleapis.com/v0/b/vibez-bb919.appspot.com/o/avatars%2Fdefault%2Fani.jpg?alt=media&token=2d1a7498-9685-48a2-acbf-fb5270ef763d',
                about:'',
                dateCreated: Date.now(),
                verified: false
            });
            history.push(ROUTES.DASHBOARD)
        } catch (error){
            setFullname('');
            setEmailAddress('');
            setPassword('');
            setError(error.message)

        }
    }else{
         
    }

    };
    useEffect(()=>{
        document.title="SignUp-Instagram";
    },[])

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
        <div className="flex w-2/5">
            <img src="/images/backgroundd.png" alt="logo"/>
        </div>
        <div className="flex flex-col w-2/5">
            <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4">
            <h1 className="flex justify-center w-full">
                <img src="/images/logo2.png" alt="logo" className="mt-2 w-6/12 mb-4" />
            </h1>
             {error && <p className="mb-4 text-xs text-red-primary">{error}</p>} 


            <form onSubmit={handleSignUp} method="POST">
                <input 
                aria-label="Enter your Username" 
                type="text" 
                placeholder="Username" 
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" 
                onChange={({target})=>setUsername(target.value)} value={username}/>
                 <input 
                aria-label="Enter your Fullname" 
                type="text" 
                placeholder="Fullname" 
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" 
                onChange={({target})=>setFullname(target.value)} value={fullName}/>
                <input 
                aria-label="Enter your Email Address" 
                type="email" 
                placeholder="Email" 
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" 
                onChange={({target})=>setEmailAddress(target.value)} value={emailAddress} value={emailAddress}/>
                 <input 
                aria-label="Enter your Password" 
                type="password" 
                placeholder="Password" 
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" 
                onChange={({target})=>setPassword(target.value)} value={password}/>


              <button 
              disabled={isInvalid} 
              type="submit" 
              className={`bg-blue-500 text-white rounded w-full h-8 font-bold ${isInvalid && 'opacity-50'}`}>
                  Sign Up
              </button>
            </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bh-white p-4 border border-grey-primary">
            <p className="text-sm text-white" >Already Have an account?
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                Sign In
            </Link></p>

        </div>
        </div>
        </div>
    );
}