import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID || import.meta.env.VITE_FIREBASE_APP_ID,
};

// Add debug logging in development
if (import.meta.env.DEV) {
  console.log('Firebase Config:', {
    apiKey: firebaseConfig.apiKey ? 'exists' : 'missing',
    authDomain: firebaseConfig.authDomain ? 'exists' : 'missing',
    projectId: firebaseConfig.projectId ? 'exists' : 'missing',
    storageBucket: firebaseConfig.storageBucket ? 'exists' : 'missing',
    messagingSenderId: firebaseConfig.messagingSenderId ? 'exists' : 'missing',
    appId: firebaseConfig.appId ? 'exists' : 'missing',
  });
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
