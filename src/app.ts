import { envs } from "./config";
import { MongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect({ dbName: envs.MONGO_DB_NAME, mongoUrl: envs.MONGO_URL });

  // Todo: Inicio Server
  new server({ port: envs.PORT, routes: AppRoutes.routes }).start();
}
