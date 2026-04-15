"use client";

import { Search as SearchIcon, X } from "lucide-react";
import { useSearch } from "@/src/hooks/useSearch";
import PillButton from "../common/buttons/PillButton";
import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();

  const {
    isOpen,
    setIsOpen,
    keyword,
    setKeyword,
    containerRef,
    inputRef,
    handleSearch,
    handleResetKeyword,

    items,
    remove,
    clearAll,
  } = useSearch();

  const onSearchSubmit = (e: React.FormEvent) => {
    handleSearch(e, keyword);
  };

  const search = (text: string) => {
    router.push(`/search?q=${text}`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-label="검색창 열기"
        onClick={() => setIsOpen(true)}
        className="cursor-pointer flex flex-col items-center gap-0.5"
      >
        <SearchIcon className="w-5 h-5 stroke-[1.5]" />
        <span className="text-[9px] tracking-tight text-neutral-500 hidden md:block cursor-pointer">
          Search
        </span>
      </button>

      {isOpen && (
        <div className="fixed right-0 top-0 w-full border-t z-100 border-b border-gray-200 bg-white py-10 py-10">
          <div className="inner">
            <form onSubmit={onSearchSubmit}>
              <div className="w-[700px] left-1/2 -translate-x-1/2 relative flex items-center gap-3 pb-10">
                <input
                  ref={inputRef}
                  autoFocus
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="어떤 상품을 찾으시나요?"
                  className="w-full bg-transparent outline-none text-sm font-medium border-b pb-3"
                />
                <button
                  type="button"
                  onClick={() => handleResetKeyword()}
                  disabled={!keyword.trim()}
                  className="absolute right-0 font-bold  pb-3 cursor-pointer"
                >
                  <SearchIcon />
                </button>
              </div>
            </form>

            <div className="inner flex">
              <div className="flex-3">
                <div className="flex gap-2 w-full pb-8">
                  <h4>최근 검색어</h4>
                  {items.length > 0 && (
                    <button
                      className="cursor-pointer text-[13px] underline text-gray-500"
                      onClick={clearAll}
                    >
                      전체삭제
                    </button>
                  )}
                </div>
                {items.length ? (
                  <div className="flex gap-1.5">
                    {items.map((item) => (
                      <div key={item.id} className="relative">
                        <PillButton
                          label={item.text}
                          onClick={() => search(item.text)}
                          icon={<X size={14} />}
                          onIconClick={() => remove(item.id)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-[13px] text-gray-400">
                    최근 검색어가 없습니다.
                  </span>
                )}
              </div>

              <div className="flex-2 ">
                <div className="pb-8">
                  <p>인기 검색어</p>
                </div>

                <ul className="grid grid-flow-col grid-rows-5 gap-x-8 gap-y-3">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <li
                      key={i}
                      onClick={() => search("ㅎㅇ")}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2 ">
                        <span className="w-4 h-4 bg-black text-white text-[11px] flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span>반팔티</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
