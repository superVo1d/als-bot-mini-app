"use client";

import { Button } from "@/components/Button";
import "./styles.scss";
import { Text } from "@/components/Text";
import { useEffect, useState } from "react";
import { useDataContext } from "@/context/DataContext";

export default function FAQPage() {
  const { fetchAfishaData } = useDataContext();
  const [cakeTime, setCakeTime] = useState<string>("");

  useEffect(() => {
    fetchAfishaData().then((data) =>
      setCakeTime(
        data.filter((item) => item.name === "Тема режет торт")[0]?.time
      )
    );
  });

  return (
    <div className="faq page clearfix">
      <Text className="faq__title" title="Ответы" titleSize="h2" />
      <div className="faq__container">
        <Button className="faq__button" href="/afisha">
          <Text text="Кто сейчас выступает?" />
        </Button>
        <Button className="faq__text">
          <Text
            text={`Тема режет торт в&nbsp;${cakeTime} у&nbsp;сцены, не&nbsp;пропусти!`}
          />
        </Button>
        <Button className="faq__button" href="/map">
          <Text text="Где что происходит?" />
        </Button>
        <Button className="faq__text">
          <Text
            text={`На&nbsp;6-м этаже раздают всем гостям аромасаше с&nbsp;логотипом Студии`}
          />
        </Button>
        <Button className="faq__text">
          <Text text={`Гости выходят и&nbsp;заходят по&nbsp;пропускам`} />
        </Button>
        <Button className="faq__text">
          <Text
            text={`Если что-то потерял, сообщи сотруднику Студии — и&nbsp;тебе помогут!<br/><span class="red">Студийцы опознаются по&nbsp;красным браслетам.</span>`}
          />
        </Button>
        <Button
          className="faq__button"
          href="/map/?category=services&supplier=wc&level=6"
        >
          <Text text={`Туалет на&nbsp;6-м этаже`} />
        </Button>
        <Button
          className="faq__button"
          href="/map/?category=services&supplier=wc&level=7"
        >
          <Text text={`Туалет на&nbsp;7-м этаже`} />
        </Button>
        <Button className="faq__text">
          <Text
            text={`Если почувствовал себя плохо, обратись к&nbsp;студийцам`}
          />
        </Button>
        {/* <Button className="faq__text">
          <Text
            text={`Курилки есть на&nbsp;лестнице между 6-м и&nbsp;7-м этажами`}
          />
        </Button> */}
        <Button className="faq__text">
          <Text text={`Можно выкладывать фото в&nbsp;соцсети!`} />
        </Button>
        <Button className="faq__text">
          <Text text={`Планируем вечеринить до&nbsp;02:00`} />
        </Button>
      </div>
    </div>
  );
}
