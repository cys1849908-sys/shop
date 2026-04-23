import "./globals.css";

import Header from "../components/header/Header";
import { getWishIds } from "../lib/data/wish";
import WishInitializer from "../components/providers/WishInitializer";
import ScrollToTop from "../components/common/ScrollToTop";
import CartInitializer from "../components/providers/CartInitializer";
import { getCartItem } from "../lib/data/cart";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const wishedIds = await getWishIds();
  const cartItems = await getCartItem();

  return (
    <html lang="ko" className="">
      <body className="text-black antialiased min-h-screen">
        <Header />
        <main className="inner">
          <ScrollToTop />
          <WishInitializer wishedIds={wishedIds} />
          <CartInitializer cartItems={cartItems} />
          {children}
        </main>
        <div id="portal-root" />
      </body>
    </html>
  );
}
