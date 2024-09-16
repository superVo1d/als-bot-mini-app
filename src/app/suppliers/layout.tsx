"use client";

import { useParams } from "next/navigation";
import { ReactNode, useMemo } from "react";

import "./styles.scss";
import { classNames } from "@telegram-apps/sdk";
import { Button } from "@/components/Button";
import HomeIcon from "@/assets/media/home.svg";

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
        return "/food.mp4";
      }
      case "alcohol": {
        return "/drink.mp4";
      }
      case "fun": {
        return "/fun.mp4";
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

  console.log(toMapHref);

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
            <video className="active" autoPlay loop muted>
              <source src={backgroundVideoName} type="video/mp4" />
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
          <Button className="suppliers__home-button" href="/">
            <HomeIcon />
          </Button>
        </div>
      </div>
    </>
  );
}
