import { Button } from "@/components/Button";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { classNames } from "@telegram-apps/sdk-react";

import "./styles.scss";
import { useSearchState } from "@/hooks/useSearchState";
import { useLangContext } from "@/context/LangContext";
import { useDataContext } from "@/context/DataContext";

export interface INavigationTabs {
  onClick?: (index: number) => void;
}

const NavigationTabs: FC<INavigationTabs> = ({ onClick }) => {
  const tabsRef = useRef<HTMLLIElement[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [{ category }, setParams] = useSearchState();
  const { langData } = useLangContext();

  useEffect(() => {
    setParams({
      category: tabs[activeTab].path,
      subcategory: "",
      supplier: "",
    });
  }, [activeTab]);

  useEffect(() => {
    if (category !== tabs[activeTab].path) {
      const newTabIndex = tabs.findIndex((item) => item.path === category);
      setActiveTab(newTabIndex === -1 ? 0 : newTabIndex);
    }
  }, [category]);

  const tabs = useMemo(
    () => [
      {
        name: langData["edanapitki"],
        path: "edanapitki",
      },
      {
        name: langData["alcohol"],
        path: "alcohol",
      },
      {
        name: langData["fun"],
        path: "fun",
      },
      {
        name: langData["udobstva"],
        path: "other",
      },
    ],
    [langData]
  );

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
