import { FC } from "react";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import "./styles.scss";

export interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: FC<OnboardingProps> = ({ onComplete }) => {
  return (
    <div className="onboarding page clearfix">
      <Text
        className="onboarding__text"
        text="<p>Двадцать девятая тусав Студии Артемия Лебедева.</p><p>Где и что находится, как потусить на максимум, выпивка, хрючево.</p>"
      />
      <Button className="onboarding__button" onClick={onComplete}>
        Начать вечеринку
      </Button>
    </div>
  );
};
