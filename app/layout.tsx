import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dexxert | 디저트 공식 사이트",
  description: "마인크래프트 디저트 서버의 공식 안내와 캐쉬 충전 페이지입니다.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/dexxert-icon.png",
    shortcut: "/dexxert-icon.png",
    apple: "/dexxert-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
