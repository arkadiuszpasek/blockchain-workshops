export function shorten(input: string) {
  const n = 4;
  if (input.length <= 2 * n) {
    return input;
  }

  const firstPart = input.slice(0, n);
  const lastPart = input.slice(-n);

  return `${firstPart}...${lastPart}`;
}
