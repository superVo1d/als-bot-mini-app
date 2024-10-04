"use client";

import { Coupon } from "@/components/Coupon";
import { Text } from "@/components/Text";
import { useAuth } from "@/context/AuthContext";

import "./styles.scss";

export default function PrizesPage() {
  const { prizes } = useAuth();

  return (
    <div className="page prizes">
      <Text
        className="prizes__title"
        title="А&nbsp;вот и&nbsp;скидочки!"
        titleSize="h3"
      />
      <div className="prizes__container">
        <Coupon prize={prizes[2]} isActive />
        <Coupon prize={prizes[3]} isActive />
        <Coupon prize={prizes[4]} isActive />
      </div>
    </div>
  );
}
