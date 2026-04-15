"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbNameMap: { [key: string]: string } = {
    mypage: "마이페이지",
    "order-list": "주문/배송 조회",
    "return-list": "취소/교환/반품 내역",
    "store-history": "매장구매 내역",
    documents: "증빙서류 조회",

    cart: "장바구니",
    "order-checkout": "주문결제",
    "order-confirmation": "주문완료",

    wishlist: "위시리스트",
    "recent-view": "최근 본 상품",
    reviews: "상품 리뷰",
    inquiry: "1:1 문의 내역",
    "restock-alert": "재입고 알림내역",

    mileage: "마일리지",
    points: "포인트",
    coupons: "쿠폰함",
    membership: "회원 등급/혜택 안내",

    address: "배송지 관리",
    "user-info-management": "내정보 관리",
    "sns-login": "간편로그인 계정관리",
    withdraw: "회원 탈퇴",

    settings: "설정",
    notice: "공지사항",
  };
  return (
    <div className="w-full">
      <nav className="flex items-center text-gray-500 gap-1 ">
        <Link href="/" className="text-xs ">
          HOME
        </Link>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join("/")}`;

          return (
            <span className="flex items-center" key={index}>
              <span className="text-xs">
                <FiChevronRight />
              </span>
              <Link
                className={clsx("text-xs", isLast ? "text-black" : "")}
                href={href}
              >
                {breadcrumbNameMap[segment] || segment}
              </Link>
            </span>
          );
        })}
      </nav>
    </div>
  );
}
