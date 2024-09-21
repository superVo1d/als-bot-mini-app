import { useAuth } from "@/context/AuthContext";
import { FC } from "react";
import { Text } from "../Text";

import "./styles.scss";
import { pluralize } from "@/helpers/pluralize";

const PrizesShowcase: FC = () => {
  const { level, nextLevelProgress } = useAuth();

  const caption = `${nextLevelProgress[0]}/${pluralize(nextLevelProgress[1], "заданий", "заданий", "заданий")} до следующего уровня`;

  return (
    <div className="prizes-showcase">
      <div className="prizes-showcase__container" />
      {level > 0 && (
        <Text
          className="prizes-showcase__level"
          text={level.toString() + " уровень"}
          textSize="caption"
        />
      )}
      <div className="caption" dangerouslySetInnerHTML={{ __html: caption }} />
    </div>
  );
};

export { PrizesShowcase };
