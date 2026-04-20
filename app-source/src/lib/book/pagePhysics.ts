export function clampFlip(value: number): number {
  return Math.max(0, Math.min(1, value));
}

export function flipRotation(progress: number): number {
  return Math.PI * clampFlip(progress);
}
