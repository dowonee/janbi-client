import { create } from "zustand";
import { fetchUserProfile } from "../api/urlApi";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
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
