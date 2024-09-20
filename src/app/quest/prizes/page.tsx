"use client";

import { Text } from "@/components/Text";
import { useAuth } from "@/context/AuthContext";

import "./styles.scss";
import { Coupon } from "@/components/Coupon";

export default function PrizesPage() {
  const { questsData, completeQuest } = useAuth();

  return (
    <div className="page prizes">
      <Text
        title="Залутай скидку или мерч выполняя задания на&nbsp;вечеринке"
        titleSize="h3"
      />
      <div className="prizes__list">
        <Coupon isActive name="magazinus-3" code="DISCOUNT" />
      </div>
    </div>
  );
}
