import { FC } from "react";
import { Button } from "../Button";

import "./styles.scss";

export interface IDisplayItems {
  items: {
    name: string;
    path: string;
  }[];
}
const DisplayList: FC<IDisplayItems> = ({ items }) => {
  return (
    <div className="display-list">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Button style="secondary">{item.name}</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { DisplayList };
