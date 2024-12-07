export const PATHS = {
  HOME: "/",
  BUSINESSES: "/businesses",
  SUGGESTIONS: "/suggestions",
} as const;

export type PathsType = typeof PATHS;
