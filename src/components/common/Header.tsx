import GoogleLoginButton from "./GoogleLoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

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
