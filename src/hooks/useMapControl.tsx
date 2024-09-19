import { useEffect } from "react";
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";

export const useMapControl = (
  transformWrapperRef: React.RefObject<ReactZoomPanPinchRef>,
  mapRef: React.RefObject<HTMLDivElement>,
  onClick?: (name: string) => void
) => {
  const zoomToTarget = (name: string, floor = 6) => {
    const el = document.getElementById(`${floor}_svg__${name}`);

    if (!el) return false;

    transformWrapperRef.current?.zoomToElement(el, 3);

    return true;
  };

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (!e.target) return;

    const targetId = target.id.split("__")[1];
    if (target.id && targetId && targetId !== "background") {
      const el = document.getElementById(target.id);

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
