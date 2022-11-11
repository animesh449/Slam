import { useState,useEffect,useContext} from "react";
import {Link, useHistory} from 'react-router-dom';
import FirebaseContext from "../context/firebase";
import * as ROUTES from '../constants/routes';
import '../index.css';
export default function Login()
{
    const history=useHistory();
    const {firebase}=useContext(FirebaseContext);
    const [emailAddress,setEmailAddress]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');

    const isInvalid=password==='' || emailAddress==="";

    const handleLogin=async (event)=>{
        event.preventDefault();
        try{
            await firebase.auth().signInWithEmailAndPassword(emailAddress,password);
            history.push(ROUTES.DASHBOARD);
        } catch (error)
        {
            setEmailAddress('');
            setPassword('');
            setError(error.message);
        }

    };
    useEffect(()=>{
        document.title="Login-Instagram";
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


            <form onSubmit={handleLogin} method="POST">
                <input 
                aria-label="Enter your email address" 
                type="text" 
                placeholder="Email Address" 
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" 
                onChange={({target})=>setEmailAddress(target.value)}/>
                <input 
                aria-label="Enter your password" 
                type="password" 
                placeholder="Password" 
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" 
                onChange={({target})=>setPassword(target.value)}/>

              <button 
              disabled={isInvalid} 
              type="submit" 
              className={`bg-blue-500 text-white rounded w-full h-8 font-bold ${isInvalid && 'opacity-50'}`}>
                  Log In
              </button>
            </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bh-white p-4 border border-grey-primary">
            <p className="text-sm text-white" >Dont have an account?
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
                Sign Up
            </Link></p>

        </div>
        </div>
        </div>
    );
}