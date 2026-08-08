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
import Image from 'next/image';

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



    //finish adding the modal with the form and buttons for login, register, guest login, google login, and password reset
 )}