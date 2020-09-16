import * as firebase from "firebase/app";

//import "firebase/database";
// import "firebase/analytics";
// import "firebase/auth";
import "firebase/firestore";
// import "firebase/storage";
// import "firebase/performance";


const fireBaseConfig = {
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_API_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  locationId: process.env.REACT_APP_FIREBASE_LOCATION_ID,
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

console.log(fireBaseConfig);

firebase.initializeApp(fireBaseConfig);


// export const database = firebase.database();
// export const analytics = firebase.analytics();
// export const auth = firebase.auth();
 export const firestore = firebase.firestore();
// export const storage = firebase.storage();
// export const performance = firebase.performance();

