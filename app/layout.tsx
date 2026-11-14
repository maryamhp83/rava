import type { Metadata, Viewport } from "next";
import { ChildrenOnlyProps } from "@/type/component";
import { JetBrains_Mono, Vazirmatn } from "next/font/google";
import "@/app/globals.css";
import { cn } from "cn";
import { DirectionProvider } from "@/component/ui/direction";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/component/ui/sonner";
import QueryClientProvider from "@/component/queryClientProvider";
import { TooltipProvider } from "@/component/ui/tooltip";

const appName = "راوا";
const title = "راوا | سامانه مدیریت آژانس تاکسی";
const description =
  "با راوا، مدیریت آژانس تاکسی خود را ساده و یکپارچه کنید؛ اطلاعات مشتریان، رانندگان و خودروها را مدیریت کنید، سفرها را ثبت و پیگیری کنید، هزینه‌ها و درآمدها را سامان دهید و گزارش‌های دقیق عملکرد و سود و زیان آژانس را در یک پنل مشاهده کنید.";

export const metadata: Metadata = {
  applicationName: appName,
  title: {
    default: title,
    template: `%s | ${appName}`,
  },
  description,
  keywords: [
    "راوا",
    "RAVA",
    "مدیریت آژانس تاکسی",
    "سامانه مدیریت آژانس تاکسی",
    "نرم‌افزار آژانس تاکسی",
    "مدیریت تاکسی تلفنی",
    "مدیریت مشتریان",
    "مدیریت رانندگان",
    "مدیریت خودروها",
    "ثبت و مدیریت سفرها",
    "مدیریت درخواست‌های تاکسی",
    "مدیریت هزینه‌ها",
    "گزارش درآمد و هزینه",
    "گزارش سود و زیان",
    "تحلیل عملکرد آژانس",
  ],
  authors: [{ name: "Mahdi Tasha" }],
  creator: "Mahdi Tasha",
  publisher: appName,
  category: "transportation",
  alternates: {
    canonical: "/",
    languages: {
      "fa-IR": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: appName,
    title,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "راوا — سامانه مدیریت آژانس تاکسی",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  referrer: "strict-origin-when-cross-origin",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101820",
  colorScheme: "light",
};

const vazirMatnFont = Vazirmatn({
  display: "swap",
  style: "normal",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["arabic"],
});

const jetbrainsMonoFont = JetBrains_Mono({
  display: "swap",
  style: "normal",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function Layout({ children }: ChildrenOnlyProps) {
  return (
    <html
      suppressHydrationWarning
      lang="fa"
      dir="rtl"
      className={cn(vazirMatnFont.className, jetbrainsMonoFont.variable)}
    >
      <body>
        <QueryClientProvider>
          <ThemeProvider>
            <DirectionProvider direction="rtl">
              <TooltipProvider>
                <Toaster richColors />
                {children}
              </TooltipProvider>
            </DirectionProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
