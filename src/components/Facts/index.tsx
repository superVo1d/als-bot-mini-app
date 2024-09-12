import { classNames } from "@telegram-apps/sdk";
import { Text } from "../Text";
import { FC, useEffect, useRef, useState } from "react";
import "./styles.scss";

import { Autoplay, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { SwiperSlide, Swiper } from "swiper/react";

export interface FactsProps {
  className?: string;
}

export const Facts: FC<FactsProps> = ({ className }) => {
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  }, []);

  return (
    <div className={classNames(className, "facts")}>
      <Swiper
        slidesPerView={1}
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        loop
        pagination
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        <SwiperSlide>
          <Text
            text="Безалкогольные напитки тоже есть: лимонады «Лето» в банках, пиво «Зеро пойнт», чаи «Вологодский чаеман», напитки «Дринксам». Все помечено на карте."
            textSize="caption"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Text
            text="Безалкогольные напитки тоже есть: лимонады «Лето» в банках, пиво «Зеро пойнт», чаи «Вологодский чаеман», напитки «Дринксам». Все помечено на карте."
            textSize="caption"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Text
            text="Безалкогольные напитки тоже есть: лимонады «Лето» в банках, пиво «Зеро пойнт», чаи «Вологодский чаеман», напитки «Дринксам». Все помечено на карте."
            textSize="caption"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
