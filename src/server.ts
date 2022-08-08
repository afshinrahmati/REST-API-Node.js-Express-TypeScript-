import app from "./app";
import config from "config";
import { mongo } from "./adaptors/mongo";
import { routes } from "./adaptors/routing";

const server = app.listen(app.get("port"), async () => {
  await mongo;
  app.listen(config.get<string>("port"), () => {
    
    console.log(`\x1b[31m Welcome to the app! ${config.get("port")} \x1b[0m`);
  });
  routes(app);
});

export default server;
