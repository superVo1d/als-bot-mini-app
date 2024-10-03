"use client";

import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { useLangContext } from "@/context/LangContext";

import "./styles.scss";

export default function ServicesPage() {
  const { langData } = useLangContext();

  return (
    <div className="page services clearfix">
      <Text title="Удобства" className="services__text" titleSize="h2" />
      <div className="services__buttons-container">
        <Button href={"/map?category=services&supplier=wc&level=6"}>
          <Text text="Туалет на&nbsp;6-м" />
        </Button>
        <Button href={"/map?category=services&supplier=wc&level=7"}>
          <Text text="Туалет на&nbsp;7-м" />
        </Button>
        <Button href={"/map?category=services&supplier=kurilki"}>
          <Text text="Курилки" />
        </Button>
        <Button href={"/map?category=services&supplier=garderob"}>
          <Text text="Гардероб" />
        </Button>
      </div>
    </div>
  );
}
