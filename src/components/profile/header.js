
import PropTypes from 'prop-types';
import {useState,useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import {isUserFollowingProfile,toggleFollow} from "../../services/firebase";
import "../../index.css";
import {Link }from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import EditProfile from './editprofile';
import showFollowers from './showFollowers';

export default function Header({photosCount,profile:{
    docId: profileDocId, userId: profileUserId,fullName,following=[],followers=[],username: profileUsername, profileUrl,description,verified
},followerCount,setFollowerCount}){
    const {user}=useUser();
    const [isFollowingProfile,setIsFollowingProfile]=useState(false);
    const[show,setShow]=useState(false);
    const activeBtnFollow=user.username && user.username !== profileUsername;
    const handleToggleFollow=async ()=> {
        setIsFollowingProfile((isFollowingProfile)=>!isFollowingProfile);
        console.log("IsFollowingProfile",isFollowingProfile);
        setFollowerCount({followerCount: isFollowingProfile?followerCount-1:followerCount+1});
        console.log(followerCount);
        await toggleFollow(isFollowingProfile,user.docId,profileDocId,profileUserId,user.userId);
    };

    useEffect(()=>{
        const isLoggedInUserFollowingProfile=async ()=>{
           const isFollowing=await isUserFollowingProfile(user.username,profileUserId) ;
           setIsFollowingProfile(isFollowing);
           
        };
     if(user.username && profileUserId) {
         isLoggedInUserFollowingProfile();
     }
    },[user.username,profileUserId])
   
    return <>
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <div className="container flex justify-center">
            {user.username&&(<img className="rounded-full h-40 w-40 flex shadow-3xl object-cover" alt={`${profileUsername} profile picture`} src={profileUrl}/>)}
            
            
           
        </div>
        <div className="flex items-center justify-center flex-col col-span-2">
            <div className="container flex items-center">
                <div className="text-2xl mr-4 text-white">{profileUsername} {verified==true?<p className="text-xs"><svg xmlns="http://www.w3.org/2000/svg" className="fill-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>verified account </p>
                : ''}</div>
               
                {activeBtnFollow && (<button className="bg-blue-500 font-bold text-sm rounded text-white w-20 h-8"
                type="button" onClick={handleToggleFollow}>
                    {isFollowingProfile? '    unfollow': "   follow"} </button>)}
                    {/* {!activeBtnFollow && <Link to={ROUTES.EDIT}><p classname='font-bold'>Edit Profile</p></Link>} */}
            </div>
            <p className="text-white text-xs  bg-green-500 rounded animate-bounce">{!followers.includes(user.userId) && activeBtnFollow?'this user follows you': ''}</p>
            <div className="container flex mt-4">
                {followers==undefined || following==undefined?(<Skeleton count={1} width={677} height={24}/>): (<>
                <p className="mr-10 text-white"><span className="font-bold text-white" >{photosCount} </span > Memories 🤳</p>
                <p className="mr-10 text-white"><span className="font-bold text-white" >{followerCount}</span>{followerCount==1?' follower 💘  ':" followers 👫 "}</p>
                <p className="mr-10 text-white" onClick={()=> setShow(true)}><span className="font-bold text-white" >{following.length}</span> Following 👣 </p>
                
                </>)}
            </div>
            <div className="container mt-4 ">
                { <p className="font-medium text-white">{!fullName?<Skeleton count={1} height={24}/>:`🦸‍♂️ ${fullName}`}</p> }
            </div>
            <p className="font-extralight text-white">...... {description} ......</p>
        </div>
        
    </div>
    <div className="container flex justify-end">
    {!activeBtnFollow && <Link to={ROUTES.EDIT}><div className="text-white bg-blue-700 rounded px-4 py-2 transition duration-500 ease-in-out bg-blue-600 hover:bg-blue-400 transform hover:-translate-y-1 hover:scale-110 ...">Edit Profile</div></Link>}
    </div></>
    ;
}
Header.propTypes={
 photosCount: PropTypes.number.isRequired,
 
 followerCount: PropTypes.array.isRequired,
 setFollowerCount: PropTypes.func.isRequired,
 profile: PropTypes.shape({
     docId: PropTypes.string,
     userId: PropTypes.string,
     fullName: PropTypes.string,
     following: PropTypes.array,
     followers: PropTypes.array,
     username: PropTypes.string
}).isRequired,

}