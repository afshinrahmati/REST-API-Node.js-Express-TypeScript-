import mongoose, { ConnectionOptions } from "mongoose";
import config from "config";
import {logger} from "../util/logger";
import {error} from "winston";

class MongoAdaptor {

   async init():Promise<void>{
        const productionOptions: ConnectionOptions= {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            autoIndex: false, // Don't build indexes
            poolSize: 10, // Maintain up to 10 socket connections
            bufferMaxEntries: 0,
            connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4, // Use IPv4, skip trying IPv6
        };
        const mongoUrl = config.get<string>("isMongoClient")
        if (!mongoUrl) {
            logger.error(
                `mongo connection string. Set MONGODB_URI environment variable`
            );
            process.exit(1);
        }
          await  mongoose.connect(
                mongoUrl,
                productionOptions
            ).then(()=>{
              console.log(`\x1b[34m MongoDB  Connection Successfully Established! \x1b[0m`);
          }).catch((error)=>{
              console.log(`\x1b[34m MongoDB  Connection ERROR ${error}! \x1b[0m`);

          })
    }

}

export const mongo = new MongoAdaptor().init();

