import { classNames } from "@telegram-apps/sdk";
import { Text } from "../Text";
import { FC } from "react";
import "./styles.scss";

export interface FactsProps {
  className?: string;
}

export const Facts: FC<FactsProps> = ({ className }) => {
  return (
    <div className={classNames(className, "facts")}>
      <div>
        <img src="tema.png" />
      </div>
      <Text
        text="Безалкогольные напитки тоже есть: лимонады «Лето» в банках, пиво «Зеро пойнт», чаи «Вологодский чаеман», напитки «Дринксам». Все помечено на карте."
        textSize="caption"
      />
    </div>
  );
};
