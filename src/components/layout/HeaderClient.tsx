"use client";

import Link from "next/link";
import { ShoppingBag, User, Heart, X } from "lucide-react";
import { cls } from "@/src/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Search from "./Search";
import IconLink from "../common/IconLink";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { signOut } from "@/src/lib/actions/user";
import { useOutsideClick } from "@/src/hooks/useOutsideClick";
import { useCartStore } from "@/src/store/CartStore";

const NAV_MENU = [
  { label: "NEW", href: "/new" },
  { label: "BEST", href: "/best" },
  { label: "TOP", href: "/top" },
  { label: "OUTER", href: "/outer" },
  { label: "BOTTOM", href: "/bottom" },
  { label: "ACC", href: "/acc" },
];

const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cls(
        "relative text-[13px] font-bold tracking-[0.05em] uppercase py-5 transition-colors duration-150 group",
        isActive ? "text-black" : "text-neutral-500 hover:text-black",
      )}
    >
      {children}
      <span
        className={cls(
          "absolute bottom-0 left-0 h-[2px] bg-black transition-all duration-200",
          isActive ? "w-full" : "w-0 group-hover:w-full",
        )}
      />
    </Link>
  );
};

export default function HeaderClient({ user }: { user: SupabaseUser | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showtopBanner, setShowTopBanner] = useState(true);
  // const [isScrolled, setIsScrolled] = useState(false);

  const ref = useOutsideClick(() => setIsOpen(false));
  const handleLogout = async () => {
    signOut();
    setIsOpen(false);
    window.location.href = "/#";
  };
  const cartLength = useCartStore((c) => c.items).length;
  const handleClose = () => {
    const minutes = 30;
    const expiryTime = Date.now() + minutes * 60 * 1000;
    const data = {
      value: !showtopBanner,
      expiry: expiryTime,
    };
    localStorage.setItem("showtopBanner", JSON.stringify(data));
    setShowTopBanner(false);
  };

  useEffect(() => {
    const itemStr = localStorage.getItem("showtopBanner");
    if (itemStr) {
      const item = JSON.parse(itemStr);
      const now = Date.now();
      if (now > item.expiry) {
        localStorage.removeItem("topBanner");
        setShowTopBanner(true);
      } else {
        setShowTopBanner(item.value);
      }
    }
  }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 50);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  return (
    <header className="bg-white ">
      {showtopBanner && (
        <div className="relative flex items-center bg-black h-10">
          <div className="inner w-full flex items-center justify-end">
            <p className="absolute left-1/2 -translate-x-1/2 text-[11px] tracking-[0.15em] text-white font-medium whitespace-nowrap">
              ₩50,000 이상 무료배송 · 신규가입 10% 쿠폰 증정
            </p>
            <button
              onClick={handleClose}
              className="text-white text-[11px]  cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="inner flex h-15 items-center justify-between px-6">
        <Link
          href="/"
          className="text-[20px] font-black tracking-[0.3em] uppercase text-black"
        >
          MY SHOP
        </Link>

        <div className="flex items-center gap-5">
          <Search />

          <div className="relative " ref={ref}>
            {user ? (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col items-center gap-0.5 cursor-pointer"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
                <span className="text-[9px] tracking-tight text-neutral-500 hidden md:block">
                  MY
                </span>
              </button>
            ) : (
              <IconLink href="/login">
                <div className="flex flex-col items-center gap-0.5">
                  <User className="w-5 h-5 stroke-[1.5]" />
                  <span className="text-[9px] tracking-tight text-neutral-500 hidden md:block">
                    LOGIN
                  </span>
                </div>
              </IconLink>
            )}

            {user && isOpen && (
              <div
                className="absolute mt-3 w-24 bg-white border 
                border-neutral-100 rounded-md shadow-xl flex flex-col overflow-hidden z-50"
              >
                <Link
                  href="/mypage"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-center text-[11px] cursor-pointer"
                >
                  마이페이지
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-[11px] cursor-pointer"
                >
                  LOG OUT
                </button>
              </div>
            )}
          </div>

          <IconLink href="/mypage/wishlist">
            <div className="flex flex-col items-center gap-0.5">
              <Heart className="w-5 h-5 stroke-[1.5]" />
              <span className="text-[9px] tracking-tight text-neutral-500 hidden md:block">
                WISH
              </span>
            </div>
          </IconLink>

          <IconLink href="/cart">
            <div className="flex flex-col items-center gap-0.5 relative">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                <span
                  className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center 
                justify-center rounded-full bg-black text-white text-[9px] font-bold"
                >
                  {cartLength}
                </span>
              </div>
              <span className="text-[9px] tracking-tight text-neutral-500 hidden md:block">
                CART
              </span>
            </div>
          </IconLink>
        </div>
      </div>

      <div className="sticky top-10 hidden md:block">
        <nav className="inner flex items-center gap-10 px-6">
          {NAV_MENU.map((item) => (
            <NavItem key={item.href} href={item.href}>
              {item.label}
            </NavItem>
          ))}
        </nav>
      </div>
    </header>
  );
}
