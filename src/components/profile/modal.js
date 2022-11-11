import React from 'react';
import ReactDOM from 'react-dom';
import '../../index.css';
import Posts from '../posts';


export default function Modal({username,show,content,photoUrl,onClose})
{
    if(show==true)
    {
        return ReactDOM.createPortal(
            <div className='modal-container' onClick={onClose}>
                <div className="modal-body" onClick={(e)=> e.stopPropagation()}>
                    <div className="rounded col-span-4 border-2 bg-white border-blue-400 mb-14 h-10">
                    <Posts content={content} photoUrl={photoUrl} username={username} />
                        </div>
                </div>
               
            </div>,document.getElementById('modal')
        )
    } 
    return <></>
    }
    
