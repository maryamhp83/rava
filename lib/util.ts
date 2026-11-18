export { cn } from "cn";
export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
