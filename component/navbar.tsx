"use client";

import { NavbarStateProps } from "@/type/component";
import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import LogoImage from "@/image/logo.png";
import {
  LayoutDashboard,
  Users,
  PersonStanding,
  CarFront,
  Route,
  CreditCard,
  ChartNoAxesColumn,
  Settings,
  PanelRightOpen,
  PanelLeftClose,
} from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export const navbarData: {
  title: string;
  icon: ReactNode;
  href: `/${string}`;
}[] = [
  {
    title: "داشبورد",
    icon: <LayoutDashboard size={18} />,
    href: "/",
  },
  {
    title: "مشتریان",
    icon: <Users size={18} />,
    href: "/customers",
  },
  {
    title: "رانندگان",
    icon: <PersonStanding size={18} />,
    href: "/drivers",
  },
  {
    title: "خودروها",
    icon: <CarFront size={18} />,
    href: "/vehicles",
  },
  {
    title: "سفرها",
    icon: <Route size={18} />,
    href: "/trips",
  },
  {
    title: "هزینه‌ها",
    icon: <CreditCard size={18} />,
    href: "/expenses",
  },
  {
    title: "گزارش‌ها",
    icon: <ChartNoAxesColumn size={18} />,
    href: "/reports",
  },
  {
    title: "تنظیمات",
    icon: <Settings size={18} />,
    href: "/settings",
  },
];
export default function Navbar({
  className,
  onOpenChange,
  open,
}: NavbarStateProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        data-open={!open}
        className={cn(
          "lg:hidden block transition-all duration-500 fixed top-0 left-0 z-20 bg-background/10 backdrop-blur-2xl size-full",
          "data-[open=false]:invisible data-[open=true]:visible data-[open=false]:opacity-0 data-[open=true]:opacity-100",
        )}
        onClick={() => onOpenChange?.(!open)}
      />

      <nav
        data-open={!open}
        className={cn(
          "border-l border-input bg-background h-dvh overflow-auto flex flex-col transition-all duration-500 z-30",
          "lg:static fixed top-0 right-0 lg:data-[open=false]:w-auto data-[open=false]:w-0 lg:data-[open=true]:w-auto data-[open=true]:w-fit",
          className,
        )}
      >
        <Link
          className="border-b border-input p-4 flex gap-3 shrink-0 h-18.75"
          href="/"
        >
          <Image
            alt="لوگوی راوا"
            src={LogoImage.src}
            width={100}
            height={100}
            className="shrink-0 size-10"
          />
          {!open && (
            <div className="flex-1  overflow-hidden">
              <span className="font-bold block truncate text-base">راوا</span>
              <span className="font-normal block truncate text-xs text-muted-foreground">
                همیشه در مسیر
              </span>
            </div>
          )}
        </Link>
        <div className="space-y-1 p-4 flex flex-col flex-1 h-full overflow-auto">
          {navbarData.map((item, index) => (
            <Button
              key={`navbar-item-${index}`}
              variant={pathname === item.href ? "default" : "ghost"}
              className={!open ? "w-full justify-start" : ""}
              size={open ? "icon-lg" : "lg"}
              render={
                <Link href={item.href}>
                  {item.icon}
                  {!open && item.title}
                </Link>
              }
            />
          ))}
        </div>
        <div className="p-4 border-t border-input h-18.75 lg:block hidden">
          <Button
            onClick={() => onOpenChange?.(!open)}
            className={!open ? "w-full justify-start" : ""}
            size={open ? "icon-lg" : "lg"}
            variant="outline"
          >
            {!open ? (
              <>
                <PanelRightOpen />
                جمع کردن منو
              </>
            ) : (
              <PanelLeftClose />
            )}
          </Button>
        </div>
      </nav>
    </>
  );
}
