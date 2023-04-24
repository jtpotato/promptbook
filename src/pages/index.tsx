import { IPost, Post } from "@/universal/Post";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
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
    dayjs.extend(relativeTime);
    return dayjs.unix(time).fromNow();
  }

  return (
    <>
      {/* Background */}
      <div className="fixed top-0 h-screen w-screen bg-gradient-to-tr from-orange-200 to-red-300 -z-10"></div>
      <div className="m-4 space-y-4 flex flex-col items-center">
        {posts ? <div></div> : <div>Loading...</div>}
        {posts?.map((post) => (
          <Post post={post} key={post.id} className="w-full" />
        ))}
      </div>
    </>
  );
}

export default Home;
