import { classNames } from "@telegram-apps/sdk";
import { FC } from "react";
import "./styles.scss";

export interface TextProps {
  text?: string;
  textSize?: "caption";
  title?: string;
  className?: string;
}

export const Text: FC<TextProps> = ({ text, textSize, title, className }) => {
  return (
    <div className={classNames(className, "text")}>
      {title && (
        <div
          className="text__title"
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
