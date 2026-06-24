import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary: "bg-teal-700 text-white hover:bg-teal-800",
  secondary: "border border-zinc-300 bg-white text-zinc-950 hover:border-teal-700",
  ghost: "text-zinc-700 hover:bg-zinc-100"
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
