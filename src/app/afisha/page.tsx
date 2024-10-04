"use client";

import { useEffect, useMemo, useState } from "react";
import "./styles.scss";
import { Text } from "@/components/Text";
import { IScheduleData } from "../api/schedule/route";
import { useDataContext } from "@/context/DataContext";
import { classNames } from "@telegram-apps/sdk";
import { Button } from "@/components/Button";
import { useScrollTo } from "@/hooks/useScrollTo";

export default function AfishaPage() {
  const [data, setData] = useState<IScheduleData | null>(null);
  const { suppliers, fetchAfishaData } = useDataContext();
  const { scrollTo } = useScrollTo();

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

    const now = new Date();

    let lastPastEventIndex = -1;
    let lastEventEndTime: Date | null = null;

    const mappedItems = data
      ?.filter((event) => {
        return suppliers[event.name] || event.name === "Тема режет торт";
      })
      .map((event, index) => {
        const supplier = suppliers[event.name];
        const [day, month, year] = event.date.split(".");
        const formattedDate = `${year}-${month}-${day}`;
        const eventDateTime = new Date(`${formattedDate}T${event.time}:00`);
        const eventEndTime = new Date(eventDateTime.getTime() + 60 * 60 * 1000);

        const isPast = now > eventDateTime;

        if (isPast) {
          lastPastEventIndex = index;
          lastEventEndTime = eventEndTime;
        }

        return {
          key: supplier ? event.name : undefined,
          time: event.time,
          name: supplier?.name || event.name,
          image: supplier?.image,
          isNow: false,
          past: isPast,
        };
      });

    if (
      lastPastEventIndex !== -1 &&
      lastEventEndTime &&
      now.getTime() - (lastEventEndTime as Date).getTime() <= 60 * 60 * 1000 &&
      mappedItems
    ) {
      mappedItems[lastPastEventIndex].isNow = true;
      mappedItems[lastPastEventIndex].past = false;
    } else if (mappedItems) {
      mappedItems.forEach((item) => {
        item.isNow = false;
        item.past = false;
      });
    }

    return mappedItems;
  }, [data, suppliers]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (itemsPrapared?.some((event) => event.isNow)) {
        scrollTo({ id: "now" });
      }
    }, 10);

    return () => clearTimeout(timeoutId);
  }, [itemsPrapared]);

  return (
    <div className="afisha page clearfix">
      <Text className="afisha__title" title="Афиша" titleSize="h2" />
      {itemsPrapared?.map((item, index) => (
        <div
          id={item.isNow ? "now" : undefined}
          className={classNames("afisha__item", {
            "afisha__item_no-image": !item.image,
            afisha__item_past: item.past,
          })}
          key={index}
        >
          <div>
            <Text
              className="afisha__item-time"
              title={item.time}
              titleSize="h3"
            >
              {item.past && (
                <div className="afisha__item-label">
                  <Text text="уже выступил" textSize="caption" />
                </div>
              )}
              {item.isNow && (
                <div className="afisha__item-label">
                  <Text text="сейчас выступает" textSize="caption" />
                </div>
              )}
            </Text>
          </div>
          <Text
            className="afisha__item-title"
            title={item.name}
            titleSize={item.image ? "h2" : "h1"}
          />
          {item.image && <img src={item.image} alt="" loading="lazy" />}
          {item.key && (
            <Button
              className="afisha__button"
              href={"/afisha/" + item.key}
              style="clear"
            >
              <Text text="подробнее" textSize="caption" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
