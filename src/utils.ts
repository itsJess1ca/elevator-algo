export function difference(num1: number, num2: number) {
  return Math.abs(num1 - num2);
}

export function wait(timeMs: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMs);
  })
}
export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}