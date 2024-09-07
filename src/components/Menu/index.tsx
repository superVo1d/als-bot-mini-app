import { FC } from "react";
import { Text } from "../Text";
import "./styles.scss";
import { Button } from "../Button";

export const Menu: FC = () => (
  <div className="menu">
    <div className="menu__container-top">
      <Button className="menu__item" href="/afisha" style="clear">
        <Text title="Афиша" text="Главные собтия" textSize="caption" />
      </Button>
      <Button href="/ton-connect" className="menu__item" style="clear">
        <Text
          title="Фан"
          text="Таролог, рунолог, хиромант"
          textSize="caption"
        />
      </Button>
      <Button href="/init-data" className="menu__item" style="clear">
        <Text title="Хавчик" textSize="caption" />
      </Button>
      <Button href="/launch-params" className="menu__item" style="clear">
        <Text title="Бухлишко" textSize="caption" />
      </Button>
    </div>
    <Button href="/qr" className="menu__item" style="clear">
      <Text title="Карта" />
    </Button>
    <Button style="secondary">Вопросы и ответы</Button>
    <Button style="secondary">Удобства</Button>
  </div>
);
