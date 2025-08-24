import bcrypt from "bcrypt";

const users = [
  {
    id: 1,
    username: "alice",
    email: "alice@example.com",
    password: await bcrypt.hash("password123", 10),
    role: "admin",
  },
  {
    id: 2,
    username: "bob",
    email: "bob@example.com",
    password: await bcrypt.hash("qwerty456", 10),
    role: "user",
  },
  {
    id: 3,
    username: "carol",
    email: "carol@example.com",
    password: await bcrypt.hash("secret789", 10),
    role: "user",
  },
  {
    id: 4,
    username: "dave",
    email: "dave@example.com",
    password: await bcrypt.hash("mypassword", 10),
    role: "user",
  },
  {
    id: 5,
    username: "eve",
    email: "eve@example.com",
    password: await bcrypt.hash("1234abcd", 10),
    role: "user",
  },
];

export default users;
