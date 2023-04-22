import { Button } from "@geist-ui/core";
import { User, getAuth } from "firebase/auth";
import { useState } from "react";

function AppBar() {
  const [user, setUser] = useState<User | null>(null);

  getAuth().onAuthStateChanged((user) => {
    setUser(user);
  });

  return (
    <div className="bg-black h-screen">
      {user ? (
        <>
          <p>{user.displayName}</p>
          <Button onClick={() => getAuth().signOut()}>Sign Out</Button>
        </>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  );
}

export default AppBar;
