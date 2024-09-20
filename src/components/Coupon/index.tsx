import { classNames } from "@telegram-apps/sdk";
import { FC, useMemo, useState } from "react";
import MagazinusPromo3 from "@/assets/media/magazinus-3.png";
import { Text } from "../Text";

import "./styles.scss";
import Image from "next/image";

export interface ICoupon {
  isActive: boolean;
  name: string;
  code: string;
}

const Coupon: FC<ICoupon> = ({ name, code }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    alert("Coupon code copied!");
  };

  const image = useMemo(() => {
    switch (name) {
      case "magazinus-3":
        return MagazinusPromo3;
    }
  }, [name]);

  return (
    <div
      className={classNames("coupon", { coupon_flipped: flipped })}
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
