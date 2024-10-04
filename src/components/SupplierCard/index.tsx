import { ISupplierWithKey } from "@/context/DataContext";
import { FC, useCallback } from "react";

import "./styles.scss";
import { Text } from "../Text";
import { Button } from "@/components/Button";

import TelegramIcon from "@/assets/media/telegram.svg";
import InstagramIcon from "@/assets/media/instagram.svg";
import VKIcon from "@/assets/media/vk.svg";
import { classNames } from "@telegram-apps/sdk";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export interface ISupplierCard {
  supplier: ISupplierWithKey;
  className?: string;
  showImage?: boolean;
}

const SupplierCard: FC<ISupplierCard> = ({
  supplier,
  className,
  showImage = false,
}) => {
  const { name, image, description, social } = supplier;

  const getHref = useCallback(
    (item: string) => {
      if (item.startsWith("+")) {
        return `tel:${item}`;
      }

      if (emailRegex.test(item)) {
        return `mailto:${item}`;
      }

      return item.startsWith("http") ? item : `https://${item}`;
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
      if (item.includes("vk.com") || item.includes("vkontakte.ru")) {
        return "vk";
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
      if (item.includes("vk.com") || item.includes("vkontakte.ru")) {
        return <VKIcon />;
      }
      return item;
    },
    [social]
  );

  return (
    <div className={classNames(className, "supplier-card")}>
      {showImage && (
        <div className="supplier-card__image">
          <img loading="lazy" src={image} alt={name} />
        </div>
      )}
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
            .filter(
              (item) =>
                !["", " ", "\r"].includes(item) &&
                !item.startsWith("+7") &&
                !item.startsWith("8")
            )
            .map((item, index) => (
              <Button
                key={index}
                style="clear"
                href={getHref(item)}
                target="_blank"
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
