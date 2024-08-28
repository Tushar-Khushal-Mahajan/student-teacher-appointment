
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getDatabase, ref, set, get, child, update } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1uqG9AUkJHdIQg05FWzCWVPUZf9drfFo",
    authDomain: "student-teacher-appointm-1e317.firebaseapp.com",
    databaseURL: "https://student-teacher-appointm-1e317-default-rtdb.firebaseio.com",
    projectId: "student-teacher-appointm-1e317",
    storageBucket: "student-teacher-appointm-1e317.appspot.com",
    messagingSenderId: "1027613103521",
    appId: "1:1027613103521:web:c7bca71dfbcdec107c27e0",
    measurementId: "G-QW84SZXS55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

console.log(db);


const auth = getAuth();



async function writeUserData(tblName, User) {

    const db = getDatabase();
    set(ref(db, `${tblName}/` + User.uId), {
        User
    });

}


export { getDatabase, ref, set, get, child, update };
export { app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, writeUserData };