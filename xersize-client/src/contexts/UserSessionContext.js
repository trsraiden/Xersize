import React, {useContext, useState, useEffect} from 'react'
import {auth, googleAuthProvider} from '../firebase'
import axios from 'axios';

const UserSessionContext = React.createContext()

export function useUser(){
    return useContext(UserSessionContext)
}

export function UserSessionProvider({children}) {
    const [currentUser, setCurrentUser] =useState()
    const [loading, setLoading] = useState(true)

    //original
    function signup(email, password){
        auth.createUserWithEmailAndPassword(email, password)
    }

    //trying email verification
    // function signup(email, password){
    //     auth
    //     .createUserWithEmailAndPassword(email, password)
    //     .then(user => {
    //         user.sendEmailVerification()
    //     })
    // }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function googleLogin(){
       return auth.signInWithRedirect(googleAuthProvider)
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    function updatePassword(password){
        return currentUser.updatePassword(password)
    }

    function deleteAccount(){
        axios.delete('/users/deleteUser',{data:{username:currentUser.email}})
        return currentUser.delete()
    }

    function setActiveID(typeID,setID){
        try{
            window.localStorage.setItem(typeID, JSON.stringify(setID));
        }catch(err){
            console.log(err)
        }
    }

    function getActiveID(typeID){
        try{
            const activeID = JSON.parse(window.localStorage.getItem(typeID));
            return activeID
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
        })
        return () => unsubscribe
    }, [])
    
    const value = {
        currentUser,
        login,
        googleLogin,
        signup,
        logout,
        resetPassword,
        updatePassword,
        deleteAccount,
        setActiveID,
        getActiveID
    }

    return (
        <UserSessionContext.Provider value={value}>
            {!loading && children}
        </UserSessionContext.Provider>
    )
}