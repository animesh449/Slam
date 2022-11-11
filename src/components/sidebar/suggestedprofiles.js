import PropTypes from 'prop-types';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {BsPersonCheck} from 'react-icons/bs';
import {SendFollowNotification,updateLoggedInUserFollowing,updateFollowedUserFollowers,getUserByUserId} from '../../services/firebase';
export default  function SuggestedProfiles({username,
    profileDocId,
    profileId,
    userId,
    loggedInUserDocId,
     photoUrl}){
    const [followed,setFollowed]=useState(false);
    const loggedinUserInformation= async ()=>{
        var data=await getUserByUserId(userId);
         var result=data.map((item)=>({...item}));
         console.log(result[0].username)
    }
    loggedinUserInformation();

    async function handleFollowUser(){
        setFollowed(true)

        //firebase create 2 services 
        // update the following array of the logged in user 
        await SendFollowNotification(profileId,userId);
        await updateLoggedInUserFollowing(loggedInUserDocId,profileId, false);
        await updateFollowedUserFollowers(profileDocId,userId, false);
        // update the followers array of the user who has been followed 
    }
    
    return !followed?(
        <div className="flex flex-row items-center align-items justify-between ">
            <div className="flex items-center justify-between">
               <img className="rounded-full w-8 flex mr-3" src={photoUrl}
                alt=''/>
                <Link to={`/p/${username}`}>
                    <p className="font-bold text-sm text-white">{username}</p>
                </Link>
            </div>
            <div>
                <button className="text-xs font-bold p-2 text-white hover:text-blue-400" type="button"
                onClick={()=>handleFollowUser()}>Follow</button>
            </div>
           
        
        </div>
    ): null;
}
SuggestedProfiles.propTypes={
    username: PropTypes.string.isRequired,
    profileDocId: PropTypes.string.isRequired,
    profileId:PropTypes.string.isRequired,
    loggedInUserDocId:PropTypes.string.isRequired,
}
