import { FC } from "react";
import "./styles.scss";
import { Text } from "../Text";
import { Button } from "../Button";

export interface AfterPartyProps {
  onComplete: () => void;
}

export const AfterParty: FC<AfterPartyProps> = ({ onComplete }) => {
  return (
    <div className="after-party">
      <div>
        <div className="after-party__content">
          <Text title="Вечеринка была топ и&nbsp;ты тоже!" titleSize="h2" />
          <div className="after-party__content-top">
            <Text title="Фото- и&nbsp;видеоотчеты появятся" />
            <Text title="20 октября" titleSize="h2" />
          </div>
          <div className="after-party__content-bottom">
            <Text
              className="after-party__text"
              title="А&nbsp;пока можешь делиться своими фотками с&nbsp;вечеринки в&nbsp;чат-боте мероприятия"
            />
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/logo-after-party.png`}
              alt=""
            />
          </div>
          <div className="after-party__button-wrapper">
            <Text
              text="Опа! У&nbsp;тебя есть приз за&nbsp;то, что ты просто пришел :)"
              textSize="caption"
            />
            <Button href="/prizes" onClick={onComplete}>
              <Text text="Забрать подарок" />
            </Button>
          </div>
        </div>
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/after-party-background.png`}
          className="after-party__background"
          alt=""
        />
      </div>
    </div>
  );
};
