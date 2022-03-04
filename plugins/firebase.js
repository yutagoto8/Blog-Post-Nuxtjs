// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCsEG9fUFP2QKgngn8TxVA0Wbp_NQWKGEU',
  authDomain: 'blogpost-fd8df.firebaseapp.com',
  projectId: 'blogpost-fd8df',
  storageBucket: 'blogpost-fd8df.appspot.com',
  messagingSenderId: '550533024961',
  appId: '1:550533024961:web:a5c816661709e9b6da5840'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
