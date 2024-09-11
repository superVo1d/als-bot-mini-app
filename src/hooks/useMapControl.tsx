import { useEffect, useRef, useState } from "react";
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";

export const useMapControl = (
  transformWrapperRef: React.RefObject<ReactZoomPanPinchRef>,
  mapRef: React.RefObject<HTMLDivElement>
) => {
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (!e.target) return;

    const targetId = target.id.split("__")[1];
    if (target.id && targetId && targetId !== "background") {
      console.log(target.id);
    }
  };

  useEffect(() => {
    mapRef.current?.addEventListener("click", handleClick);

    return () => mapRef.current?.removeEventListener("click", handleClick);
  }, [transformWrapperRef, mapRef]);
};
