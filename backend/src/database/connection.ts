import { Database } from "sqlite3";
const sqlite3 = require("sqlite3").verbose();
import { startApplication } from "../";

export const db: Database = new sqlite3.Database(
  "./database/data.db",
  sqlite3.OPEN_READWRITE,
  (err: Error) => {
    if (err) {
      return console.log(
        "Failed to connect to ./database/data.db...",
        err.message
      );
    }
    console.log("Connected to ./database/data.db");
    startApplication();
  }
);

export function connectToDatabaseAndStartApplication(): void {
  /**
   * Using of db to kickstart connection.
   * Once sqlite3 has connected successfully,
   * it starts the application with callback function.
   */
  db;
}
