import { useDataContext } from "@/context/DataContext";
import { servicesList } from "@/helpers/servicesCategories";
import { useEffect } from "react";
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";

export const useMapControl = (
  transformWrapperRef: React.RefObject<ReactZoomPanPinchRef>,
  mapRef: React.RefObject<HTMLDivElement>,
  onClick?: (name: string) => void
) => {
  const { suppliers } = useDataContext();

  const zoomToTarget = (name: string, floor = 6) => {
    const el = document.querySelector(
      `#studio_${floor} #${name}`
    ) as HTMLElement;

    if (!el) return false;

    transformWrapperRef.current?.zoomToElement(el, 3);

    return true;
  };

  const handleClick = (e: MouseEvent) => {
    let target = e.target as HTMLElement;

    if (!e.target || !suppliers) return;

    let targetId = undefined;

    const ids: string[] = [];
    const orgiginalIds: string[] = [];

    while (target) {
      if (target.tagName.toLowerCase() === "svg") {
        break;
      }
      if (target.id) {
        ids.push(target.id.replace(/_.*/, ""));
        orgiginalIds.push(target.id);
      }
      target = target.parentElement as HTMLElement;
    }

    let idIndex;

    ids.forEach((id, index) => {
      if (Object.keys(suppliers).concat(servicesList).includes(id)) {
        targetId = id;
        idIndex = index;
      }
    });

    if ((idIndex || idIndex === 0) && targetId) {
      const el = document.getElementById(orgiginalIds[idIndex]);

      if (!el) return;

      transformWrapperRef.current?.zoomToElement(el, 3);

      if (onClick) onClick(targetId);
    }
  };

  useEffect(() => {
    mapRef.current?.addEventListener("click", handleClick);

    return () => mapRef.current?.removeEventListener("click", handleClick);
  }, [transformWrapperRef, mapRef, onClick]);

  return { zoomToTarget };
};
