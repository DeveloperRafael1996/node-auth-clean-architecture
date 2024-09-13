import mongoose from "mongoose";

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(option: Options) {
    const { mongoUrl, dbName } = option;

    try {
      await mongoose.connect(mongoUrl, { dbName: dbName });
      console.log("Success Conection");
      return true;
    } catch (error) {
      console.log("Mongo Error Conection");
      throw error;
    }
  }
}
