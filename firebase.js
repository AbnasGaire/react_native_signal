import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
    apiKey: "AIzaSyDWoCTxcpyMjVGeg8k1uoo2P56DCTXozio",
    authDomain: "signal-1b0bf.firebaseapp.com",
    projectId: "signal-1b0bf",
    storageBucket: "signal-1b0bf.appspot.com",
    messagingSenderId: "760422338308",
    appId: "1:760422338308:web:4c915151156bf7685c8a51"
  };

let app;

if(firebase.apps.length===0){
    app=firebase.initializeApp(firebaseConfig);
}else{
    app=firebase.app();
}

const db=app.firestore();
const auth=firebase.auth();

export {db,auth}