import {
  useUtils,
  classNames,
  useHapticFeedback,
} from "@telegram-apps/sdk-react";
import { type FC, type MouseEventHandler, type JSX, useCallback } from "react";
import {
  type LinkProps as NextLinkProps,
  default as NextLink,
} from "next/link";

import "./styles.scss";
import { UrlObject } from "url";

export interface ButtonProps
  extends Omit<NextLinkProps, "href">,
    Omit<JSX.IntrinsicElements["a"], "href" | "style"> {
  className?: string;
  href?: string | UrlObject;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  style?: "primary" | "secondary" | "clear";
}

export const Button: FC<ButtonProps> = ({
  className,
  onClick: propsOnClick,
  href,
  style = "primary",
  children,
  ...rest
}) => {
  const utils = useUtils();
  const hf = useHapticFeedback();

  const onClickLink = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    (e) => {
      hf.impactOccurred("light");
      propsOnClick?.(e);

      if (!href) {
        return;
      }

      // Compute if target path is external. In this case we would like to open link using
      // TMA method.
      let path: string;
      if (typeof href === "string") {
        path = href;
      } else {
        const { search = "", pathname = "", hash = "" } = href;
        path = `${pathname}?${search}#${hash}`;
      }

      const targetUrl = new URL(path, window.location.toString());
      const currentUrl = new URL(window.location.toString());
      const isExternal =
        targetUrl.protocol !== currentUrl.protocol ||
        targetUrl.host !== currentUrl.host;

      if (isExternal) {
        e.preventDefault();
        utils && utils.openLink(targetUrl.toString());
      }
    },
    [href, propsOnClick, utils]
  );

  const onClickButton = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      hf.impactOccurred("light");
      propsOnClick?.(e);
    },
    [propsOnClick]
  );

  if (!href) {
    return (
      <button
        onClick={onClickButton}
        className={classNames(className, "button", `button_${style}`)}
      >
        {children}
      </button>
    );
  }

  return (
    <NextLink
      {...rest}
      href={href}
      onClick={onClickLink}
      className={classNames(className, "button", `button_${style}`)}
    >
      {children}
    </NextLink>
  );
};
