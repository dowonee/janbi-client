import { create } from "zustand";
import { fetchUserProfile } from "../api/urlApi";
import type { UserProfileResponse } from "../types/user";

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  checkLogin: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
  checkLogin: async () => {
    try {
      const userProfile = await fetchUserProfile();

      set({ isLoggedIn: !!userProfile?.user });
    } catch {
      set({ isLoggedIn: false });
    }
  },
}));

export default useAuthStore;
