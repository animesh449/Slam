import {useState,useEffect,useContext} from 'react';
import FirebaseContext from '../context/firebase';


export default function useAuthListener(){
    const [user,setUser]= useState(JSON.parse(localStorage.getItem('authUser')));
    const {firebase}=useContext(FirebaseContext);

    useEffect(()=>{
        const listener=firebase.auth().onAuthStateChanged((authUser)=>{
            //we have a user .... therfore we can store the user in local storage
        
                if (authUser)
            {
                localStorage.setItem('authUser',JSON.stringify(authUser));
                setUser(authUser);
            }
            //we dont have a auth user so clear the local storasge
        else {
            localStorage.removeItem('authUser');
            setUser(null);
        }
        });
        return ()=>listener()
    },[firebase]);
    return {user};
}