import { FC } from "react";
import { Text } from "../Text";
import "./styles.scss";
import { Button } from "../Button";
import { IMetricaEventTypes, sendMetrikaEvent } from "@/helpers/metrika";

export const Menu: FC = () => {
  const onClick = (goal: IMetricaEventTypes) => {
    sendMetrikaEvent({ goal });
  };

  return (
    <div className="menu">
      <div className="menu__container-top">
        <Button
          className="menu__item"
          href="/afisha"
          style="clear"
          onClick={() => onClick(IMetricaEventTypes.OPEN_AFISHA)}
        >
          <Text title="Афиша" text="Главные события" textSize="caption" />
        </Button>
        <Button
          className="menu__item"
          href="/suppliers/fun"
          style="clear"
          onClick={() => onClick(IMetricaEventTypes.OPEN_FUN)}
        >
          <Text
            title="Фан"
            text="Таролог, рунолог, хиромант"
            textSize="caption"
          />
          <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/fun.png`} alt="" />
        </Button>
        <Button
          className="menu__item"
          href="/suppliers/edanapitki"
          style="clear"
          onClick={() => onClick(IMetricaEventTypes.OPEN_FOOD)}
        >
          <Text title="Хавчик" textSize="caption" />
          <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/food.png`} alt="" />
        </Button>
        <Button
          className="menu__item"
          href="/suppliers/alcohol"
          style="clear"
          onClick={() => onClick(IMetricaEventTypes.OPEN_DRINKS)}
        >
          <Text title="Бухлишко" textSize="caption" />
          <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/drink.png`} alt="" />
        </Button>
      </div>
      <Button
        href="/map"
        className="menu__item"
        style="clear"
        onClick={() => onClick(IMetricaEventTypes.OPEN_MAP)}
      >
        <Text title="Схема" />
        <video
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/map.mp4`}
          muted
          autoPlay
          playsInline
          loop
        />
      </Button>
      <Button
        href="/faq"
        style="secondary"
        onClick={() => onClick(IMetricaEventTypes.OPEN_FAQ)}
      >
        <span dangerouslySetInnerHTML={{ __html: "Вопросы и&nbsp;ответы" }} />
      </Button>
      <Button
        href="/services"
        style="secondary"
        onClick={() => onClick(IMetricaEventTypes.OPEN_SERVICES)}
      >
        Удобства
      </Button>
    </div>
  );
};
