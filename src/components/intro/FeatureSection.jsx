import React from "react";
import { ClockIcon, EyeIcon, MailIcon } from "lucide-react";

const features = [
  {
    name: "모니터링 요소 변경 감지",
    description:
      "설정한 주기에 따라 경쟁사 웹페이지의 변경 사항을 자동으로 감지합니다.",
    icon: EyeIcon,
  },
  {
    name: "유연한 모니터링 설정",
    description: "모니터링 주기와 알림 조건을 필요에 맞게 설정할 수 있습니다.",
    icon: ClockIcon,
  },
  {
    name: "슬랙 알림",
    description: "슬랙으로 변경 알림을 받아 팀과 즉시 공유할 수 있습니다.",
    icon: MailIcon,
  },
];

export default function FeatureSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-10">
          이런 기능들을 제공합니다
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map(({ name, description, icon: Icon }) => (
            <div
              key={name}
              className="bg-white rounded-lg shadow-sm p-6 text-left hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-accent p-2 rounded">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              </div>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
