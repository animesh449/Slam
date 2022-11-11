import { useParams,useHistory } from "react-router-dom";
import {useState,useEffect} from 'react';
import {getUserByUsername} from '../services/firebase';
import * as ROUTES from '../constants/routes';
import PropTypes from 'prop-types';
import Header from '../components/header';
import UserProfile from '../components/profile/index';


export default function Profile(){
    const {username}=useParams();
    const [userExist,setUserExists]= useState(false);
    const history=useHistory();
    const [user,setUser]=useState(null);

    useEffect(()=>{
         async function checkUserExist(){
             const user= await getUserByUsername(username);
             if(user.length>0)
             {
                 setUser(user[0]);
                 setUserExists(true);
             }
             else{
                 
                 history.push(ROUTES.NOT_FOUND);
             }

             
         }
         checkUserExist();
         
    },[username,history]);
    return userExist? ( 
        <div className="bg-gray-background">
            <Header/>
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user}/>
               
            </div>
        </div> ): null
}
Profile.propTypes = {
    username: PropTypes.string.isRequired
}