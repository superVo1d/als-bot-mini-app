export const pluralize = (
  number: number,
  singular: string,
  few: string,
  many: string
): string => {
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${number}&nbsp;${many}`;
  }

  if (lastDigit === 1) {
    return `${number}&nbsp;${singular}`;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return `${number}&nbsp;${few}`;
  } else {
    return `${number}&nbsp;${many}`;
  }
};
