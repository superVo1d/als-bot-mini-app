import { classNames } from "@telegram-apps/sdk";
import { FC } from "react";
import "./styles.scss";

export interface QuestPromoProps {
  className?: string;
}
export const QuestPromo: FC<QuestPromoProps> = ({ className }) => {
  return (
    <div className={classNames(className, "quest-promo")}>
      <div className="quest-promo__content">
        <div className="quest-promo__counter">4/10</div>
        <div className="quest-promo__title">Квест</div>
        <div className="quest-promo__description">
          Выполняй задания, лутай призы
        </div>
      </div>
    </div>
  );
};
