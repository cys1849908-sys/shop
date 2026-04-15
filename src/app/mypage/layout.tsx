import Breadcrumb from "@/src/components/Breadcrumb";
import Sidebar from "@/src/components/Sidebar";

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full max-w-[1440px] mx-auto px-4 py-20 gap-8">
      <aside className="w-30 shrink-0 ">
        <Sidebar />
      </aside>
      <div className="flex flex-col w-full">
        <Breadcrumb />
        <div className="flex-1 py-6  w-full">{children}</div>
      </div>
    </div>
  );
}
