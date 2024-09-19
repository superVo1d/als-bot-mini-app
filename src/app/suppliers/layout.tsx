"use client";

import { useParams } from "next/navigation";
import { ReactNode, useMemo } from "react";

import "./styles.scss";
import { classNames } from "@telegram-apps/sdk";
import { Button } from "@/components/Button";

export default function CategoryPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { supplier: params } = useParams();
  const [currentCategory, currentSubcategory, currentSupplier] = params;

  const backgroundVideoName = useMemo(() => {
    switch (currentCategory) {
      case "edanapitki": {
        return "food";
      }
      case "alcohol": {
        return "drink";
      }
      case "fun": {
        return "fun";
      }
      default:
        break;
    }
  }, [currentCategory]);

  const toMapHref = useMemo(
    () =>
      `/map/?${new URLSearchParams({ category: currentCategory, subcategory: currentSubcategory, supplier: currentSupplier }).toString()}`,
    [currentCategory, currentSubcategory, currentSupplier]
  );

  return (
    <>
      <div
        className={classNames(
          "suppliers page clearfix",
          `suppliers_${currentCategory}`
        )}
      >
        {children}
        <div className="suppliers__background">
          {backgroundVideoName && (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={`${process.env.NEXT_PUBLIC_BASE_URL}/${backgroundVideoName}.png`}
            >
              <source
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/${backgroundVideoName}.mp4`}
                type="video/mp4"
              />
            </video>
          )}
        </div>
        <div className="suppliers__bottom-buttons-wrapper">
          {currentSupplier && (
            <Button className="suppliers__home-button" href={toMapHref}>
              <span
                dangerouslySetInnerHTML={{ __html: "Найти на&nbsp;карте" }}
              />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
