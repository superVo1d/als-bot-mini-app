import type { Metadata, Viewport } from "next";
import { Root } from "@/components/Root/Root";
import "normalize.css/normalize.css";
import "@/assets/styles/main.scss";
import "swiper/css";
import Script from "next/script";
import Head from "next/head";

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
      <Head>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/98438740"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </Head>
      <Script id="yandex-metrika">
        {`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(98438740, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
        });
      `}
      </Script>
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
