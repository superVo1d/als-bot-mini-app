"use client";

import { Onboarding } from "@/components/Onboarding";
import usePersistentState from "@/hooks/usePersistentState";
import "./styles.scss";
import { Facts } from "@/components/Facts";
import { Menu } from "@/components/Menu";
import { QuestPromo } from "@/components/QuestPromo";

export default function Home() {
  const [showOnboarding, setShowOnboarding] = usePersistentState(
    "als_bot_onboarding",
    true
  );

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
