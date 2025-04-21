import React from "react";
import UrlHistoryItem from "./UrlHistoryItem";

export default function UrlHistoryList() {
  const urlHistories = [
    {
      _id: "1",
      name: "A 홈페이지",
      url: "https://www.a.com",
      logs: [
        {
          scheduledTime: "2024-04-10T09:00:00Z",
          isChanged: true,
          changedContents: [
            {
              selector: "xpath://div[2]/h1",
              before: "기존 제목",
              after: "변경된 제목",
            },
          ],
        },
        {
          scheduledTime: "2024-04-09T09:00:00Z",
          isChanged: false,
          changedContents: [],
        },
      ],
    },
    {
      _id: "2",
      name: "B 상세 페이지",
      url: "https://b.com/detail",
      logs: [
        {
          scheduledTime: "2024-04-10T10:00:00Z",
          isChanged: true,
          changedContents: [
            {
              selector: "css:#price",
              before: "₩10,000",
              after: "₩9,500",
            },
            {
              selector: "xpath://div[3]/p[1]",
              before: "재고 있음",
              after: "재고 없음",
            },
          ],
        },
        {
          scheduledTime: "2024-04-09T10:00:00Z",
          isChanged: true,
          changedContents: [
            {
              selector: "css:.product-title",
              before: "상품 A",
              after: "상품 B",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">변경 내역</h2>
      {urlHistories.map((url) => (
        <UrlHistoryItem key={url._id} urlInfo={url} />
      ))}
    </div>
  );
}
