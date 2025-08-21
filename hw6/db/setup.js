import connection from "./db.js";

// Создайте таблицу `products` с полями:

// `id` — уникальный идентификатор продукта (целое число с автоинкрементом).

// `name` — название продукта (строка).

// `price` — цена продукта (десятичное число).

const createTableProducts = `
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL
  )
`;

connection.query(createTableProducts, (err) => {
  if (err) throw new Error();
  console.log("Table products has been created");
});
