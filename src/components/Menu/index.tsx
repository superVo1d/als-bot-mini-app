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
      <Button className="menu__item" href="/suppliers/fun" style="clear">
        <Text
          title="Фан"
          text="Таролог, рунолог, хиромант"
          textSize="caption"
        />
        <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/fun.png`} alt="" />
      </Button>
      <Button className="menu__item" href="/suppliers/edanapitki" style="clear">
        <Text title="Хавчик" textSize="caption" />
        <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/food.png`} alt="" />
      </Button>
      <Button className="menu__item" href="/suppliers/alcohol" style="clear">
        <Text title="Бухлишко" textSize="caption" />
        <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/drink.png`} alt="" />
      </Button>
    </div>
    <Button href="/map" className="menu__item" style="clear">
      <Text title="Карта" />
    </Button>
    <Button href="/faq" style="secondary">
      Вопросы и ответы
    </Button>
    <Button href="/services" style="secondary">
      Удобства
    </Button>
  </div>
);
