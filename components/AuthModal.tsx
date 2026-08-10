'use client';

import { useState, type FormEvent } from "react";
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
import Image from 'next/image';
import googleLogo from '@/public/google.png';

export default function AuthModal() {
    const dispatch = useDispatch();
    const { isOpen, view } = useSelector((state: RootState) => state.authModal);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [resetSent, setResetSent] = useState(false);

    if (!isOpen) return null;

    //Handle Form Login / Register
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

  return (
    <div className="auth__wrapper fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="auth relative w-full max-w-[400px] bg-white rounded-lg p-8 shadow-xl flex flex-col items-center">
        {/* cspell:ignore Summarist */}
        <button
          type="button"
          aria-label="Close authentication modal"
          className="auth__close-button absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-black"
          onClick={() => dispatch(closeModal())}
        >
          <IoClose size={22} />
        </button>

        <h2 className="text-2xl font-bold-800 text-[#032b41]">
          {view === 'login' ? 'Log in to Summarist' : 'Sign up for Summarist'}
        </h2>

        {error && <p className="text-xs text-red-500 mb-3 text-center">{error}</p>}
        {resetSent && (
          <p className="text-xs text-green-600 mb-3 text-center">
            Password reset link sent to your email!
          </p>
        )}

        <div className="auth__content w-full flex flex-col gap-3">
          <button
            type="button"
            onClick={handleGuestLogin}
            className="flex items-center justify-center gap-3 w-full py-2.5 px-4 bg-[#3a57e8] hover:bg-[#2f47c3] text-white font-medium text-sm rounded transition"
          >
            <span className="text-lg">👤</span>
            Login as a Guest
          </button>

          <div className="text-center text-xs text-gray-400 font-medium my-1">or</div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full py-2.5 px-4 bg-[#4285f4] hover:bg-[#3367d6] text-white font-medium text-sm rounded transition"
          >
            <div className="bg-white p-1 rounded flex items-center justify-center">
              <Image src={googleLogo} alt="Google logo" width={16} height={16} />
            </div>
            Login with Google
          </button>

          <div className="text-center text-xs text-gray-400 font-medium my-1">or</div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2.5 border border-gray-300 text-sm outline-none  focus:border-[#2bd97c]"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2.5 border border-gray-300 text-sm outline-none  focus:border-[#2bd97c]"
              required
            />

            <button
              type="submit"
              className="w-full py-2.5 bg-[#2bd97c] hover:bg-[#20bd6a] text-[#032b41] font-bold text-sm rounded mt-1 transition"
            >
              {view === 'login' ? 'Log in' : 'Create account'}
            </button>
            </form>

            {view === 'login' && (
              <div
              onClick={handleForgotPassword}
              className="auth__forgot-password text-center text-xs text-blue-500 hover:underline cursor-pointer mt-2">
                Forgot password?
              </div>
            )}
            <button
            onClick={() => {
              setError('');
              setResetSent(false);
              dispatch(switchView(view === 'login' ? 'signup' : 'login'));
            }}
            className="auth__switch-btn text-center text-xs text-blue-500 hover:underline cursor-pointer mt-1">
              {view === 'login' ? "Don't have an account?" : "Already have an account?"}
            </button>
        </div>
      </div>
    </div>
  );
}