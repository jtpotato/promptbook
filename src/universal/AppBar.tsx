import * as Avatar from "@radix-ui/react-avatar";
import { User, getAuth } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { HTMLProps, useState } from "react";

function AppBar(props: HTMLProps<HTMLDivElement>) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  getAuth().onAuthStateChanged((user) => {
    setUser(user);
  });

  return (
    <header
      {...props}
      className={`p-4 flex items-center space-x-2`}
    >
      <div
        className="flex items-center cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        <img src="/icon.png" className="h-8" />
        <p className="text-xl font-bold">Promptbook</p>
      </div>

      <div className="w-full"></div>
      <div className="w-fit flex items-center space-x-2 whitespace-nowrap">
        <Link className="mr-4" href={"/create"}>
          I have a prompt!
        </Link>
        <Avatar.Root className="w-12 rounded-full cursor-pointer">
          <Avatar.Image
            src={user?.photoURL as string}
            className="rounded-full"
          />
          <Avatar.Fallback className="rounded-full" delayMs={0} />
        </Avatar.Root>
      </div>
    </header>
  );
}

export default AppBar;
