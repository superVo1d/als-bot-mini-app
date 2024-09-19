import { classNames } from "@telegram-apps/sdk";
import { FC } from "react";
import "./styles.scss";
import { Button } from "../Button";

export interface QuestPromoProps {
  className?: string;
}
export const QuestPromo: FC<QuestPromoProps> = ({ className }) => {
  return (
    <div className={classNames(className, "quest-promo")}>
      <Button href="/quest" className="quest-promo__content" style="clear">
        <div className="quest-promo__counter">4/10</div>
        <div className="quest-promo__title">Квест</div>
        <div className="quest-promo__description">
          Выполняй задания, лутай призы
        </div>
      </Button>
    </div>
  );
};
