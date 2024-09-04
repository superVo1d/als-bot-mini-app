"use client";

import { Onboarding } from "@/components/Onboarding";
// import usePersistentState from "@/hooks/usePersistentState";
import "./styles.scss";
import { Facts } from "@/components/Facts";
import { Menu } from "@/components/Menu";
import { QuestPromo } from "@/components/QuestPromo";
import { useEffect, useState } from "react";
import { useBackButton } from "@telegram-apps/sdk-react";

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const bb = useBackButton();

  useEffect(() => {
    bb.hide();
  }, [bb]);

  return (
    <main>
      {showOnboarding && (
        <Onboarding onComplete={() => setShowOnboarding(false)} />
      )}
      <div className="main page clearfix">
        <Facts />
        <Menu />
        <QuestPromo />
      </div>
    </main>
  );
}
