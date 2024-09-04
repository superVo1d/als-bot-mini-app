import { FC } from "react";
import { Text } from "../Text";
import "./styles.scss";
import { Button } from "../Button";

export const Menu: FC = () => (
  <div className="menu">
    <div className="menu__container-top">
      <div className="menu__item">
        <Text title="Афиша" text="Главные собтия" textSize="caption" />
      </div>
      <div className="menu__item">
        <Text
          title="Фан"
          text="Таролог, рунолог, хиромант"
          textSize="caption"
        />
      </div>
      <div className="menu__item">
        <Text title="Хавчик" textSize="caption" />
      </div>
      <div className="menu__item">
        <Text title="Бухлишко" textSize="caption" />
      </div>
    </div>
    <div className="menu__item">
      <Text title="Карта" />
    </div>
    <Button style="secondary">Вопросы и ответы</Button>
    <Button style="secondary">Удобства</Button>
  </div>
);
