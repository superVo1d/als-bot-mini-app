import { Button } from "@/components/Button";
import { FC, useEffect, useRef, useState } from "react";
import { classNames } from "@telegram-apps/sdk-react";

import "./styles.scss";
import { useSearchState } from "@/hooks/useSearchState";

export interface INavigationTabs {
  onClick?: (index: number) => void;
}

const NavigationTabs: FC<INavigationTabs> = ({ onClick }) => {
  const tabsRef = useRef<HTMLLIElement[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [{ category }, setParams] = useSearchState();

  useEffect(() => {
    setParams({
      category: tabs[activeTab].path,
    });
  }, [activeTab]);

  useEffect(() => {
    if (category !== tabs[activeTab].path) {
      const newTabIndex = tabs.findIndex((item) => item.path === category);
      setActiveTab(newTabIndex === -1 ? 0 : newTabIndex);
    }
  }, [category]);

  const tabs = [
    {
      name: "Хавчик",
      path: "edanapitki",
    },
    {
      name: "Бухлишко",
      path: "alcohol",
    },
    {
      name: "Фан",
      path: "fun",
    },
    {
      name: "Удобства",
      path: "other",
    },
  ];

  const handleClickTab = (index: number) => {
    setActiveTab(index);

    if (onClick) onClick(index);
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
        {tabs.map((item, index) => {
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
