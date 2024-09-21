import { classNames } from "@telegram-apps/sdk";
import { FC, useMemo, useState } from "react";
import MagazinusPromo3 from "@/assets/media/magazinus-3.png";
import NarayonePromo10 from "@/assets/media/narayone-10.png";
import { Text } from "../Text";

import "./styles.scss";
import { IPrizeItem } from "@/context/AuthContext";
import { usePopup } from "@telegram-apps/sdk-react";

export interface ICoupon {
  isActive: boolean;
  prize: IPrizeItem;
}

const Coupon: FC<ICoupon> = ({ isActive = true, prize }) => {
  const { name, code } = prize;
  const [flipped, setFlipped] = useState(false);
  const popup = usePopup(true);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    if (popup) {
      popup.open({
        message: "Промокод скопирован",
      });
    } else {
      alert("Промокод скопирован");
    }
  };

  const image = useMemo(() => {
    switch (name) {
      case "magazinus-3":
        return MagazinusPromo3;
      case "narayone-10":
        return NarayonePromo10;
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
        style={{ backgroundImage: `url(${image?.src})` }}
      />
      <div className="coupon__back" onClick={handleCopyCode}>
        <Text title={code} titleSize="h2" />
      </div>
    </div>
  );
};

export { Coupon };
