// This page is a form to submit new prompts to the database.

import { Button, Input, Textarea } from "@geist-ui/core";
import React, { useEffect, useState } from "react";
import { User, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import AppBar from "@/universal/AppBar";

const createFormRefs = {
  title: React.createRef<HTMLInputElement>(),
  description: React.createRef<HTMLTextAreaElement>(),
  prompt: React.createRef<HTMLTextAreaElement>(),
};

const submitForm = () => {
  const data = {
    title: createFormRefs.title.current?.value,
    description: createFormRefs.description.current?.value,
    prompt: createFormRefs.prompt.current?.value,
  };
  console.log(data);
};

function Create() {
  const router = useRouter();
  getAuth().onAuthStateChanged((user) => {
    if (!user) {
      console.log("Not signed in!");
      const params = new URLSearchParams({ redirect: "/create" });
      router.push("/auth?" + params.toString());
    }
    console.log(user)
  });

  return (
    <div className="w-screen">
      <AppBar />
      <Textarea placeholder="Assistant is a..." ref={createFormRefs.prompt} />
      <p>The title of this prompt:</p>
      <Input placeholder="A Very Cool Prompt" ref={createFormRefs.title} />
      <p>What this prompt does:</p>
      <Textarea
        placeholder="This prompt will..."
        ref={createFormRefs.description}
      />
      <Button onClick={submitForm}>Submit</Button>
    </div>
  );
}

export default Create;
