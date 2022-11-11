import React,{useContext,useState} from 'react';
import "../../index.css";
import UserContext from '../../context/user';
import {getUserByUserId} from '../../services/firebase';
import { updateUserProfile } from '../../services/firebase';
import { storage } from "../../lib/firebase";
import {useHistory} from 'react-router-dom';
export default function EditProfile()
{
   const [docId,setDocId]=useState('');
   const {user}=useContext(UserContext)
   const [url,setUrl]=useState('');
   const [description,setDescription]=useState('');
   const [file, setFile] = useState(null);
   const [URL, setURL] = useState("");
   const [newDescription,setnewDesription]=useState('');

   console.log(user);

   async function getProfilePhoto(user)
   {
      let result= await getUserByUserId(user.uid);
      result.map(item=> {setUrl(item.profileUrl)
      setDescription(item.description)
      setDocId(item.docId);})
      
      

   } 
   function goBack()
   {
     useHistory.push('/');
   }
   function handleChange(e) {
    setFile(e.target.files[0]);
    console.log(e.target.files);
    console.log(file);
  }
  function handleUpload(e) {
    e.preventDefault();
    const ref = storage.ref(`/avatars/${user.uid}/${file.name}`);
    const uploadTask = ref.put(file);
    uploadTask.on("state_changed",(snapshot)=>{ 
           //convert the bytes uploaded and the bytes to be uploaded to percentage
           let progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
          //  setProgress(progress);
    }, console.error, () => {
      ref
        .getDownloadURL()
        .then((address) => {
          setFile(null);
          setURL(address);
          console.log(address);
          updateUserProfile(docId,address,newDescription)
        });
    });
  }

   getProfilePhoto( !user?"": user);
   console.log(description);
   console.log(url);
   console.log('uid',docId)

    return (<div className="py-20 px-2 w-screen">
       <form onSubmit={handleUpload} className="w-96 mx-auto">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  
                  <div>
                    <label for="about" className="block text-sm font-medium text-gray-700">
                      About
                    </label>
                    <div className="mt-1">
                      <textarea id="about" name="about" rows="3" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder={description} onChange={(e) => setnewDesription(e.target.value)}></textarea>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>
      
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Photo
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      <div >
                      <img className="rounded-full h-24 w-24 flex items-center justify-center..." alt={`profile picture`} src={url}/>
            
            
           
                        </div>
                      </span>
                      <button type="button" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Change
                      </button>
                    </div>
                  </div>
      
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cover photo
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label for="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleChange}/>
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex ">
                  <button  type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Save
                  </button>
                  <div className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={()=> window.history.back()}>Go Back</div>
                </div>
              </div>
            </form>
    </div>
        )
        
}