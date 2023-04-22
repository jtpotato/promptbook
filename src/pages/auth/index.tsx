import { Button, Loading } from "@geist-ui/core";
import {
  GoogleAuthProvider,
  User,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const provider = new GoogleAuthProvider();
const auth = getAuth();

function Auth() {
  const router = useRouter();
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        // The signed-in user info.
        const user = result?.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData?.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(auth.currentUser);
        const url = new URL(window.location.href).searchParams.get("redirect")!;
        console.log(url);
        router.push(url);
      }
      if (!user) {
        signInWithRedirect(auth, provider);
      }
    });
  });

  return (
    <>
      <h1>Auth</h1>
      <>Signing you in...</>
    </>
  );
}

export default Auth;
