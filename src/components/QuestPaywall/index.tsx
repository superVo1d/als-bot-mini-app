import { FC, useState } from "react";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";

import "./styles.scss";
import { Input } from "../Input";

export interface IQuestPaywall {
  onComplete: () => void;
}

export const QuestPaywall: FC<IQuestPaywall> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

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
                setValue={() => setStage(1)}
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
              <Text
                className="quest-paywall__text"
                text="Чтобы получить больше ништяков выполняй остальные задания на&nbsp;нашей вечеринке"
                textSize="caption"
              />
            </div>
            <div className="quest-paywall__buttons-wrapper">
              <Button onClick={onComplete}>
                <Text text="Ещё задания" />
              </Button>
              <Button href="/">
                <Text text="На главную" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
