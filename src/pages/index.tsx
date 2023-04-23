import { IPost, Post } from "@/universal/Post";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import {
  DocumentSnapshot,
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

function Home() {
  const [posts, setPosts] = useState<Array<IPost>>();

  useEffect(() => {
    const db = getFirestore();
    const q = query(
      collection(db, "posts"),
      orderBy("time", "desc"),
      limit(20)
    );
    getDocs(q).then((querySnapshot) => {
      console.log(querySnapshot);
      const documents: Array<IPost> = [];
      querySnapshot.forEach((doc) => {
        const post = { id: doc.id, ...doc.data() } as IPost;
        documents.push(post);
      });

      setPosts(documents);
    });
  }, []);

  function getTimeSinceString(time: number) {
    dayjs.extend(relativeTime)
    return dayjs.unix(time).fromNow()
  }


  return (
    <>
      <div className="m-4 space-y-4">
        {posts?.map((post) => (
          <Post.Card key={post.id}>
            <Post.Title>{post.title}</Post.Title>
            <Post.Description>{post.description}</Post.Description>
            <Post.Prompt>{post.prompt}</Post.Prompt>
            <p>{post.likes}</p>
            <p>{getTimeSinceString(post.time)}</p>
          </Post.Card>
        ))}
      </div>
    </>
  );
}

export default Home;
