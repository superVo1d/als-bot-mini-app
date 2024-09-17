import { FC } from "react";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import ALSLogo from "@/assets/media/als-logo.svg";

import "./styles.scss";

export interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: FC<OnboardingProps> = ({ onComplete }) => {
  return (
    <div className="onboarding page clearfix">
      <div className="onboarding__content">
        <div className="onboarding__offset_top">
          <ALSLogo />
        </div>
        <Text
          className="onboarding__text"
          text="<p>Двадцать девятая туса в Студии Артемия Лебедева.</p><p>Где и что находится, как потусить на максимум, выпивка, хрючево.</p>"
        />
        <Button className="onboarding__button" onClick={onComplete}>
          Начать вечеринку
        </Button>
      </div>
      <div className="onboarding__background">
        <video autoPlay loop muted>
          <source
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/welcome.mp4`}
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};
