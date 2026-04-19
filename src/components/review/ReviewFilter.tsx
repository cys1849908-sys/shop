"use client";

import { MdSearch, MdCheck } from "react-icons/md";
import clsx from "clsx";
import { useState } from "react";
import { useOutsideClick } from "@/src/hooks/useOutsideClick";
import ReviewFilterBarList from "./ReviewFilterBarList";
import { SORT_OPTIONS } from "@/src/types/review";

export default function ReviewFilter() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isPhotoOnly, setIsPhotoOnly] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("latest");

  const selectRef = useOutsideClick<HTMLDivElement>(() => setIsFocused(false));

  const handleSortChange = (id: string) => {
    setSortBy(id);

    console.log(`${id} 로 서버에 데이터를 요청합니다.`);
  };
  return (
    <div className="py-6 border-b border-gray-100">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex gap-6 text-sm font-medium text-gray-400">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSortChange(option.id)}
              className={clsx(
                "text-sm transition-colors relative cursor-pointer",
                sortBy === option.id
                  ? "font-bold text-black"
                  : "text-gray-400 hover:text-gray-600",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6 text-sm">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="hidden"
              checked={isPhotoOnly}
              onChange={() => setIsPhotoOnly(!isPhotoOnly)}
            />
            <div
              className={clsx(
                "w-5 h-5 border rounded flex items-center justify-center transition-all",
                isPhotoOnly
                  ? "border-black bg-black"
                  : "border-gray-300 bg-white",
              )}
            >
              <MdCheck
                className={clsx(
                  "text-white w-full h-full p-0.5 transition-opacity",
                  isPhotoOnly ? "opacity-100" : "opacity-0",
                )}
              />
            </div>
            <span className="text-gray-600">포토/동영상 먼저 보기</span>
          </label>

          <div
            className={clsx(
              "flex items-center gap-1 text-gray-400 hover:bg-gray-100 border p-1",
              isFocused ? "bg-gray-100 " : "bg-gray-white",
            )}
            ref={selectRef}
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => (searchValue === "" ? setIsFocused(false) : "")}
          >
            <button>
              <MdSearch
                size={20}
                className={clsx(
                  "cursor-pointer hover:border-black border-gray-200",
                )}
              />
            </button>
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="리뷰 키워드 검색"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="focus:outline-none"
            />
          </div>
        </div>
      </div>

      <ReviewFilterBarList />
    </div>
  );
}
