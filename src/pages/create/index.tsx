// This page is a form to submit new prompts to the database.

import React, { useEffect, useState } from "react";
import { User, getAuth } from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getFirestore,
  runTransaction,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import AppBar from "@/universal/AppBar";

const createFormRefs = {
  title: React.createRef<HTMLInputElement>(),
  description: React.createRef<HTMLTextAreaElement>(),
  prompt: React.createRef<HTMLTextAreaElement>(),
};

const db = getFirestore();

function Create() {
  const router = useRouter();
  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("Not signed in!");
        const params = new URLSearchParams({ redirect: "/create" });
        router.push("/auth?" + params.toString());
      }
      console.log(user);
    });
  });

  const submitForm = async () => {
    const uid = getAuth().currentUser?.uid;
    if (uid) {
      const data = {
        title: createFormRefs.title.current?.value,
        description: createFormRefs.description.current?.value,
        prompt: createFormRefs.prompt.current?.value,
        time: Math.floor(Date.now() / 1000),
        likes: 0,
        author: uid,
      };
      const postRef = await addDoc(collection(db, "posts"), data);
      const userRef = doc(db, "users", uid);
      try {
        await updateDoc(userRef, { posts: arrayUnion(postRef.id) });
      } catch {
        await setDoc(userRef, { posts: [postRef.id] });
      }
      router.push("/");
    }
  };

  return (
    <div className="w-screen flex justify-center items-center">
      <div className="w-5/6 min-w-96 p-4 space-y-4">
        <AppBar className="" />
        <div className="flex items-top justify-center space-x-4 w-full">
          <div className="w-full">
            <textarea
              placeholder="Assistant is a..."
              ref={createFormRefs.prompt}
              className="h-full w-full bg-neutral-100 p-4 rounded-lg resize-none"
            />
          </div>
          <div className="flex flex-col w-full space-y-4">
            <div className="w-full">
              <p>The title of this prompt:</p>
              <input
                placeholder="A Very Cool Prompt"
                ref={createFormRefs.title}
                className="bg-neutral-100 p-4 rounded-lg w-full"
              />
            </div>
            <div className="w-full">
              <p>What this prompt does:</p>
              <textarea
                placeholder="This prompt will..."
                ref={createFormRefs.description}
                className="bg-neutral-100 p-4 rounded-lg w-full resize-none"
              />
            </div>
            <button onClick={submitForm} className="bg-blue-50 rounded-lg p-2">
              Submit
            </button>
          </div>
        </div>
        <p className="text-neutral-300">
          When posting, you agree that the text content will be licensed under
          the MIT License.
        </p>
      </div>
    </div>
  );
}

export default Create;
