'use client';

import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeModal, switchView} from '@/redux/authModalSlice';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signInAnonymously,
    sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from '@/firebase/firebase';
import { IoClose } from 'react-icons/io5';

export default function AuthModal() {
    const dispatch = useDispatch();
    const { isOpen, view } = useSelector((state: RootState) => state.authModal);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [resetSent, setResetSent] = useState(false);

    if (!isOpen) return null;

    //Handle Form Login / Register
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            if (view === 'login') {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            dispatch(closeModal());
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    //Login as Guest
    const handleGuestLogin = async () => {
        try {
            await signInAnonymously(auth);
            dispatch(closeModal());
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    //Login with Google
    const handleGoogleLogin = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        dispatch(closeModal());
    } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An error occurred');
    }
 };

 //Password Reset

 const handleForgotPassword = async () => {
    if (!email) {
        setError("Please enter your email address first.");
        return;
    }
    try {
        await sendPasswordResetEmail(auth, email);
        setResetSent(true);
    } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An error occurred');
    }
 };

 return(  
    <div className="auth__wrapper fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="auth relative w-full max-w-[400px] bg-white rounded-lg p-8 shadow-xl flex flex-col items-center">
            <button
                type="button"
                aria-label="Close authentication modal"
                className="auth__close-button absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-black"
                onClick={() => dispatch(closeModal())}
            >
                <IoClose size={22} />
            </button>
        </div>
        <h2 className="text-xl font-bold text-[#032b41] mb-6">
            {view === 'login' ? 'Log in to Summarist' : 'Sign up for Summarist'}
        </h2>

        {error && <p className="text-xs text-red-500 mb-3 text-center">{error}</p>}
        {resetSent && <p className="text-xs text-green-600 mb-3 text-center">Password reset link sent to your email!</p>}

        <div className="auth__content w-full flex flex-col gap-3">
            <button
            onClick={handleGuestLogin} 
            className="flex items-center justify-center gap-3 w-full py-2.5 px-4 bg-[#3a57e8] hover:bg-[#2f47c3] text-white font-medium text-sm rounded transition">
                <span className="text-lg">👤</span>Login as a Guest
            </button>
           <div className="text-center text-xs text-gray-400 font-medium my-1">or</div> 
       


        </div>
    </div>  
 );
}