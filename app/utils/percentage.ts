import is from "@sindresorhus/is";

const REGEX = () => /(\d+)%/;

export function isPercentage(value: any): value is string {
  return is.string(value) && REGEX().test(value);
}

export function parsePercentage(value: string) {
  const num = REGEX().exec(value)?.at(1);
  return Number(num || 0) / 100;
}
