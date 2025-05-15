export default {
  preset: "ts-jest",
  testEnvironment: "jsdom", // for React DOM APIs in tests
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // for jest-dom
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", //make @ alias work in .test too
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // handle CSS imports in tests
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // transform TS and TSX files with ts-jest
  },
};
