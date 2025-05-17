import React from "react";

export default function Header() {
  const hasToken = document.cookie.includes("accessToken");

  const handleLogout = () => {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.href = "/";
  };

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  return (
    <header className="w-full flex justify-end px-6 py-4 bg-white border-b">
      {hasToken ? (
        <button
          onClick={handleLogout}
          className="px-4 py-2 border border-slate-200 flex gap-2 items-center rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
        >
          로그아웃
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-2 border border-slate-200 flex gap-2 items-center rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google logo"
            loading="lazy"
          />
          <span>Login with Google</span>
        </button>
      )}
    </header>
  );
}
