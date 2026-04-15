import React from "react";
import { Heart, RefreshCw, MessageSquareText, Bell } from "lucide-react";

interface MenuItem {
  id: number;
  title: string;
  Icon: React.ElementType;
}

const menuItems: MenuItem[] = [
  { id: 1, title: "위시리스트", Icon: Heart },
  { id: 2, title: "취소/교환/반품", Icon: RefreshCw },
  { id: 3, title: "1:1문의 내역", Icon: MessageSquareText },
  { id: 4, title: "재입고 알림내역", Icon: Bell },
];

export default function MyPageMenu() {
  return (
    <nav className="w-full border-y border-gray-200 bg-white">
      <div className="flex divide-x divide-gray-200">
        {menuItems.map(({ id, title, Icon }) => (
          <button
            key={id}
            className="flex flex-1 flex-col items-center justify-center py-8 transition-colors hover:bg-gray-50 active:bg-gray-100"
          >
            {/* 아이콘 배경 원 (이미지 스타일 재현) */}
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 text-gray-900">
              <Icon size={24} strokeWidth={1.2} />
            </div>
            {/* 텍스트 라벨 */}
            <span className="text-[13px] font-bold tracking-tight text-gray-900">
              {title}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
