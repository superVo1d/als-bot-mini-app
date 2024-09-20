import { classNames } from "@telegram-apps/sdk";
import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import { Text } from "../Text";

import "./styles.scss";

interface IInput
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  className?: string;
  value?: string;
  setValue: (e: string) => void;
  error?: boolean;
  text?: string;
  length?: number;
  name: string;
  onChange?: (value: string) => void;
}

const Input: FC<IInput> = ({
  className,
  value,
  setValue,
  name,
  error = false,
  text,
  length = 4,
  onChange,
}) => {
  const [pin, setPin] = useState<string[]>(Array(length).fill(""));

  useEffect(() => {
    const newPin = (value?.split("") || []).slice(0, length);
    setPin(newPin.concat(Array(length - newPin.length).fill("")));
    if (value === "") {
      (document.getElementById(`${name}-0`) as HTMLInputElement).focus();
    }
  }, [value, length]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;

    setPin(newPin);

    if (value !== "" && index < length - 1) {
      (
        document.getElementById(`${name}-${index + 1}`) as HTMLInputElement
      )?.focus();
    }

    if (onChange) {
      onChange(newPin.join(""));
    }

    if (newPin.every((digit) => digit !== "")) {
      setValue(newPin.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      (
        document.getElementById(`${name}-${index - 1}`) as HTMLInputElement
      )?.focus();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    (document.getElementById(`${name}-0`) as HTMLInputElement)?.focus();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className={classNames(className, "input", { input_error: error })}>
      <div className="input__input" onClick={handleClick}>
        {pin.map((_, index) => (
          <input
            key={index}
            id={`${name}-${index}`}
            type="text"
            onFocus={handleFocus}
            value={pin[index]}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            placeholder="&#8226;"
          />
        ))}
      </div>
      {text && <Text className="input__text" text={text} textSize="caption" />}
    </div>
  );
};

export { Input };
