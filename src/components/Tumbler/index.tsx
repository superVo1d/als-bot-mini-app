import { FC, useEffect, useRef } from "react";

import "./styles.scss";
import { Button } from "../Button";
import { classNames } from "@telegram-apps/sdk";

export interface ITumbler {
  className?: string;
  items: {
    name: string;
  }[];
  onClick?: (index: number) => void;
  activeIndex?: number;
}

const Tumbler: FC<ITumbler> = ({
  className,
  items,
  onClick,
  activeIndex = 0,
}) => {
  const buttonContainerRef = useRef<HTMLUListElement | null>(null);
  const pillowRef = useRef<HTMLDivElement | null>(null);

  const setTab = () => {
    if (!buttonContainerRef.current || !pillowRef.current) return;

    const wrapperEl = buttonContainerRef.current;
    const buttonEl = buttonContainerRef.current.querySelector(
      `li:nth-child(${activeIndex + 1})`
    );

    if (!buttonEl) return;

    const { x: wrapperX } = wrapperEl.getBoundingClientRect();
    const { x: buttonX, width: buttonWidth } = buttonEl.getBoundingClientRect();

    pillowRef.current.style.left = `${buttonX - wrapperX}px`;
    pillowRef.current.style.width = `${buttonWidth}px`;
  };

  useEffect(() => setTab(), [activeIndex]);

  const handleClick = (index: number) => {
    if (onClick) onClick(index);
  };

  return (
    <div className={classNames(className, "tumbler")}>
      <ul ref={buttonContainerRef}>
        {items.map((item, index) => (
          <li key={index}>
            <Button
              className={classNames("tumbler__button", {
                ["tumbler__button_active"]: index === activeIndex,
              })}
              onClick={() => handleClick(index)}
              style="clear"
            >
              {item.name}
            </Button>
          </li>
        ))}
        <div className="tumbler__pillow" ref={pillowRef} />
      </ul>
    </div>
  );
};

export { Tumbler };
