import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle } from '../firebase';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black text-white">
                <Loader2 className="animate-spin text-white" size={48} />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-white px-4 text-center">
                <h2 className="text-3xl font-light mb-4">Access Restricted</h2>
                <p className="text-gray-400 mb-8 max-w-md">
                    You need to sign in to access the chat functionality and verify your account.
                </p>
                <button
                    onClick={signInWithGoogle}
                    className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors"
                >
                    Sign In with Google
                </button>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
