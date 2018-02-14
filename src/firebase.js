import firebase from "firebase";

const config = {
    apiKey: "AIzaSyDvCV1oq8ov9jt9jCBsSQrK12JOtlbHWm4",
    authDomain: "jfddl3-fitcode.firebaseapp.com",
    databaseURL: "https://jfddl3-fitcode.firebaseio.com",
    projectId: "jfddl3-fitcode",
    storageBucket: "jfddl3-fitcode.appspot.com",
    messagingSenderId: "645172552503"
};
firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const database = firebase.database()
export const auth = firebase.auth()