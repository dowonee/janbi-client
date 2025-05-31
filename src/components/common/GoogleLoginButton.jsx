export default function GoogleLoginButton({ center = false }) {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className={`${
        center ? "mx-auto" : ""
      } px-4 py-2 border border-slate-200 flex gap-2 items-center rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150`}
    >
      <img
        className="w-6 h-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="google logo"
        loading="lazy"
      />
      <span>Login with Google</span>
    </button>
  );
}
