"use client";

import React, { FC, MouseEventHandler, useMemo, useRef, useState } from "react";

import SixthFloor from "@/assets/media/6.svg";
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
import { DisplayList } from "../DisplayList";
import { Tumbler } from "../Tumbler";
import { useClickOutside } from "@/hooks/useClickOutside";

const Map: FC = () => {
  const { width } = useWindowSize();
  const transformWrapperRef = useRef<ReactZoomPanPinchRef | null>(null);
  const [selectedFloor, setSelectedFloor] = useState(0);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isLarge, setIsLarge] = useState<boolean>(true);

  useMapControl(transformWrapperRef, mapRef);

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

  const floors = [
    {
      name: "6 этаж",
    },
    {
      name: "7 этаж",
    },
  ];

  const changeFloor = (index: number) => {
    setSelectedFloor((prev) => (prev + 1) % 2);
    transformWrapperRef.current?.resetTransform();
  };

  const handleClickMap = (event: React.MouseEvent<HTMLElement>) => {
    if (!isLarge) {
      setIsLarge(true);
      event.stopPropagation();
    }
  };

  const style = useMemo(
    () => ({ width: width - 20, height: isLarge ? width : "auto" }),
    [width, isLarge]
  );

  const floor =
    selectedFloor === 1 ? (
      <SeventhFloor style={style} />
    ) : (
      <SixthFloor style={style} />
    );

  return (
    <div className="page map">
      <div className="map__wrapper" onClick={handleClickMap}>
        <TransformWrapper
          initialScale={1}
          initialPositionX={1}
          initialPositionY={1}
          ref={transformWrapperRef}
        >
          <TransformComponent>
            <div ref={mapRef}>{floor}</div>
          </TransformComponent>
        </TransformWrapper>
      </div>
      <NavigationTabs />
      <DisplayList items={items} />
      <Tumbler
        className="map__floor-tumbler"
        items={floors}
        onClick={changeFloor}
        activeIndex={selectedFloor}
      />
    </div>
  );
};

export { Map };
