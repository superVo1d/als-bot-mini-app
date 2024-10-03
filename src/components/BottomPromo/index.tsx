import { classNames } from "@telegram-apps/sdk";
import { FC, ReactNode } from "react";
import "./styles.scss";

export interface BottomPromoProps {
  className?: string;
  children: ReactNode;
}
export const BottomPromo: FC<BottomPromoProps> = ({ className, children }) => {
  return (
    <div className={classNames(className, "bottom-promo")}>
      <div className="bottom-promo__content">{children}</div>
    </div>
  );
};
