"use client";

import { useBackButton } from "@telegram-apps/sdk-react";
import "./styles.scss";
import { Text } from "@/components/Text";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AfishaPage() {
  const bb = useBackButton();
  const router = useRouter();

  useEffect(() => {
    bb.show();

    if (bb) {
      bb.on("click", () => router.back());
    }
  }, [bb]);

  return (
    <div className="afisha page clearfix">
      <Text title="Афиша" titleSize="h2" />
    </div>
  );
}
