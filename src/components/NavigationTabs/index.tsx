import { Button } from "@/components/Button";
import { FC, useEffect, useRef, useState } from "react";
import { classNames } from "@telegram-apps/sdk-react";

import "./styles.scss";

const NavigationTabs: FC = () => {
  const tabsRef = useRef<HTMLLIElement[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      name: "Хавчик",
      path: "food",
    },
    {
      name: "Бухлишко",
      path: "drink",
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
                onClick={() => setActiveTab(index)}
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
