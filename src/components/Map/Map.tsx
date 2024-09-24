"use client";

import React, { FC, useEffect, useMemo, useRef, useState } from "react";

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
import { SupplierCard } from "../SupplierCard";
import { Button } from "../Button";
import { Text } from "../Text";
import { servicesCategory, servicesList } from "@/helpers/servicesCategories";
import { IMetricaEventTypes, sendMetrikaEvent } from "@/helpers/metrika";

const Map: FC = () => {
  const { width } = useWindowSize();
  const transformWrapperRef = useRef<ReactZoomPanPinchRef | null>(null);

  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isLarge, setIsLarge] = useState<boolean>(true);
  const { suppliers, categories, getSubcategories, getSuppliers } =
    useDataContext();
  const { langData } = useLangContext();

  const [params, setParams] = useSearchState();
  const { category, subcategory, supplier, level } = params;
  const [selectedFloor, setSelectedFloor] = useState(6);

  useEffect(() => {
    if (level) {
      setSelectedFloor(parseInt(level));
      setParams({
        level: undefined,
      });
    }
  }, [level]);

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

  useEffect(() => {
    if (!category) {
      setParams({
        category: "edanapitki",
      });
    }
  }, []);

  const { zoomToTarget } = useMapControl(
    transformWrapperRef,
    mapRef,
    onMapSelect
  );

  const currentSubcategories = useMemo(() => {
    if (!category) return;

    return getSubcategories(category)?.map((name) => ({
      name: langData[name],
      path: name,
    }));
  }, [category, subcategory, suppliers, langData]);

  const currentSuppliers = useMemo(() => {
    if (category === servicesCategory) {
      return servicesList.map((name) => ({
        name: langData[name],
        path: name,
      }));
    }

    if (!subcategory) return;

    return getSuppliers(subcategory)?.map(({ name, key }) => ({
      name,
      path: key,
    }));
  }, [category, subcategory, suppliers, langData]);

  const currentSupplier = useMemo(() => {
    if (!supplier || !suppliers) return;

    return suppliers[supplier];
  }, [category, subcategory, supplier, suppliers, langData]);

  const floors = [
    {
      name: langData["6"],
    },
    {
      name: langData["7"],
    },
  ];

  const toggleFloor = () => {
    setSelectedFloor((prev) => (prev === 7 ? 6 : 7));
    transformWrapperRef.current?.resetTransform();
  };

  const handleClickMap = (event: React.MouseEvent<HTMLElement>) => {
    if (!isLarge) {
      setIsLarge(true);
      event.stopPropagation();
    }
  };

  const handleClickCategory = (name: string) => {
    if (!categories) return;

    setParams({
      category: name,
      subcategory: undefined,
      supplier: undefined,
    });
    transformWrapperRef.current?.resetTransform();

    sendMetrikaEvent({
      goal: IMetricaEventTypes.OPEN_CATEGORY,
      params: { name },
    });
  };

  const handleClickSubcategory = (index: number) => {
    if (!currentSubcategories) return;

    setParams({
      subcategory: currentSubcategories[index].path,
    });

    sendMetrikaEvent({
      goal: IMetricaEventTypes.OPEN_SUBCATEGORY,
      params: { name: currentSubcategories[index].name },
    });
  };

  const handleClickSupplier = (index: number) => {
    const selectedSupplier = currentSuppliers?.[index];

    if (!currentSuppliers || !selectedSupplier) return;

    if (supplier === selectedSupplier.path) {
      zoomToTarget(supplier, selectedFloor);
    }

    setParams({
      supplier: selectedSupplier.path,
    });

    sendMetrikaEvent({
      goal: IMetricaEventTypes.OPEN_SUPPLIER,
      params: { name: selectedSupplier.name },
    });
  };

  useEffect(() => {
    if (!supplier) return;

    const isSupplierOnMap = zoomToTarget(supplier, selectedFloor);

    if (!isSupplierOnMap) {
      toggleFloor();
      setTimeout(
        () => zoomToTarget(supplier, selectedFloor === 6 ? 7 : 6),
        100
      );
    }
  }, [supplier]);

  const style = useMemo(
    () => ({ width: width - 20, height: isLarge ? width : "auto" }),
    [width, isLarge]
  );

  const floor =
    selectedFloor === 7 ? (
      <SeventhFloor style={style} />
    ) : (
      <SixthFloor style={style} />
    );

  const isSubcategoriesShowing = useMemo(
    () => currentSubcategories && !currentSuppliers && !currentSupplier,
    [currentSubcategories, currentSupplier]
  );

  const isSuppliersShowing = useMemo(
    () =>
      (currentSubcategories && currentSuppliers && !currentSupplier) ||
      category === servicesCategory,
    [currentSubcategories, currentSupplier]
  );

  const isBackButtonShowing = useMemo(
    () => subcategory && (currentSuppliers || currentSupplier),
    [currentSupplier, currentSuppliers]
  );

  const backButtonLabel = useMemo(() => {
    if (subcategory) {
      return langData[subcategory];
    }
  }, [currentSubcategories, currentSupplier, currentSuppliers, subcategory]);

  const handleClickBack = () => {
    if (supplier) {
      setParams({
        supplier: undefined,
      });
    } else if (subcategory) {
      setParams({
        subcategory: undefined,
      });
    }
  };

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
        name: langData["services"],
        path: "services",
      },
    ],
    [langData]
  );

  const categoryTabIndex = useMemo(() => {
    const newTabIndex = tabs.findIndex((item) => item.path === category);
    return newTabIndex === -1 ? 0 : newTabIndex;
  }, [category]);

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
      <NavigationTabs
        onClick={handleClickCategory}
        items={tabs}
        activeTabIndex={categoryTabIndex}
      />
      {isBackButtonShowing && (
        <Button
          onClick={handleClickBack}
          className="map__back-button"
          style="clear"
        >
          <Text title={backButtonLabel} titleSize="h4" />
        </Button>
      )}
      {isSubcategoriesShowing && currentSubcategories && (
        <DisplayList
          items={currentSubcategories}
          onClick={handleClickSubcategory}
        />
      )}
      {isSuppliersShowing && currentSuppliers && (
        <DisplayList items={currentSuppliers} onClick={handleClickSupplier} />
      )}
      {currentSupplier && (
        <SupplierCard
          className="map__supplier-card"
          supplier={currentSupplier}
        />
      )}
      <Tumbler
        className="map__floor-tumbler"
        items={floors}
        onClick={toggleFloor}
        activeIndex={selectedFloor - 6}
      />
    </div>
  );
};

export { Map };
