"use client";

import { Text } from "@/components/Text";
import { useParams } from "next/navigation";
import { useDataContext } from "@/context/DataContext";
import { useMemo } from "react";
import { useLangContext } from "@/context/LangContext";
import { Button } from "@/components/Button";
import { classNames } from "@telegram-apps/sdk";
import { SupplierCard } from "@/components/SupplierCard";
import { IMetricaEventTypes, sendMetrikaEvent } from "@/helpers/metrika";

export default function CategoryPage() {
  const { supplier: params } = useParams();
  const { categories, getSubcategories, getSuppliers, suppliers } =
    useDataContext();
  const { langData } = useLangContext();

  const [currentCategory, currentSubcategory, currentSupplier] = params;

  const isCategoryShowing = useMemo(
    () => currentCategory && !currentSubcategory,
    [params]
  );
  const isSubcategoryShowing = useMemo(
    () => currentCategory && currentSubcategory && !currentSupplier,
    [params]
  );
  const isSupplierShowing = useMemo(
    () => currentCategory && currentSubcategory && currentSupplier,
    [params]
  );

  const breadcrumbs = useMemo(() => {
    const result: { name: string; href: string }[] = [];

    if (currentCategory) {
      if (!categories?.includes(currentCategory)) return result;
      result.push({
        name: langData[currentCategory],
        href: currentCategory,
      });
    }

    if (currentSubcategory) {
      if (getSubcategories(currentCategory)?.length === 0) return result;
      result.push({
        name: langData[currentSubcategory],
        href: currentCategory + "/" + currentSubcategory,
      });
    }

    // if (currentSupplier) {
    //   if (!suppliers?.[currentSupplier]) return result;
    //   result.push({
    //     name: suppliers[currentSupplier].name,
    //     href:
    //       currentCategory + "/" + currentSubcategory + "/" + currentSupplier,
    //   });
    // }

    return result;
  }, [params, categories, langData]);

  const subcategoriesPrepared = useMemo(
    () => getSubcategories(currentCategory),
    [currentCategory, suppliers]
  );

  const suppliersPrepared = useMemo(
    () => getSuppliers(currentSubcategory),
    [currentSubcategory, suppliers]
  );

  const supplerPreapred = useMemo(
    () => suppliers?.[currentSupplier],
    [currentSubcategory, suppliers]
  );

  const sendMetrics = (goal: IMetricaEventTypes, name: string) => {
    sendMetrikaEvent({
      goal,
      params: {
        name,
      },
    });
  };

  return (
    <div
      className={classNames("suppliers__content", {
        suppliers__content_card: isSupplierShowing,
      })}
    >
      <div className="suppliers__breadcrumbs">
        {breadcrumbs.map((item, index) => (
          <Button
            key={index}
            className="suppliers__breadcrumbs-item"
            href={"/suppliers/" + item.href}
            style="clear"
          >
            <Text title={item.name} titleSize="h2" />
          </Button>
        ))}
      </div>
      {isCategoryShowing && (
        <div className="suppliers__list">
          <ul>
            {subcategoriesPrepared?.map((subcategoryName, index) => (
              <li key={index}>
                <Button
                  href={currentCategory + "/" + subcategoryName}
                  style="clear"
                  onClick={() =>
                    sendMetrics(
                      IMetricaEventTypes.OPEN_SUBCATEGORY,
                      subcategoryName
                    )
                  }
                >
                  <Text title={langData[subcategoryName]} titleSize="h2" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isSubcategoryShowing && (
        <div className="suppliers__list">
          <ul>
            {suppliersPrepared?.map((supplier, index) => (
              <li key={index}>
                <Button
                  href={currentSubcategory + "/" + supplier.key}
                  style="clear"
                  onClick={() =>
                    sendMetrics(IMetricaEventTypes.OPEN_SUPPLIER, supplier.name)
                  }
                >
                  <Text title={supplier.name} titleSize="h4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isSupplierShowing && (
        <div className="suppliers__card">
          {supplerPreapred && (
            <SupplierCard supplier={supplerPreapred} showImage />
          )}
        </div>
      )}
    </div>
  );
}
