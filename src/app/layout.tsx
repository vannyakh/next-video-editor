import { Geist_Mono, Geist, Noto_Sans_Khmer } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { baseUrl, createMetadata } from "@/utils/metadata";
import {
  StoreInitializer,
  BackgroundUploadRunner
} from "@/components/store-initializer";
import { QueryProvider } from "@/components/query-provider";
import { Outfit } from "next/font/google";

import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

const notoSansKhmer = Noto_Sans_Khmer({
  variable: "--font-khmer",
  subsets: ["khmer"],
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata = createMetadata({
  title: {
    template: "%s | រំលេច",
    default: "រំលេច"
  },
  description: "AI Video generator for the next gen web.",
  metadataBase: baseUrl
});

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${geist.variable} ${outfit.variable} ${notoSansKhmer.variable} antialiased dark font-sans bg-muted`}
      >
        <QueryProvider>
          {children}
          <StoreInitializer />
          <BackgroundUploadRunner />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}