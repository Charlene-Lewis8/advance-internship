'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
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
    const router = useRouter();
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
            router.push('/for-you');
            dispatch(closeModal());
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    //Login as Guest
    const handleGuestLogin = async () => {
        try {
            await signInAnonymously(auth);
            router.push('/for-you');
            dispatch(closeModal());
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    //Login with Google
    const handleGoogleLogin = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log('Successfully logged in with Google:', user.displayName);
        router.push('/for-you')
        dispatch(closeModal());
    } catch (err: unknown) {
        const firebaseError = err as { code?: string; message?: string };
        const code = firebaseError.code ?? '';

        if (code === 'auth/popup-closed-by-user') {
          setError('Login window was closed before completing. Please try again.');
        } else {
          setError(
            err instanceof Error
              ? err.message
              : firebaseError.message || 'Failed to sign in with Google. Please try again.'
          );
        }
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
      <div className="auth relative w-full max-w-120 bg-white rounded-lg p-10 shadow-2xl flex flex-col items-center">
        {/* cspell:ignore Summarist */}
        <button
          type="button"
          aria-label="Close authentication modal"
          className="auth__close-button absolute top-5 right-5 cursor-pointer text-gray-400 hover:text-black-700 transition"
          onClick={() => dispatch(closeModal())}
        >
          <IoClose size={22} />
        </button>

        <h2 className="text-2xl font-bold-800 text-[#032b41] text-center">
          {view === 'login' ? 'Log in to Summarist' : 'Sign up for Summarist'}
        </h2>

        {error && <p className="text-xs text-red-500 mb-4 text-center">{error}</p>}
        {resetSent && (
          <p className="text-xs text-green-600 mb-4 text-center">
            Password reset link sent to your email!
          </p>
        )}

        <div className="auth__content w-full flex flex-col gap-3">
          <button
            type="button"
            onClick={handleGuestLogin}
            className="relative flex items-center justify-center w-full h-11.5 py-2.5 px-4 bg-[#3a57e8] hover:bg-[#2f47c3] text-white font-medium text-sm rounded transition overflow-hidden"
          >
            <span className="absolute left-4 top-1/2 -translate-y-1/2 w-12.5 h-[calc(100%-12px)] flex items-center justify-center bg-black/10 text-lg rounded">👤</span>
            <span className="text-lg">Login as a Guest</span>
          </button>

          <div className="text-center text-sm text-gray-400 font-medium my-1">or</div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="relative flex items-center justify-center w-full h-11.5 py-2.5 px-4 bg-[#4285f4] hover:bg-[#3367d6] text-white font-medium text-sm rounded transition overflow-hidden border border-[#4285f4]"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-12.5 h-[calc(100%-12px)] flex items-center justify-center bg-white p-1 rounded">
              <Image src={googleLogo} alt="Google logo" width={20} height={20} />
            </div>
            <span className="text-lg">Login with Google</span>
          </button>

          <div className="text-center text-xs text-gray-400 font-medium my-1">or</div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full h-11 px-4 rounded border border-gray-300 text-sm outline-none focus:border-[#2bd97c]"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full h-11 px-4 rounded border border-gray-300 text-sm outline-none focus:border-[#2bd97c]"
              required
            />

            <button
              type="submit"
              className="w-full h-11 bg-[#2bd97c] hover:bg-[#20bd6a] text-white font-medium text-sm rounded mt-2 transition"
            >
              {view === 'login' ? 'Log in' : 'Create account'}
            </button>
            </form>

            {view === 'login' && (
              <div
              onClick={handleForgotPassword}
              className="auth__forgot-password text-center text-sm text-blue-500 hover:underline cursor-pointer mt-2">
                Forgot password?
              </div>
            )}
            <button
            onClick={() => {
              setError('');
              setResetSent(false);
              dispatch(switchView(view === 'login' ? 'signup' : 'login'));
            }}
            className="auth__switch-btn text-center text-sm text-blue-500 hover:underline cursor-pointer mt-1">
              {view === 'login' ? "Don't have an account?" : "Already have an account?"}
            </button>
        </div>
      </div>
    </div>
  );
}