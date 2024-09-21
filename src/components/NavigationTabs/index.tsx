import { Button } from "@/components/Button";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { classNames } from "@telegram-apps/sdk-react";

import "./styles.scss";
import { useSearchState } from "@/hooks/useSearchState";
import { useLangContext } from "@/context/LangContext";

export interface INavigationItem {
  name: string;
  path: string;
}

export interface INavigationTabs {
  onClick?: (index: string) => void;
  items: INavigationItem[];
  activeTabIndex: number;
}

const NavigationTabs: FC<INavigationTabs> = ({
  onClick,
  items,
  activeTabIndex: activeTab = 0,
}) => {
  const tabsRef = useRef<HTMLLIElement[]>([]);

  const handleClickTab = (index: number) => {
    if (onClick) onClick(items[index].path);
  };

  useEffect(() => {
    tabsRef.current[activeTab]?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [activeTab, tabsRef]);

  return (
    <div className="navigation-tabs">
      <ul>
        {items.map((item, index) => {
          return (
            <li
              key={index}
              ref={(el) => {
                el && tabsRef.current.push(el);
              }}
            >
              <Button
                onClick={() => handleClickTab(index)}
                className={classNames(
                  "navigation-tabs__button",
                  `navigation-tabs__button_${item.path}`,
                  {
                    [`navigation-tabs__button_active`]: index === activeTab,
                  }
                )}
                style="clear"
              >
                {item.name}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { NavigationTabs };
