import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GeistProvider } from "@geist-ui/core";
import "@/styles/globals.css";

// Apparently, this is safe.
const firebaseConfig = {
  apiKey: "AIzaSyBlnx3vukVKCpmx6jYFg00qQlJWZ0BXF0E",
  authDomain: "alexandrium-dev.firebaseapp.com",
  projectId: "alexandrium-dev",
  storageBucket: "alexandrium-dev.appspot.com",
  messagingSenderId: "563355978850",
  appId: "1:563355978850:web:703820c4358a31ae86953b",
  measurementId: "G-EZJKRJZSWP",
};

if (!getApps().length) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GeistProvider>
        <Component {...pageProps} />
      </GeistProvider>
    </>
  );
}
