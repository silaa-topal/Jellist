// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: "AIzaSyD5fMPBHRydKrySQw22N17eAZmDhxCAnt0",
//   authDomain: "jellist-72387.firebaseapp.com",
//   projectId: "jellist-72387",
//   storageBucket: "jellist-72387.appspot.com",
//   messagingSenderId: "121570492708",
//   appId: "1:121570492708:web:bbca3d6c3decf8804d73b1",
//   measurementId: "G-JLRTNB9CC5"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDEjtwqsNVAr54Mb_tbLWUr6aFclilyGJc",
  authDomain: "jellist-fab2b.firebaseapp.com",
  projectId: "jellist-fab2b",
  storageBucket: "jellist-fab2b.appspot.com",
  messagingSenderId: "1038283682166",
  appId: "1:1038283682166:web:546a415dd37864739f0a57",
  measurementId: "G-N5523782Z6",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
//const analytics = getAnalytics(app);

export { auth };
