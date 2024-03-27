// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCw9_KUEQpYUvVoyW45MKUZpt0GTPVSikQ',
  authDomain: 'memorial-campionato-bd0ed.firebaseapp.com',
  projectId: 'memorial-campionato-bd0ed',
  storageBucket: 'memorial-campionato-bd0ed.appspot.com',
  messagingSenderId: '3991882952',
  appId: '1:3991882952:web:1bdbe2e80fdd69f356e9fd',
  measurementId: 'G-4FPZJEQLL8'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)