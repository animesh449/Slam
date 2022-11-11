import {firebase,FieldValue,storage,doc,onSnapshot } from "../lib/firebase";

export async function doesUsernameExist(username){
    const result = await firebase.firestore()
    .collection('users')
    .where('username','==',username)
    .get();
    return result.docs.map((user)=>user.data.length>0);
}
export async function getUserByUserId(userId){
    const result=await firebase.firestore().collection('users').where("userId","==",userId).get();
    const user= result.docs.map((item)=>({
        ...item.data(), docId: item.id
    }));

    return user;
}

 export async function SendFollowNotification(profileUserId,followingUserId)
{ 
   
    let user=  (await getUserByUserId(profileUserId)).map(item=> {return {docId:item.docId, followers: item.followers}});
    const result=  (await getUserByUserId(followingUserId)).map(item=> {
        return {username:item.username,userId: item.userId}});
    // const username= result.docs.map(item=> item.data().username);
   console.log('i am from firebase',user);
   if(!user[0].followers.includes(result[0].userId))
   {
    return firebase.firestore().collection('users').doc(user[0].docId).update({notification: FieldValue.arrayUnion({message:`has started following you`, username:`${result[0].username}`})});
   }
   else{
       return null
   }
  
// 
}
export async function sendActionNotification(UserdocId,photoDocId,username,action)
{
    if(action=="adore")
   {
       await firebase.firestore().collection('users').doc(UserdocId).update({ actions : FieldValue.arrayUnion({username: username[0],type:'adore',date: Date.now(),photoDocId: photoDocId})});
}
else if(action=="comment")
{
    await firebase.firestore().collection('users').doc(UserdocId).update({actions: FieldValue.arrayUnion({username: username, type:'comment',date: Date.now(),photoDocId:photoDocId})})
}
}


export async function getSuggestedProfiles(userId,following){
    const result= await firebase.firestore().collection('users').limit(10).get();

    return result.docs.map((users)=>({...users.data(), docId: users.id })).filter((profile)=>profile.userId != userId && !following.includes(profile.userId));
}


export async function updateLoggedInUserFollowing(
    loggedInUserDocId,
    profileId,
    isFollowingProfile){
    return firebase.
    firestore().
    collection('users').
    doc(loggedInUserDocId).
    update({following: isFollowingProfile?FieldValue.arrayRemove(profileId): FieldValue.arrayUnion(profileId)})
};

export async function updateFollowedUserFollowers(
    profileDocId, //currently logged in user doc profileId
    loggedInUserUserId, // logged in user requesting to follow someone
    isFollowingProfile) //true or false /if the user in currently folloeing that person
    {
    
        return firebase.
    firestore().
    collection('users').
    doc(profileDocId).
    update({followers: isFollowingProfile?FieldValue.arrayRemove(loggedInUserUserId): FieldValue.arrayUnion(loggedInUserUserId)})
    };

    export async function getPhotos(userId,following)
    {
        const result= await firebase.firestore().
        collection('photos').
        where('userId','in',following).get();

        const userFollowedPhotos= 
        result.docs.map((photos)=>({...photos.data(), docId: photos.id}));
       
    

        const photosWithUserDetails=await Promise.all(
            userFollowedPhotos.map(async (photo)=>{
                let userLikedPhoto=false;
                if(photo.likes.includes(userId)){
                    userLikedPhoto=true;
                }
                  //photoUserIDs Document Id
        


                //photo.userId=2
                 
                 const user=await getUserByUserId(photo.userId);{
                     //raphael
                     const {username}=user[0];
                     const userDocId=user[0].docId;
                     return {username,userDocId,...photo,userLikedPhoto}
                 }
            })
        )
     return photosWithUserDetails;
    }


    export async function getUserByUsername(username){
        const result = await firebase.firestore()
        .collection('users')
        .where('username','==',username)
        .get();
        return result.docs.map((item)=>({
            ...item.data() ,
        docId: item.id
        }));
       
     }


     export async function getUserPhotosByUsername(username)
     {
        const [user]= await getUserByUsername(username);
        const result= await firebase.firestore().collection('photos').where('userId','==',user.userId).get();
    
        return result.docs.map((item)=>({
            ...item.data(),docId: item.id
        }))
        
     
        

     }

     export async function isUserFollowingProfile(loggedInUserUsername,profileUserId) {
         console.log(loggedInUserUsername,profileUserId);
         const result=await firebase.firestore().collection("users").where("username","==",loggedInUserUsername)//ani (active logged in user)
         .where('following',"array-contains",profileUserId).get();
         const [response={}]=result.docs.map((item)=>({...item.data(),docId:item.id}));


         console.log('response',response); 
         return response.userId;

         
     }

     export async function toggleFollow(
         isFollowingProfile,
         activeUserDocId,
         profileDocId,
         profileUserId,
         followingUserId) {

        await SendFollowNotification(profileUserId,followingUserId);

        //1st param is currently logged in user doc id
        //2nd param is visited user doc userId
        //3rd param : is the user following this profile? eg is animesh follow raphael
        await updateLoggedInUserFollowing(activeUserDocId,profileUserId,isFollowingProfile);
        //1st : currently logged in user  userid
        //2st : raphael doc id is
        //3rd pram: is the user following this profile ? eg is animesh following raphael
         await updateFollowedUserFollowers(profileDocId,followingUserId,isFollowingProfile);

     }

     export async function uploadUserPhoto(userId,url,caption)
    
     {
        firebase
        .firestore()
        .collection('photos')
        .add({
          photoId: '',
          userId: userId,
          imageSrc: url,
          caption: caption,
          likes: [],
          comments: [],
          notifications:[],
          userLatitude: '',
          userLongitude: '',
          dateCreated: Date.now()
        });
     }
  export function updateUserProfile(userDocId,url,description)
  {
      console.log('updating profile');
      console.log(url);
     firebase.firestore().collection('users').doc(userDocId).update({"description": description,"profileUrl":url.toString()});
    
  }

    //  export async function getPhotoDocIdbyUsername(userId) {
    //     const result = await firebase.firestore()
    //     .collection('photos').where("userId","==",userId)
    //     .get();
    //     return result.docs.map((item)=>({
    //         docId: item.id
    //         }));
      

   

        //to check if the same document exist in notification collection
           export async function NotificationDocumentExist(photoDocId)
           {
                 const result= await firebase.firestore().collection('notification').where('photoDocId','==',photoDocId).get();
                 if(result.empty==true) 
                 {
                    
                    return false;
                     
                 }
                 else
                 {
                    
                     return true;
                    
                 }
           }
    
  export async function deletePhoto(url,docId)
  {
   
     console.log('photoDocId',docId)
       try{
          await firebase.firestore().collection('photos').doc(docId.toString()).delete();
       }
       catch(err){
           console.log(err);
          
       }
        //1.
        let pictureRef = storage.refFromURL(url);
       //2.
        pictureRef.delete()
          .then(() => {
            //3.
            alert("Picture is deleted successfully!");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      
  }





    












