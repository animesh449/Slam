import {useState ,useContext,useEffect} from 'react';
import FirebaseContext from '../../context/firebase';
import PropTypes from 'prop-types';
import UserContext from '../../context/user';
import {getUserByUserId,sendActionNotification} from "../../services/firebase";

export default function Actions({docId,totalLikes,likedPhoto,handleFocus,userDocId}){
 const { user: {uid: userId=''}}=useContext(UserContext);

 const [toggleLiked,setToggleLiked]=useState(likedPhoto);
 const [likes,setLikes]=useState(totalLikes);
 const {firebase,FieldValue}=useContext(FirebaseContext);

 const handleToggleLiked=async ()=>{
  
     setToggleLiked((toggleLiked)=> !toggleLiked);
     const result=  (await getUserByUserId(userId)).map(item=> item.username)

        //updating the likes 
        await firebase.firestore().collection('photos').doc(docId).update
        ({likes:toggleLiked? FieldValue.arrayRemove(userId): FieldValue.arrayUnion(userId)});
        //updating the notification array for likes 
        if(!toggleLiked)
        {
            console.log('i am from actions',userDocId,docId,result);
            sendActionNotification(userDocId,docId,result,'adore');
        }
        
       
      




     


        setLikes((likes)=> (toggleLiked? likes-1 : likes+1));
;

 }
 return (
    <>
    <div className="flex justify-center p-4" >
        <div className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" className ={`w-8 mr-4 select-none cursor-pointer ${toggleLiked ? 'fill-red text-primary': 'text-black-light'}`} onClick={handleToggleLiked} fill="none" viewBox="0 0 24 24" stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
       </svg>
        <svg
        onClick={handleFocus}
        onKeyDown={(event) => {
            if(event.key==="Enter")
            {
                handleFocus();
            }
        }}
        xmlns="http://www.w3.org/2000/svg" className="w-8 mr-4 select-none cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        </div>
    </div>
    <div className="p-4 py-0 flex justify-center">
        <p className="font-bold text-red-400">{likes===1 ? `${likes} adores` : likes>1 && likes===0? `${likes} adore`: `${likes} adore`}</p>
    </div>
    </>
    
    
    )
}
Actions.propTypes={
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired,
}

