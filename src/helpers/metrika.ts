import ym from "react-yandex-metrika";

export enum IMetricaEventTypes {
  OPEN_DRINKS = "open-drinks",
  OPEN_FOOD = "open-food",
  OPEN_FUN = "open-fun",
  OPEN_MAP = "open-map",
  OPEN_AFISHA = "open-afisha",
  OPEN_SERVICES = "open-services",
  OPEN_FAQ = "open-faq",
  OPEN_QUEST = "open-quest",
  COMPLETE_QUEST = "complete-quest",
  OPEN_CATEGORY = "open-category",
  OPEN_SUBCATEGORY = "open-subcategory",
  OPEN_SUPPLIER = "open-supplier",
}

export const sendMetrikaEvent = ({
  goal,
  event = "reachGoal",
  params = {},
}: {
  goal: IMetricaEventTypes;
  event?: string;
  params?: { [key: string]: any };
}) => {
  try {
    ym(event, [goal], params);
  } catch (e) {}
};
