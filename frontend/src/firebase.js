import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1ORncCiX1B76NhpuRXgW-iilKuQr3pNA",
    authDomain: "samagpt.firebaseapp.com",
    projectId: "samagpt",
    storageBucket: "samagpt.firebasestorage.app",
    messagingSenderId: "114346635128",
    appId: "1:114346635128:web:c2a61eeddca08dce2ca28d",
    measurementId: "G-67RHB2NW8L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
try {
    analytics = getAnalytics(app);
} catch (error) {
    console.warn("Firebase Analytics initialization failed:", error);
}
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        console.error("Error signing in with Google", error);
        throw error;
    }
};

export const logOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out", error);
    }
};

export { app, analytics };
