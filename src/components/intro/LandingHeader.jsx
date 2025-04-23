import React from "react";

export default function LandingHeader() {
  return (
    <section className="bg-white py-20 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-primary">
        JANBI
      </h1>
      <h1 className="text-4xl sm:text-4xl font-extrabold text-gray-900">
        경쟁사 웹페이지 자동 모니터링 솔루션
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
        경쟁사의 페이지를 주기적으로 분석하고 슬랙으로 알림을 받아보세요.
      </p>
    </section>
  );
}
