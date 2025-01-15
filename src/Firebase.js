import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
const apiKey = import.meta.env.VITE_HACKFUSION_APIKEY;
const authDomain = import.meta.env.VITE_HACKFUSION_AUTHDOMAIN;
const databaseURL = import.meta.env.VITE_HACKFUSION_DATABASEURL;
const projectId = import.meta.env.VITE_HACKFUSION_PROJECTID
const storageBucket = import.meta.env.VITE_HACKFUSION_STORAGEBUCKET;
const messagingSenderId = import.meta.env.VITE_HACKFUSION_MESSAGINGSENDERID;
const appId = import.meta.env.VITE_HACKFUSION_APPID

// const firebaseConfig = {
//   apiKey: apiKey,
//   authDomain: authDomain,
//   databaseURL: databaseURL,
//   projectId: projectId,
//   storageBucket: storageBucket,
//   messagingSenderId: messagingSenderId,
//   appId: appId,
// };
const firebaseConfig = {
  apiKey: "AIzaSyA8nxd3Bt_PhwlXGaRMwrc7r0935QSRhrU",
  authDomain: "hackfusion-c831d.firebaseapp.com",
  databaseURL: "https://hackfusion-c831d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hackfusion-c831d",
  storageBucket: "hackfusion-c831d.appspot.com",
  messagingSenderId: "131044666281",
  appId: "1:131044666281:web:68a477d36c86d60a1d72b8"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
