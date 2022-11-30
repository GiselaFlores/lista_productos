import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAc7_EF6FcIKkSB2z8CpT_ENc4Tv_zYdDg",
  authDomain: "lista-de-productos-fb477.firebaseapp.com",
  projectId: "lista-de-productos-fb477",
  storageBucket: "lista-de-productos-fb477.appspot.com",
  messagingSenderId: "580643840085",
  appId: "1:580643840085:web:4a5607a93ee6e64e6974dc"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);