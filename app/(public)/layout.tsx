import type { ReactNode } from "react";

import { PublicFooter } from "@/components/layout/public-footer";
import { PublicHeader } from "@/components/layout/public-header";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f8f7]">
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
}
