"use client";

import { Button } from "@/components/Button";
import "./styles.scss";
import { Text } from "@/components/Text";

export default function FAQPage() {
  return (
    <div className="faq page clearfix">
      <Text
        className="faq__title"
        title="Вопросы</br>и&nbsp;ответы"
        titleSize="h2"
      />
      <Button className="faq__button" href="/afisha">
        <Text text="Кто сейчас выступает?" />
      </Button>
      <Text
        text={`
        <p>
            Во&nbsp;сколько Тема режет торт?</br>
            &mdash;&nbsp;21:45&nbsp;у сцены
        </p>
        <p>
            Как узнать, где что происходит по&nbsp;программе?
        </p>
        `}
        textSize="caption"
      />
      <Button className="faq__button" href="/map">
        <Text text="Смотреть на&nbsp;карте" />
      </Button>
      <Text
        text={`
        <p>
            Есть&nbsp;ли на&nbsp;вечеринке фотозона?</br>
            &mdash;&nbsp;Да, она находится на&nbsp;6-м этаже. 
        </p>
        <p>
            Напомните, где в&nbsp;студии пожарные выходы.</br>
            &mdash;&nbsp;В&nbsp;студии два пожарных выхода: на&nbsp;6-м и&nbsp;7-м этажах. На&nbsp;6-м, за&nbsp;туалетами, сразу после алкозоны налево (см. указатели). На&nbsp;7-м пожарный выход совпадает с&nbsp;обычным.
        </p>
        <p>
            Можно&nbsp;ли выйти и&nbsp;снова зайти по&nbsp;пропуску?</br>
            &mdash;&nbsp;Конечно.
        </p>
        <p>
            Что делать, если я&nbsp;потерял телефон или другие ценные вещи?</br>
            &mdash;&nbsp;Подойти к&nbsp;любому сотруднику студии и&nbsp;рассказать о&nbsp;ситуации; студийцы опознаются по&nbsp;красным браслетам.
        </p>
        <p>
            С&nbsp;кем связаться, если почувствовал себя плохо?</br>
            &mdash;&nbsp;Обратиться к&nbsp;сотруднику студии.
        </p>
        <p>
            Можно&nbsp;ли курить и&nbsp;если&nbsp;да, то&nbsp;где?</br>
            &mdash;&nbsp;Курилки есть на&nbsp;лестнице между 6-м и&nbsp;7-м этажами.
        </p>
        <p>
            Где туалеты?</br>
            &mdash;&nbsp;На&nbsp;6-м этаже, рядом с&nbsp;кинки-пати, и&nbsp;7-м&nbsp;&mdash; рядом с&nbsp;пиццей &laquo;Чаплинс&raquo;.
        </p>
        <p>
            Можно&nbsp;ли мне выкладывать фото и&nbsp;видео в&nbsp;соцсети?</br>
            &mdash;&nbsp;Да.
        </p>
        <p>
            Во&nbsp;сколько закончится вечеринка?</br>
            &mdash;&nbsp;Планируем веселиться до&nbsp;2:00.
        </p>
        `}
        textSize="caption"
      />
    </div>
  );
}
