import Link from "next/link";

function Home() {
  return (
    <>
      <div>
        <p>Hey there!</p>
        <Link href={"/create"}><button>I have a prompt</button></Link>
      </div>
    </>
  );
}

export default Home;