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
          text={`<p>Двадцать девятая туса в&nbsp;Студии Артемия Лебедева.</p>
<p>Где что находится и&nbsp;как потусить по&nbsp;максимуму, чем угощают и&nbsp;какие напитки есть в&nbsp;баре.</p>`}
        />
        <Button className="onboarding__button" onClick={onComplete}>
          Начать вечеринку
        </Button>
      </div>
      <div className="onboarding__background">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={`${process.env.NEXT_PUBLIC_BASE_URL}/welcome.png`}
        >
          <source
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/welcome.mp4`}
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};
