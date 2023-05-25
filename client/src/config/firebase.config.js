// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATRr8A5rFc_GYosTqe7bJydmkl5FwZP4Y",
    authDomain: "resturantapplication-ab6e1.firebaseapp.com",
    databaseURL: "https://resturantapplication-ab6e1-default-rtdb.firebaseio.com",
    projectId: "resturantapplication-ab6e1",
    storageBucket: "resturantapplication-ab6e1.appspot.com",
    messagingSenderId: "102692587185",
    appId: "1:102692587185:web:b44e71a3bcaea7ff670490",
    measurementId: "G-BGDHS0547T"
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, storage, analytics }
