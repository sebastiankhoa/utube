import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: "may-2022-fc04b.firebaseapp.com",
	databaseURL: "https://may-2022-fc04b-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "may-2022-fc04b",
	storageBucket: "may-2022-fc04b.appspot.com",
	messagingSenderId: "778566554601",
	appId: "1:778566554601:web:a4e91e22cfb0d49c8cb178",
	measurementId: "G-1YF9NKHWW0",
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export default app;
