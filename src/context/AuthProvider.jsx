import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import { useEffect, useState } from "react";


const AuthProvider= ({children})=>{
    const [user, setUser]= useState(null); 
    const [loading, setLoading]= useState(true); 

    const createUser= (email, password)=>{
        setLoading(true); 
        return createUserWithEmailAndPassword(auth, email, password); 
    }

    const signIn= (email, password)=>{
        setLoading(true); 
        return signInWithEmailAndPassword(auth, email, password); 
    }

    //Google login
    const provider= new GoogleAuthProvider(); 
    const googleLogin= ()=>{
        return signInWithPopup(auth, provider); 
    }

    const logout= ()=>{
        setLoading(true); 
        return signOut(auth); 
    }

    //user observer for any user changes
    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser); 
            setLoading(false); 
        }); 
        return unsubscribe(); 
    },[])

    const authInfo= {
        user, 
        loading,
        createUser, 
        signIn, 
        logout,
        googleLogin
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )
}

export default AuthProvider; 