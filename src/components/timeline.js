import {useEffect,useState}from 'react';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';
import useUser from '../hooks/use-user';
import Post from './posts/index';
import { getUserByUserId } from '../services/firebase';

export default function Timeline()
{
    //need to get the logged in user's photos
    const {photos}=usePhotos();
    const {user}= useUser()
    console.log('I am the photos',photos);
    // useEffect(async () => {
    //      let result=await getUserByUserId(user.uid);
    //      result.forEach(item=> setUrl(item.profileUrl));
    // },[])
    // on loading the photos we need to use react skeleton
    // if you have photos , render them
    //if they dont have any photos tell them to create some photos
    return (
         <div className="container col-span-2">
             {!photos?(
                 <>
                
                    <Skeleton  count={4} width={640} height={600} className="mb-5"/>
                 </>
             ): photos?.length>0?(

                 
               photos.map((content)=> <Post content={content} key={content.docId} /> 
               
                          
               
            
                )

             ):(<p className="text-center text- text-white">Follow people to see photos!</p>)}
              
          


         </div>
    )
}