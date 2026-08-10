import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "서승주 | Backend Developer",
  description:
    "문제를 구조적으로 정의하고 끝까지 개선하는 백엔드 개발자 서승주의 포트폴리오입니다.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
