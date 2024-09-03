import type { Metadata } from "next";
import { Root } from "@/components/Root/Root";
import "@telegram-apps/telegram-ui/dist/styles.css";
import "normalize.css/normalize.css";
import "@/assets/styles/main.scss";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
