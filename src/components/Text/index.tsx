import { classNames } from "@telegram-apps/sdk";
import { FC } from "react";
import "./styles.scss";

export interface TextProps {
  text?: string;
  textSize?: "caption";
  titleSize?: "h2";
  title?: string;
  className?: string;
}

export const Text: FC<TextProps> = ({
  text,
  textSize,
  title,
  titleSize,
  className,
}) => {
  return (
    <div className={classNames(className, "text")}>
      {title && (
        <div
          className={classNames("text__title", `text__title_${titleSize}`)}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}
      {text && (
        <div
          className={classNames(
            "text__paragraph",
            `text__paragraph_${textSize}`
          )}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </div>
  );
};
