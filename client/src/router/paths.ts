export const PATHS = {
  HOME: "/",
  BUSINESSES: "/businesses",
  NAICS: "/naics",
} as const;

export type PathsType = typeof PATHS;
