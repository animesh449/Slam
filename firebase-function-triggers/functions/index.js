const functions = require("firebase-functions");
const admin=require('firebase-admin');

admin.initializeApp();
const db=admin.firestore();


exports.onUserCreate=functions.firestore.document('users/{userId}').onCreate(async(snap,context)=>{
    const values=snap.data();
    //send email
    await db.collection('logging').add({description:`Email was sent to user with username ${values.username}`})
})