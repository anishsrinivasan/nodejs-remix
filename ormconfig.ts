import { DB } from "./src/config";
const { DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DATABASE } = DB;

export default [
  {
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
    charset: "utf8mb4_unicode_ci", // Allows Emoji
    synchronize: false, // False by Default to Avoid Migration Sync with Entity Changes
    migrationsRun: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  },
];
