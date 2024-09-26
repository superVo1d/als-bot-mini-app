import { totalQuestLevels, useAuth } from "@/context/AuthContext";
import { FC, useEffect, useMemo, useRef } from "react";
import { Text } from "../Text";

import "./styles.scss";
import { pluralize } from "@/helpers/pluralize";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { classNames } from "@telegram-apps/sdk";

const PrizesShowcase: FC = () => {
  const { level, nextLevelProgress } = useAuth();
  const swiperRef = useRef<SwiperCore | null>(null);

  const caption = `${nextLevelProgress[0]}/${pluralize(nextLevelProgress[1], "заданий", "заданий", "заданий")} до следующего уровня`;

  const levels = useMemo(() => {
    return new Array(totalQuestLevels - 1).fill(undefined).map((_, index) => {
      return {
        level: `${index + 1} уровень`,
        image: `${process.env.NEXT_PUBLIC_BASE_URL}/${index + 1}-level.png`,
        isActive: index + 1 <= level,
      };
    });
  }, [totalQuestLevels, level]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(level - 1);
    }
  }, [level]);

  return (
    <div className="prizes-showcase">
      <div className="prizes-showcase__container">
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          initialSlide={level - 1}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {levels.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className={classNames("prizes-showcase__slide", {
                  "prizes-showcase__slide_active": item.isActive,
                })}
              >
                <div className="prizes-showcase__slide-image">
                  <img src={item.image} alt="" />
                </div>
                {level > 0 && (
                  <Text
                    className="prizes-showcase__level"
                    text={item.level}
                    textSize="caption"
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="caption" dangerouslySetInnerHTML={{ __html: caption }} />
    </div>
  );
};

export { PrizesShowcase };
