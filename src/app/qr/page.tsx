"use client";

import { Button } from "@/components/Button";
import { useQRScanner } from "@telegram-apps/sdk-react";

export default function QRPage() {
  const qrScanner = useQRScanner();

  const scanQR = () => {
    qrScanner
      .open({
        text: "Scan QR code",
        capture: ({ data }) => {
          // Capture QRs contanining Telegram user link.
          return Boolean(data?.startsWith("https://t.me"));
        },
      })
      .then((qr) => {
        // May be something like 'https://t.me/heyqbnk' or null.
        console.log(qr);
      });
  };

  return <Button onClick={scanQR}>Сканировать QR</Button>;
}
