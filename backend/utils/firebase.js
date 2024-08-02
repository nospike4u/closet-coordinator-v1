import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

dotenv.config();

console.log(process.env.OPEN_AI_APIKEY);

const firebaseConfig = {
  apiKey: process.env.OPEN_AI_APIKEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
