import React from "react";
import GoogleLoginButton from "../components/common/GoogleLoginButton";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-sm w-full bg-white shadow-md rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-primary mb-2">JANBI 로그인</h1>
        <p className="text-sm text-gray-500 mb-6">
          Google 계정으로 로그인 후<br />
          모니터링 기능을 사용할 수 있어요.
        </p>
        <GoogleLoginButton />
      </div>
    </div>
  );
}
