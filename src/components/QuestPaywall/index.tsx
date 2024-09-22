import { FC, useEffect, useState } from "react";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";

import "./styles.scss";
import { Input } from "../Input";
import { useAuth } from "@/context/AuthContext";
import { Coupon } from "../Coupon";

export interface IQuestPaywall {
  onClose: () => void;
}

export const QuestPaywall: FC<IQuestPaywall> = ({ onClose }) => {
  const [stage, setStage] = useState(0);
  const { prizes, completeOnboarding } = useAuth();

  return (
    <div className="quest-paywall page clearfix">
      <div className="quest-paywall__content">
        {stage === 0 ? (
          <>
            <div>
              <Text
                className="quest-paywall__text"
                title="Сколько лет Студии Артемия Лебедева?"
                titleSize="h3"
              />
              <Input
                name="quest-paywall"
                length={2}
                setValue={() => {
                  setStage(1);
                  completeOnboarding();
                }}
              />
              <Text
                className="quest-paywall__input-caption"
                text="Подсказка в&nbsp;названии бота"
                textSize="caption"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <Text
                title="Круто! Ты уже заработал скидку в&nbsp;Магазинус"
                titleSize="h3"
              />

              <Coupon prize={prizes[0]} isActive />

              <Text
                className="quest-paywall__text"
                text="Чтобы получить больше ништяков выполняй остальные задания на&nbsp;нашей вечеринке"
                textSize="caption"
              />
            </div>
            <div className="quest-paywall__buttons-wrapper">
              <Button onClick={onClose} href="/quest">
                <Text text="Ещё задания" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
