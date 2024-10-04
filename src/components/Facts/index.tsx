import { classNames } from "@telegram-apps/sdk";
import { Text } from "../Text";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import "./styles.scss";

import { Autoplay, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { SwiperSlide, Swiper } from "swiper/react";

export interface FactsProps {
  className?: string;
}

const sentences = [
  "Познакомься с&nbsp;нашим роботом! Он&nbsp;не&nbsp;заменит крупье, но&nbsp;раздаст лучшую карту&nbsp;/ будет ставить на&nbsp;твой выигрыш",
  "Приходи в&nbsp;банный комплекс Жар-птица и&nbsp;порхай как бабочка после массажа",
  "Азино три топора. Ну&nbsp;почти. Только лучше и&nbsp;с&nbsp;профессиональным крупье",
  "Приз или деньги. Ой, это из&nbsp;другой игры. Приходи в&nbsp;казино и&nbsp;выигрывай Студикоины&nbsp;/ Темакоины",
  "А&nbsp;вы&nbsp;знали, что казино официально разрешили в&nbsp;России? Только у&nbsp;нас, только в&nbsp;Студии Лебедева",
  "Подпольное казино в&nbsp;Студии Лебедева. Быстро, дорого, охуенно",
  "Техасский покер, блэкджек, рулетка. Только сегодня, только в&nbsp;Студии Лебедева, казино без границ",
  "Не&nbsp;забудь взять аромасаше&nbsp;&mdash; такое тебе никто не&nbsp;подарит!",
  "Расслабься и&nbsp;приходи на&nbsp;йогу с&nbsp;вином",
  "Узнай свое будущее&nbsp;&mdash; распечатай предсказание в&nbsp;Предсказочной",
];

export const Facts: FC<FactsProps> = ({ className }) => {
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  }, []);

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledSentences = useMemo(() => shuffleArray(sentences), []);

  return (
    <div className={classNames(className, "facts")}>
      <Swiper
        slidesPerView={1}
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        loop
        pagination={{
          dynamicBullets: true,
          dynamicMainBullets: 3,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {shuffledSentences.map((text, index) => (
          <SwiperSlide key={index}>
            <Text text={text} textSize="caption" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
