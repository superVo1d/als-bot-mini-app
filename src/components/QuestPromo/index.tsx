import { classNames } from "@telegram-apps/sdk";
import { FC } from "react";
import "./styles.scss";
import { Button } from "../Button";
import { useAuth } from "@/context/AuthContext";

export interface QuestPromoProps {
  className?: string;
}
export const QuestPromo: FC<QuestPromoProps> = ({ className }) => {
  const { questsData, questProgress } = useAuth();

  return (
    <div className={classNames(className, "quest-promo")}>
      <Button href="/quest" className="quest-promo__content" style="clear">
        <div
          className="quest-promo__counter"
          style={{ visibility: questsData ? "visible" : "hidden" }}
        >{`${questProgress}/${questsData?.length}`}</div>
        <div className="quest-promo__title">Квест</div>
        <div className="quest-promo__description">
          Выполняй задания, лутай призы
        </div>
      </Button>
    </div>
  );
};
