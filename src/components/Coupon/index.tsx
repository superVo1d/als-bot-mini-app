import { classNames } from "@telegram-apps/sdk";
import { FC, useMemo, useState } from "react";
import { IPrizeItem } from "@/context/AuthContext";

import MagazinusPromo3 from "@/assets/media/magazinus-3.png";
import MagazinusPromo15 from "@/assets/media/magazinus-15.png";
import MagazinusPromo15Back from "@/assets/media/magazinus-15-back.png";
import NarayonePromo10 from "@/assets/media/narayone-10.png";
import NarayonePromo15 from "@/assets/media/narayone-15.png";
import NarayonePromo15Back from "@/assets/media/narayone-15-back.png";
import ZhurnalusPromo15 from "@/assets/media/zhurnalus-15.png";
import ZhurnalusPromo15Back from "@/assets/media/zhurnalus-15-back.png";
import "./styles.scss";

export interface ICoupon {
  isActive: boolean;
  prize: IPrizeItem;
}

const Coupon: FC<ICoupon> = ({ isActive = true, prize }) => {
  const { name, code } = prize;
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    alert("Промокод скопирован!");
  };

  const image = useMemo(() => {
    switch (name) {
      case "magazinus-3":
        return [MagazinusPromo3, MagazinusPromo3];
      case "narayone-10":
        return [NarayonePromo10, NarayonePromo10];
      case "narayone-15":
        return [NarayonePromo15, NarayonePromo15Back];
      case "magazinus-15":
        return [MagazinusPromo15, MagazinusPromo15Back];
      case "zhurnalus-15":
        return [ZhurnalusPromo15, ZhurnalusPromo15Back];
    }
  }, [name]);

  return (
    <div
      className={classNames("coupon", {
        coupon_active: isActive,
        coupon_flipped: flipped,
      })}
      onClick={handleClick}
    >
      <div
        className="coupon__front"
        style={{ backgroundImage: `url(${image && image[0].src})` }}
      />
      <div
        className="coupon__back"
        onClick={handleCopyCode}
        style={{ backgroundImage: `url(${image && image[1].src})` }}
      />
    </div>
  );
};

export { Coupon };
