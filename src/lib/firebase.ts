
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";;
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "studio-1963923964-121a4",
  "storageBucket": "studio-1963923964-121a4.appspot.com",
  "appId": "1:876411208559:web:95ffba7f9e1a951dd85e9a",
  "apiKey": "AIzaSyDtv1pStRiBJfT71W7lp2vxjsv2f8Qhg6M",
  "authDomain": "studio-1963923964-121a4.firebaseapp.com",
  "measurementId": "G-WRBNYF0HV1",
  "messagingSenderId": "876411208559"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export { app, db, auth, analytics };
