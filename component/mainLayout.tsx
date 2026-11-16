"use client";

import { MainLayoutProps } from "@/type/component";
import { cn } from "cn";
import AuthGuard from "@/component/authGuard";
import Navbar from "./navbar";
import { useState } from "react";
import Header from "./header";

export default function MainLayout({
  children,
  className,
  mode = "auth-only",
}: MainLayoutProps) {
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);

  return (
    <AuthGuard mode={mode}>
      <section
        className={cn(
          "flex h-dvh overflow-hidden w-dvw justify-between",
          className,
        )}
      >
        <Navbar open={navbarCollapsed} onOpenChange={setNavbarCollapsed} />
        <div className="bg-background flex-1">
          <Header open={navbarCollapsed} onOpenChange={setNavbarCollapsed} />
          <main className="h-[calc(100dvh-75px)] overflow-hidden">
            <div className="max-w-6xl mx-auto p-4">{children}</div>
          </main>
        </div>
      </section>
    </AuthGuard>
  );
}
