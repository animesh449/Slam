import {useState} from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import "../../index.css";
import {FcLike,FcSms}from 'react-icons/fc'
import Modal from './modal';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import * as ROUTES from '../../constants/routes';
import { deletePhoto } from '../../services/firebase';
export default function Photos({photos,photoDocId})

{  
    function checkIfFollowing()
    {
        
    }
    let [show,setShow]=useState(false);
    let[content,setContent]=useState('');
    return  <div className="h-16 border-t border-gray-primary mt-12 pt-4">
        
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
         {!photos? (
             <>
             <Skeleton count={12} width={320} height={400}/> 
             </>
         ): photos.length>0? photos.map((photo)=>( 
                <div key={photo.docId} className="relative group border-2 border-white rounded" onClick={()=> {setShow(true)
                    setContent(photo)
                    console.log('clicked')}}>
                 <img src={photo.imageSrc} alt={photo.caption} className='object-cover h-full' />
                 <div className="absolute bottom-0 left-0 z-10 w-full justify-evenly items-center h-full bg-black bg-opacity-50 group-hover:flex hidden">
                <p className='flex items-center text-white font-bold'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                 {!photo.likes?"0": photo.likes.length}
                  </p>
                  <p className="flex items-center text-white font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {!photo.comments?"0": photo.comments.length}
                  </p>
                  <p className="flex items-center text-white font-bold"   onChange={(e)=>e.stopPropagation()} onClick={(url=photo.imageSrc)=>deletePhoto(photo.imageSrc,photoDocId[0])}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg></p>
      </div>
             </div>
         )):null}
      </div>
      {!photos|| (photos.length===0 && <p className="text-center text-2xl text-white">No Memories Yet! 🌠 </p>)}
   

    </div>;}

Photos.propTypes={
    photos: PropTypes.array.isRequired
}





