import { useState } from "react";
import { createUrl } from "../../api/urlApi";
import { DAYS_OF_WEEK } from "../../utils/constants";

export default function AddUrlModal({ onClose }) {
  const [urlForm, setUrlForm] = useState({
    name: "",
    url: "",
    dayOfWeek: "월",
    hour: "10",
    minute: "00",
  });

  const handleChange = (ev) => {
    setUrlForm({ ...urlForm, [ev.target.name]: ev.target.value });
  };

  const handleSubmit = async () => {
    if (!urlForm.name.trim() || !urlForm.url.trim()) {
      alert("이름과 URL을 모두 입력해주세요.");
      return;
    }

    try {
      await createUrl({
        ...urlForm,
        scheduleTime: `${urlForm.hour}:${urlForm.minute}`,
      });

      alert("URL이 추가되었습니다.");

      onClose();
      setUrlForm({
        name: "",
        url: "",
        dayOfWeek: "월",
        hour: "10",
        minute: "00",
      });
    } catch {
      alert("URL 추가 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">URL 추가</h2>
        <input
          type="text"
          name="name"
          placeholder="이름"
          className="w-full mb-2 p-2 border rounded"
          value={urlForm.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="url"
          placeholder="https://example.com"
          className="w-full mb-2 p-2 border rounded"
          value={urlForm.url}
          onChange={handleChange}
        />
        <label className="block text-sm font-medium mb-1">알림 요일</label>
        <select
          name="dayOfWeek"
          value={urlForm.dayOfWeek}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        >
          {DAYS_OF_WEEK.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <label className="block text-sm font-medium mb-1">알림 시간</label>
        <div className="flex gap-2 mb-4">
          <select
            name="hour"
            value={urlForm.hour}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={String(i).padStart(2, "0")}>
                {String(i).padStart(2, "0")}시
              </option>
            ))}
          </select>
          <select
            name="minute"
            value={urlForm.minute}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
          >
            {["00", "30"].map((m) => (
              <option key={m} value={m}>
                {m}분
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="text-sm px-3 py-1 border rounded"
            onClick={onClose}
          >
            닫기
          </button>
          <button
            className="text-sm px-3 py-1 bg-indigo-600 text-white rounded"
            onClick={handleSubmit}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
}
