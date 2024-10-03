import { classNames } from "@telegram-apps/sdk";
import { FC } from "react";
import "./styles.scss";

export interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <div className={classNames(className, "logo")}>
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={`${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`}
      >
        <source
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/logo.mp4`}
          type="video/mp4"
        />
      </video>
    </div>
  );
};
