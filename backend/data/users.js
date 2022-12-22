const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Trung Hieu",
    email: "hieu@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = { users };
