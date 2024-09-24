import { FC } from "react";
import { Button } from "../Button";

import "./styles.scss";

export interface IDisplayItems {
  items: {
    name: string;
    path: string;
  }[];
  onClick?: (index: number) => void;
}
const DisplayList: FC<IDisplayItems> = ({ items, onClick }) => {
  return (
    <div className="display-list">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Button style="secondary" onClick={() => onClick && onClick(index)}>
              <span dangerouslySetInnerHTML={{ __html: item.name }} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { DisplayList };
