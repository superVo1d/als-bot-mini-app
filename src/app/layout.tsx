import type { Metadata, Viewport } from "next";
import { Root } from "@/components/Root/Root";
import "normalize.css/normalize.css";
import "@/assets/styles/main.scss";
import "swiper/css";

export const metadata: Metadata = {
  title: "ALS 29",
};

export const viewport: Viewport = {
  width: "device-width",
  userScalable: false,
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div id="wrap">
          <div id="content">
            <Root>{children}</Root>
          </div>
        </div>
      </body>
    </html>
  );
}
