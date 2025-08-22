import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import configData from "./config.js";

dotenv.config();

const config = configData[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

export default sequelize;
