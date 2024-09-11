"use client";

import React, { FC, useEffect, useRef, useState } from "react";

import SeventhFloor from "@/assets/media/7.svg";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useMapControl } from "@/hooks/useMapControl";

import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import { NavigationTabs } from "@/components/NavigationTabs";
import "./styles.scss";
import { useClickOutside } from "@/hooks/useClickOutside";
import { DisplayList } from "../DisplayList";

const Map: FC = () => {
  const { width, height } = useWindowSize();
  const transformWrapperRef = useRef<ReactZoomPanPinchRef | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isLarge, setIsLarge] = useState(false);

  useMapControl(transformWrapperRef, mapRef);
  useClickOutside(mapRef, () => setIsLarge(false));

  const items = [
    {
      name: "Закуски",
      path: "#",
    },
    {
      name: "Потяжелее",
      path: "#",
    },
    {
      name: "Безалкогольные напитки",
      path: "#",
    },
    {
      name: "Закуски",
      path: "#",
    },
    {
      name: "Разное",
      path: "#",
    },
  ];

  return (
    <div className="page map">
      <div className="map__wrapper" onClick={() => setIsLarge(true)}>
        <TransformWrapper ref={transformWrapperRef}>
          <TransformComponent>
            <div ref={mapRef}>
              <SeventhFloor
                style={{ width: width - 20, height: isLarge ? width : "auto" }}
              />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
      <NavigationTabs />
      <DisplayList items={items} />
    </div>
  );
};

export { Map };
