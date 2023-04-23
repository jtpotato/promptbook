import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "@/styles/globals.css";
import AppBar from "@/universal/AppBar";

// Apparently, this is safe.
const firebaseConfig = {
  apiKey: "AIzaSyDZ_K2dIMtgZkFRR-caB0hY9COmxgmEEKM",
  authDomain: "promptbook-jtpotato.firebaseapp.com",
  projectId: "promptbook-jtpotato",
  storageBucket: "promptbook-jtpotato.appspot.com",
  messagingSenderId: "486557673192",
  appId: "1:486557673192:web:56a7254903c354fb450b5d",
  measurementId: "G-6ER1X30292",
};

if (!getApps().length) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppBar />
      <Component {...pageProps} />
    </>
  );
}
