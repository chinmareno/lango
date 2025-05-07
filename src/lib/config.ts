export const isProductionEnvironment = process.env.NODE_ENV === "production";

export const encodedSessionSecret = new TextEncoder().encode(
  process.env.SESSION_SECRET!
);
