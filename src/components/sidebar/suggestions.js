import {useState ,useEffect} from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import {getSuggestedProfiles} from '../../services/firebase';
import SuggestedProfiles from './suggestedprofiles';



export default function Suggestions({userId,following,loggedInUserDocId}){
    const [profiles,setProfiles]=useState(null);


//Go ahead and get the profiles
useEffect(()=>{
     async function suggestedProfiles(){
         const response= await getSuggestedProfiles(userId,following);
         setProfiles(response);
     }
    
    if(userId)
    {suggestedProfiles()}

},[userId]);
return !profiles?(
    <Skeleton count={1} height={100} className="mt-5"/>
):profiles.length>0?(
    <div className="rounded flex-flex-col">
        <div className="text-sm flex items-center align-items justify-between mb-2">
    <p className="font-bold text-white">Suggestions for you</p>
    </div>
    <div className="mt-4 grid gap-3">
        {profiles.map((profile)=>(<SuggestedProfiles 
        key={profile.docId} 
         profileDocId={profile.docId}
         username={profile.username} 
         profileId={profile.userId} 
         userId={userId}
         loggedInUserDocId={loggedInUserDocId}
         photoUrl={profile.profileUrl}/>))}
    </div>
    </div>
): null;}
Suggestions.propTypes={
    userId: PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string
}