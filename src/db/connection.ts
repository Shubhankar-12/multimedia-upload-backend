import mongoose, { ConnectOptions } from "mongoose";

if (process.env.DB_URI === undefined) {
  throw new Error("DB_URI is missing from process env");
}

const dbUri: string = process.env.DB_URI;
const options: ConnectOptions = {};

export class DataBase {
  private static instance: DataBase | undefined = undefined;
  public connection: mongoose.Connection | undefined;
  /**
   * @return {mongoose.Connection} returns a live connection or throws an error
   */
  private constructor() {
    this.connection = undefined;
  }
  public static getDatabaseConnection(): mongoose.Connection | undefined {
    if (DataBase.instance === undefined) {
      DataBase.instance = new DataBase();
      DataBase.instance.spawnConnection();
    }
    console.log("Database started:");
    return DataBase.instance.connection;
  }
  private spawnConnection(): void {
    mongoose.connect(dbUri, options).catch((err) => {
      console.log("Error Connecting to the database:", err.message);
    });
    this.connection = mongoose.connection;
    this.connection.on("open", () => {
      console.log("Connection established to the database");
    });
    this.connection.on("close", () => {
      console.log("Disconnected!");
    });
    this.connection.on("error", (err) => {
      console.log("DB Error :", err.message);
    });
  }
}
