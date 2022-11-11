import Firebase from 'firebase/app';
import 'firebase/firestore' ;
import 'firebase/auth';
import 'firebase/storage';
import { seedDatabase } from '../seed';

////here i want  to import the seed file
const config={
        apiKey: "AIzaSyBt2XpEqYCuLIWi5m2mp_0CUbym1Sk4UmA",
        authDomain: "vibez-bb919.firebaseapp.com",
        projectId: "vibez-bb919",
        storageBucket: "vibez-bb919.appspot.com",
        messagingSenderId: "151601006031",
        appId: "1:151601006031:web:5630009e6f748ef96b3eba"
    };


const firebase=Firebase.initializeApp(config);
const {FieldValue,onSnapshot,collection,query,where}=Firebase.firestore;
const storage=Firebase.storage()

//here is where i want to call the seed file only once
//  seedDatabase(firebase);

export {firebase, FieldValue,collection,query,where,onSnapshot,storage};
