"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

import "./styles.scss";
import { Tumbler } from "@/components/Tumbler";
import usePersistentState from "@/hooks/usePersistentState";
import { QuestPaywall } from "@/components/QuestPaywall";
import { useAuth } from "@/context/AuthContext";

export default function CategoryPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isOnboardingCompleted } = useAuth();
  const [index, setIndex] = useState<number>(pathname === "/quest" ? 0 : 1);
  const [isQuestPaywallShowing, setIsQuestPaywallShowing] = useState<boolean>(
    isOnboardingCompleted
  );

  const items = [
    {
      name: "Задания",
    },
    {
      name: "Подарки",
    },
  ];

  useEffect(() => {
    setIndex(pathname === "/quest" ? 0 : 1);
  }, [pathname]);

  const handleClick = (index: number) => {
    setIndex(index);
    router.push(index === 0 ? "/quest" : "/quest/prizes");
  };

  return (
    <>
      {isQuestPaywallShowing && (
        <QuestPaywall onClose={() => setIsQuestPaywallShowing(false)} />
      )}
      {children}
      <div className="quest__bottom-buttons-wrapper">
        <Tumbler items={items} onClick={handleClick} activeIndex={index} />
      </div>
    </>
  );
}
