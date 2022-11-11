import "../../index.css";
import React from 'react';


export default function showFollowers({show,onClose})
{
    if(show==true){
        return (
            <div className="fixed h-screen w-54 bg-white" onClick={onClose}>
                <div>Hello There</div>
            </div>
        )
    }
    else {
        return 
    }
}
