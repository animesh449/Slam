import {useState,useContext}from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import { sendActionNotification } from '../../services/firebase';


export default function AddComment({userDocId,docId,comments,setComments,commentInput})
{
    const [comment,setComment]=useState('');
    const {firebase,FieldValue}=useContext(FirebaseContext);
    const date=Date.now();

    const {
        user: {displayName,uid}}
        =useContext(UserContext)

    const handleSubmitComment=(event)=>{
        event.preventDefault();
        setComments([{displayName,comment,date},...comments]);
        setComment('');
        //give me a new array
        //put the new comment in there
        // add the old setComments
        //the we have a new array with the new comment and the older comments
        firebase.firestore()
        .collection('photos')
        .doc('awEIy1zSbMTnlXEqH1g7').update({comments: FieldValue.arrayUnion({displayName,comment,date})})
         // updating the notification array for comments 
         console.log(userDocId,docId,displayName);
         sendActionNotification(userDocId,docId,displayName,'comment');
    };
    return (
       < div className="border-t border-gray-primary">
           <form className="flex justify-between pl-0 pr-5"
           method="POST"
           onSubmit={(event)=> comment.length >= 1? handleSubmitComment(event): event.preventDefault()}>

          <input aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4 placeholder-blue-400"
          type="text"
          name="add-comment"
          placeholder="Add a comment"
          value={comment}
          onChange={({target})=> setComment(target.value)}
          />
          <button className={`text-sm font-bold text-blue-400  ${!comment && 'opacity-25'}`} type="button" disabled={comment.length<1} onClick={handleSubmitComment}>Post</button>

           </form>
       </div>

    );
}  
AddComment.propTypes={
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,

    setComments: PropTypes.func.isRequired,
    commenInput: PropTypes.object


}