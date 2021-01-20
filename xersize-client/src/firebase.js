import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyAv-LtUmeCYG3v0ONUadqVqmUSThI8Nlek",
    authDomain: "xersize-1a556.firebaseapp.com",
    projectId: "xersize-1a556",
    storageBucket: "xersize-1a556.appspot.com",
    messagingSenderId: "120144411044",
    appId: "1:120144411044:web:dc40028eada7cdc7a16931",
    measurementId: "G-0TPHES8TL2"
})

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = app.auth();
export default app;