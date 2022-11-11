import {useState,useContext,useEffect} from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';
 export default function useUser(){
     const [activeUser,setActiveUser] = useState({});
     const {user}=useContext(UserContext);


     useEffect(()=>{
         async function getUserObjByUserId()
         {
             //We nee a function that wr can call firebase service that gets the user data based on the id of
             const [response]=await getUserByUserId(user.uid);
             setActiveUser(response);
         }
         if (user?.uid)
         {
             getUserObjByUserId()
         }
     },[user])
     return {user: activeUser}
 }