"use client";

import { Onboarding } from "@/components/Onboarding";
import usePersistentState from "@/hooks/usePersistentState";
import "./styles.scss";
import { Facts } from "@/components/Facts";
import { Menu } from "@/components/Menu";
import { BottomPromo } from "@/components/BottomPromo";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { AfterParty } from "@/components/AfterParty";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";

export default function Home() {
  const { isPartyOver } = useAuth();
  const [showOnboarding, setShowOnboarding] = usePersistentState(
    "als_bot_onboarding",
    true
  );
  const [showAfterParty, setShowAfterParty] = usePersistentState(
    "als_bot_afterparty",
    true
  );

  return (
    <main>
      {showOnboarding && !isPartyOver && (
        <Onboarding onComplete={() => setShowOnboarding(false)} />
      )}
      {showAfterParty && isPartyOver && (
        <AfterParty onComplete={() => setShowAfterParty(false)} />
      )}
      <div className="main page clearfix">
        <Logo />
        <Menu />
        <BottomPromo>
          {isPartyOver ? (
            <div className="main__party-over">
              <Text
                text="Опа! У&nbsp;тебя есть приз за&nbsp;то, что ты просто пришел :)"
                textSize="caption"
              />
              <Button href="/prizes">
                <Text text="Забрать подарок" />
              </Button>
            </div>
          ) : (
            <Facts />
          )}
        </BottomPromo>
      </div>
    </main>
  );
}
