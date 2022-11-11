import {useRef} from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Actions from './actions'
import Footer from './footer';
import Comments from './comments';

export default function Post({content,username}){
  const commentInput=useRef(null);
 const handleFocus=()=>commentInput.focus(); 
 console.log('i am from post',content);

  
  
  //components
 //header ,image , actions,(like,comments),footer,coments
   return <div className='rounded col-span-4 border-2 bg-white border-blue-400 mb-14'>
     <Header username={content.username} Username={username}/>
   <Image src={content.imageSrc} caption={content.caption}/>
  <Actions 
  followedUserUserId={content.userId}
  docId={content.docId}
  totalLikes={content.likes.length}
  likedPhoto={content.userLikedPhoto} handleFocus={handleFocus}
  userDocId={content.userDocId}
  />
  <Footer caption={content.caption} username={content.username}/>
  <Comments userDocId={content.userDocId} docId={content.docId} comments={content.comments} posted={content.dateCreated} commentInput={commentInput} />
  
   </div>
    
} 

Post.propTypes={

content: PropTypes.shape({
username: PropTypes.string.isRequired,
imageSrc: PropTypes.string.isRequired,
caption: PropTypes.string.isRequired,
docId: PropTypes.string.isRequired,
userLikedPhoto: PropTypes.bool.isRequired,
likes: PropTypes.array.isRequired,
comments: PropTypes.array.isRequired,
dateCreated: PropTypes.number.isRequired
})
    }