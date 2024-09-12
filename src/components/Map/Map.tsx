"use client";

import React, { FC, useMemo, useRef, useState } from "react";

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
import { useDataContext } from "@/context/DataContext";
import { useSearchState } from "@/hooks/useSearchState";
import { useLangContext } from "@/context/LangContext";

const Map: FC = () => {
  const { width } = useWindowSize();
  const transformWrapperRef = useRef<ReactZoomPanPinchRef | null>(null);
  const [selectedFloor, setSelectedFloor] = useState(0);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isLarge, setIsLarge] = useState<boolean>(true);
  const { suppliers, getSubcategories, getSuppliers } = useDataContext();
  const { langData } = useLangContext();

  const [params, setParams] = useSearchState();
  const { category, subcategory, supplier } = params;

  const onMapSelect = (name: string) => {
    if (!suppliers) return;

    const selectedSupplier = suppliers[name];

    if (!selectedSupplier) return;

    setParams({
      category: selectedSupplier.category,
      subcategory: selectedSupplier.subcategory || "",
      supplier: selectedSupplier.key,
    });
  };

  useMapControl(transformWrapperRef, mapRef, onMapSelect);

  const subcategoriesItems = useMemo(() => {
    if (!category) return;

    return getSubcategories(category)?.map((name) => ({
      name: langData[name],
      path: name,
    }));
  }, [category, subcategory, suppliers, langData]);

  const floors = [
    {
      name: langData["6"],
    },
    {
      name: langData["7"],
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

  const handleClickTab = () => {
    transformWrapperRef.current?.resetTransform();
  };

  const handleClickListItem = (index: number) => {};

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
      <NavigationTabs onClick={handleClickTab} />
      {subcategoriesItems && (
        <DisplayList items={subcategoriesItems} onClick={handleClickListItem} />
      )}
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
