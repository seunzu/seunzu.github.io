import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "서승주 | Software Engineer",
  description:
    "문제를 구조적으로 정의하고 구현 이후에도 더 나은 구조를 탐색하는 소프트웨어 엔지니어 서승주의 포트폴리오입니다.",
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
