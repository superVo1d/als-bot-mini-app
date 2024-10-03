import { ISupplierWithKey } from "@/context/DataContext";
import { FC, useCallback } from "react";

import "./styles.scss";
import { Text } from "../Text";
import { Button } from "@/components/Button";

import TelegramIcon from "@/assets/media/telegram.svg";
import InstagramIcon from "@/assets/media/instagram.svg";
import { classNames } from "@telegram-apps/sdk";

export interface ISupplierCard {
  supplier: ISupplierWithKey;
  className?: string;
}

const SupplierCard: FC<ISupplierCard> = ({ supplier, className }) => {
  const { name, image, description, social } = supplier;

  const getHref = useCallback(
    (item: string) => {
      if (item.startsWith("+")) {
        return `tel:${item}`;
      }

      return `https://${item}`;
    },
    [social]
  );

  const getType = useCallback(
    (item: string) => {
      if (item.startsWith("+")) {
        return "phone";
      }
      if (item.includes("instagram.com")) {
        return "instagram";
      }
      if (item.includes("t.me")) {
        return "telegram";
      }
      return "link";
    },
    [social]
  );

  const getIcon = useCallback(
    (item: string) => {
      if (item.includes("instagram.com")) {
        return <InstagramIcon />;
      }
      if (item.includes("t.me")) {
        return <TelegramIcon />;
      }
      return item;
    },
    [social]
  );

  return (
    <div className={classNames(className, "supplier-card")}>
      {/* <div className="supplier-card__image">
        <img loading="lazy" src={image} alt={name} />
      </div> */}
      <div className="supplier-card__text">
        <Text
          title={name}
          text={description}
          titleSize="h4"
          textSize="caption"
        />
      </div>
      {social && (
        <div className="supplier-card__social">
          {social
            .trim()
            .split("\n")
            .map((item, index) => (
              <Button
                key={index}
                style="clear"
                href={getHref(item)}
                className={classNames(
                  "supplier-card__social-button",
                  `supplier-card__social-button_${getType(item)}`
                )}
              >
                {getIcon(item)}
              </Button>
            ))}
        </div>
      )}
    </div>
  );
};

export { SupplierCard };
