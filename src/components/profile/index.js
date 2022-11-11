import Proptypes from 'prop-types';
import Header from './header';
import { useEffect ,useReducer } from 'react';

import {getUserByUsername,getUserPhotosByUsername} from '../../services/firebase';
import Photos from './photos';



export default function UserProfile ({user})
{
const reducer =(state,newState)=>({...state,...newState});
const initialState ={
    profile:{},
    photosCollection:[],
    photoDocId:'',
    followerCount: 0,
    following:[]
};  



    const [{profile,photosCollection,photoDocId,followerCount,following},dispatch]=useReducer(reducer,initialState);
    useEffect(()=>{
        console.log(user);
         async function getProfileInformation(){
             const photos= await getUserPhotosByUsername(user.username);
            dispatch({profile: user, photosCollection: photos,photoDocId: photos.map(item=> item.docId), followerCount: user.followers.length,following:user.following.map(item=>item)});
            console.log("profile",profile)


         }
        if(user.username){
            getProfileInformation();
        }
    },[user.username])
    return (
        <>
        <Header photosCount={photosCollection? photosCollection.length:0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}/>
        <Photos photos={photosCollection} photoDocId={photoDocId} following={following}/>
        
        </>
    );
};

UserProfile.propTypes={
    user: Proptypes.shape({
        dateCreated: Proptypes.number.isRequired,
        following: Proptypes.array.isRequired,
        fullname: Proptypes.string.isRequired,
        username: Proptypes.string.isRequired,
        userId: Proptypes.string.isRequired,
        emailAddress: Proptypes.string.isRequired,
        followers: Proptypes.array.isRequired
    })
}