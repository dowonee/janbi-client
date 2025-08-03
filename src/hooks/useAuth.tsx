import { useEffect, useState } from "react";
import { fetchUserProfile } from "../api/urlApi.js";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const { user } = await fetchUserProfile();

        if (user && user?._id) {
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
