import React, { useState,useEffect } from "react";

 import { storage } from "../lib/firebase";
 import '../index.css';
 import useUser from '../hooks/use-user';
 import  { uploadUserPhoto ,getPhotoDocIdbyUsername} from '../services/firebase';
 import * as ROUTES from '../constants/routes';
 import {Redirect} from 'react-router-dom';


 export default function Upload() {
   const {user:{userId,username}}= useUser();
   const [file, setFile] = useState(null);
   const [url, setURL] = useState("");
   const [caption,setCaption]=useState("");
   const [progress,setProgress]=useState(0);
   useEffect(()=>console.log(progress),[progress]);

   function handleChange(e) {
     setFile(e.target.files[0]);
     console.log(e.target.files);
     console.log(file);
   }
   function handleCaption(e){
     setCaption(e.target.value);
   }
   function alertUser()
   {
     alert('Memories has been successfully added');
   }
  

   function handleUpload(e) {
     e.preventDefault();
     const ref = storage.ref(`/images/${userId}/${file.name}`);
     const uploadTask = ref.put(file);
     uploadTask.on("state_changed",(snapshot)=>{ 
            //convert the bytes uploaded and the bytes to be uploaded to percentage
            let progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            setProgress(progress);
           
     }, console.error, () => {
       ref
         .getDownloadURL()
         .then((url) => {
           setFile(null);
            
           setURL(url);
           console.log(url);
           uploadUserPhoto(userId,url,caption);
           setProgress(0);
           alertUser();
           window.history.back();
           
             
           
           
         });
     });
   }
   return (<div className='w-screen'>
     <form onSubmit={handleUpload}>
    <div className="py-20 h-screen bg-white-300 px-2">
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg border border-indigo-600 ...">
        <div className="md:flex">
            <div className="w-full">
                <div className="p-4 border-b-2"> <span className="text-lg font-bold text-gray-600">Add Memories</span> </div>
                <div className="p-3">
                    <div className="mb-2"> <span className="text-sm">Title</span> <input type="text" onChange={handleCaption}className="h-12 px-3 w-full border-gray-200 border rounded focus:outline-none focus:border-gray-300" required/> 
                    </div>
                    <div className="mb-2"> <span>Attachments</span>
                        <div className="relative h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                            <div className="absolute">
                                <div className="flex flex-col items-center "> <i className="fa fa-cloud-upload fa-3x text-gray-200"></i> <span className="block text-gray-400 font-normal">{!file? "Attach Your Files Here":""}</span> <span className="block text-gray-400 font-normal">{!file? "or": ""}</span> 
                                <span className="block text-blue-400 font-normal">{!file? "BrowseFiles": "Image Selected"}</span> </div>
                            </div> <input type="file" onChange={handleChange}className="h-full w-full opacity-0" name=""/>
                        </div>
                        <div className="flex justify-between items-center text-gray-400"> <span>Accepted file type:.doc only</span> <span className="flex items-center "><i className="fa fa-lock mr-1"></i> secure</span> </div>
                    </div>
                    <div className="mt-3 text-center pb-3"> <button disabled={!file}className="w-full h-12 text-lg w-32 bg-blue-600 rounded text-white hover:bg-blue-700">Create</button> </div>
                    <div className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={()=> window.history.back()}>Go Back</div> 
                    {<div className="w-full"> {(progress==0)?'':  <progress className="w-full" value={`${progress}`} max='100' ></progress>} </div>}
                   
                </div>
            </div>
        </div>
    </div>
</div>
</form>
</div>
   
   
   );
   }
    {/* <div>
       <form onSubmit={handleUpload}>
         <input type="file" onChange={handleChange} />
         <input type="text " onChange={handleCaption} placeholder="Enter Caption"/>
         <button disabled={!file} style={{'border': '2px solid red'}}>Upload</button>
        {!file ? console.log("no file selected"): console.log("file selected")}
       </form>
      
       <img src={url}></img>
      
     </div>  */}