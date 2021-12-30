// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5fMPBHRydKrySQw22N17eAZmDhxCAnt0",
  authDomain: "jellist-72387.firebaseapp.com",
  projectId: "jellist-72387",
  storageBucket: "jellist-72387.appspot.com",
  messagingSenderId: "121570492708",
  appId: "1:121570492708:web:bbca3d6c3decf8804d73b1",
  measurementId: "G-JLRTNB9CC5"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
//const analytics = getAnalytics(app);

export { auth };