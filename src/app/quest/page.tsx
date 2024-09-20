"use client";

import { Text } from "@/components/Text";
import { useAuth } from "@/context/AuthContext";
import { classNames, string } from "@telegram-apps/sdk";
import { Button } from "@/components/Button";

import "./styles.scss";
import { Input } from "@/components/Input";
import { useState } from "react";
import usePersistentState from "@/hooks/usePersistentState";
import { QuestPaywall } from "@/components/QuestPaywall";
import { authService } from "@/services/auth";

export default function QuestPage() {
  const { questsData, completeQuest } = useAuth();
  const [code, setCode] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | undefined>();
  const [isQuestPaywallShowing, setIsQuestPaywallShowing] =
    usePersistentState<boolean>("als-quest-paywall", true);

  const onSetCode = (value: string) => {
    if (value.length === 4) {
      const isAlreadySubmitted =
        questsData?.findIndex(
          (item) => item.code === value && item.completed
        ) !== -1;

      if (isAlreadySubmitted) {
        setError(true);
        setErrorText("Код уже был использован");
        return;
      }

      authService.submitQuest(value).then((result) => {
        if (!result || !result.success) {
          setError(true);
          setErrorText("Код неправильный");
          return;
        }

        completeQuest(result.quest_id, value);
        setCode("");
        setError(false);
        setErrorText(undefined);
      });
    } else {
      setCode(value);
      setError(false);
      setErrorText(undefined);
    }
  };

  if (isQuestPaywallShowing) {
    return <QuestPaywall onComplete={() => setIsQuestPaywallShowing(false)} />;
  }

  return (
    <div className="page quest">
      <Text
        title="Залутай скидку или мерч выполняя задания на&nbsp;вечеринке"
        titleSize="h3"
      />
      <Input
        value={code}
        name="quest"
        setValue={() => {}}
        onChange={onSetCode}
        error={error}
        text={errorText || "Введи код который нашел"}
      />
      <div className="quest__buttons-container">
        {questsData?.map((item, index) => (
          <Button
            className={classNames("quest__button", {
              completed: item.completed,
            })}
            key={index}
          >
            <Text title={item.title} />
          </Button>
        ))}
      </div>
    </div>
  );
}
