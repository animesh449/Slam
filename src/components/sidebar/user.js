import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import {memo} from 'react';

const User=({username , fullname,profileUrl})=>
       !username || !fullname?(
        <Skeleton count={1} height={61}/>
    ):( 
        <Link to={`p/${username}`} className='grid grid-cols-4 gap-4 items-center mb-6'>
            <div className='flex items-center justify-between col-span-1'>
              <img className="rounded-full w-16 flex mr-3 object-contain"
              src={profileUrl}
              alt=''/>
            </div>
            <div className="col-span-3">
                <p className="font-bold text-sm text-white">{username}</p>
                <p className="text-sm text-white">{fullname}</p>
            </div>
        </Link>
    );

export default memo(User);

User.propTypes={
    username: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired
};


// Using react memo we can skip a component re render if their prop types are same