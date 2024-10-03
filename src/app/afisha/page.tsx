"use client";

import { useEffect, useMemo, useState } from "react";
import "./styles.scss";
import { Text } from "@/components/Text";
import { IScheduleData } from "../api/schedule/route";
import { useDataContext } from "@/context/DataContext";
import { classNames } from "@telegram-apps/sdk";
import { Button } from "@/components/Button";

export default function AfishaPage() {
  const [data, setData] = useState<IScheduleData | null>(null);
  const { suppliers, fetchAfishaData } = useDataContext();

  const fetchData = async () => {
    fetchAfishaData().then((newData) => setData(newData));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const itemsPrapared = useMemo(() => {
    if (!suppliers) return;

    return data
      ?.filter((item) => {
        return suppliers[item.name] || item.name === "Тема режет торт";
      })
      .map((item) => {
        const supplier = suppliers[item.name];

        return {
          key: supplier ? item.name : undefined,
          time: item.time,
          name: supplier?.name || item.name,
          image: supplier?.image,
        };
      });
  }, [data, suppliers]);

  return (
    <div className="afisha page clearfix">
      <Text className="afisha__title" title="Афиша" titleSize="h2" />
      {itemsPrapared?.map((item, index) => (
        <Button
          href={item.key ? "/afisha/" + item.key : undefined}
          className={classNames("afisha__item", {
            "afisha__item_no-image": !item.image,
          })}
          key={index}
          style="clear"
        >
          <div>
            <Text
              className="afisha__item__time-title"
              title={item.time}
              titleSize="h3"
            />
          </div>
          <Text
            className="afisha__item-title"
            title={item.name}
            titleSize={item.image ? "h2" : "h1"}
          />
          {/* {item.image && <img src={item.image} alt="" loading="lazy" />} */}
        </Button>
      ))}
    </div>
  );
}
