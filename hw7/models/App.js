import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const App = sequelize.define(
  "App",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Apps",
    timestamps: false,
  }
);

export default App;
