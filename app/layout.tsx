import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

// ✏️ 고객 맞춤형: 아래 값을 고객 정보에 맞게 수정하세요
const groomName = "김희민";
const brideName = "장수연";
const weddingDate = "2028년 12월 1일 (일) 오후 4시";
const venueName = "서울 서초구 엘블레스";
const venueAddress = "서울 서초구 강남대로 213 LL층";

const title = `${groomName} ♥ ${brideName} 결혼합니다`;
const description = `${weddingDate} ${venueName}(${venueAddress})에서 저희 두 사람의 결혼식에 초대합니다.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [groomName, brideName, "결혼", "청첩장", "모바일청첩장", "웨딩"],
  authors: [{ name: groomName }, { name: brideName }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: `${groomName} ♥ ${brideName} 결혼합니다`,
    title,
    description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 747,
        alt: `${groomName} ♥ ${brideName} 청첩장`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={title} />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
