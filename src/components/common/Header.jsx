import React, { useEffect, useState } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import LogoutButton from "./LogoutButton";
import { fetchUserProfile } from "../../api/urlApi";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const profileData = await fetchUserProfile();

        if (profileData?.user) {
          setIsLoggedIn(true);
        }
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <header className="w-full flex justify-end px-6 py-4 bg-white border-b">
      {isLoggedIn ? (
        <LogoutButton onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <GoogleLoginButton />
      )}
    </header>
  );
}
