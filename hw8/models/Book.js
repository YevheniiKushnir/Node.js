import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "unique_title_author",
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "unique_title_author",
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {},
    },
  },
  {
    tableName: "Books",
  }
);

export default Book;
