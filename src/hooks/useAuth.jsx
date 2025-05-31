import { useEffect, useState } from "react";
import { fetchUserProfile } from "../api/urlApi";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profile = await fetchUserProfile();

        if (profile?.user) {
          setIsLoggedIn(true);
        }
      } catch {
        setIsLoggedIn(false);
      }
    };

    loadUserProfile();
  }, []);

  return { isLoggedIn, setIsLoggedIn };
}
