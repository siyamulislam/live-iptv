import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="min-w-0 flex-1 pb-24 lg:pb-0">
          {children}
          <Footer />
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
