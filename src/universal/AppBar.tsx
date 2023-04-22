import { Button } from "@geist-ui/core";
import Card from "@geist-ui/core/esm/card/card";
import { User, getAuth } from "firebase/auth";
import { HTMLProps, useState } from "react";

function AppBar(props: HTMLProps<HTMLDivElement>) {
  const [user, setUser] = useState<User | null>(null);

  getAuth().onAuthStateChanged((user) => {
    setUser(user);
  });

  return (
    <div {...props} className={`p-4 bg-neutral-100 rounded-lg flex items-center space-x-2 ${props.className}`}>
      <div className="w-full" />
      <div className="w-fit flex items-center space-x-2 whitespace-nowrap">
        {user ? (
          <>
            <p className="">{user.displayName}</p>
            <button
              onClick={() => getAuth().signOut()}
              className="bg-white p-2 rounded-lg"
            >
              Sign Out
            </button>
          </>
        ) : (
          <p>Not signed in</p>
        )}
      </div>
    </div>
  );
}

export default AppBar;
