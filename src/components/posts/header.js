import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { getUserByUsername } from '../../services/firebase';
import { useEffect ,useState} from 'react';
import { set } from 'date-fns/esm';

export default function Header({username,Username}){
    const[profileUrl,setprofileUrl]=useState('');
    useEffect(async()=>{
        if(username===undefined)
        {
            let result = await getUserByUsername(Username);
            setprofileUrl(result[0].profileUrl)
        }
        else{
            let result = await getUserByUsername(username);
            setprofileUrl(result[0].profileUrl)      
        }
      
    },[])


    return (
        <div className="flex border-b border-gray-primary h-4 p-4 py-8">
            <div className="flex items-center">
            <Link to={`/p/${username===undefined?Username:username}`} className="flex items-center">

            <img className='rounded-full h-8 w-8 flex mr-3'
             src={profileUrl}
             alt={`${username===undefined?Username:username} profile picture`}/>
             <p className='font-bold '>{username===undefined?Username:username}</p>
             </Link>
             


            </div>
             <div className='w-full'>
                 <div className='flex justify-end' onClick={()=>console.log("clicked")}> <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
</svg></div>
             </div>

        </div>
    )
}
Header.propTypes={
    username: PropTypes.string.isRequired
};