import AppBar from "@/universal/AppBar";
import Link from "next/link";

function Home() {
  return (
    <>
      <div className="m-4">
        <AppBar />
        <Link href={"/create"}><button>I have a prompt</button></Link>
      </div>
    </>
  );
}

export default Home;