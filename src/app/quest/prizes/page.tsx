"use client";

import { Text } from "@/components/Text";
import { totalQuestLevels, useAuth } from "@/context/AuthContext";

import "./styles.scss";
import { Coupon } from "@/components/Coupon";
import { useMemo, useState } from "react";
import { NavigationTabs } from "@/components/NavigationTabs";

export default function PrizesPage() {
  const { prizes, level } = useAuth();
  const [activeLevel, setActiveLevel] = useState(0);

  const tabs = useMemo(
    () =>
      new Array(totalQuestLevels + 1).fill(null).map((_, index) => ({
        name: `${index} уровень`,
        path: index.toString(),
      })),
    []
  );

  const groupedPrizes = useMemo(() => {
    return new Array(totalQuestLevels + 1)
      .fill(null)
      .map((_, level) =>
        prizes.filter((prize) => prize.requiredLevel === level)
      );
  }, [prizes]);

  return (
    <div className="page prizes">
      <Text
        className="prizes__text"
        title="Залутай скидку или мерч выполняя задания на&nbsp;вечеринке"
        titleSize="h3"
      />
      <NavigationTabs
        activeTabIndex={activeLevel}
        items={tabs}
        onClick={(index) => setActiveLevel(parseInt(index))}
      />
      <div className="prizes__list-wrapper">
        <div className="prizes__list">
          {groupedPrizes[activeLevel].map((prize, index) => (
            <Coupon
              isActive={level >= prize.requiredLevel}
              prize={prize}
              key={`${activeLevel}_${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
