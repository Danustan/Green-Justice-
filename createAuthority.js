const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
require("dotenv").config();

(async () => {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const name = "Test Authority";
  const email = "authority@test.com";
  const plainPassword = "123456";

  const hash = await bcrypt.hash(plainPassword, 10);

  await pool.query(
    "INSERT INTO authorities (name, email, password_hash, role) VALUES (?,?,?, 'authority')",
    [name, email, hash]
  );

  console.log("✅ Authority created:", email, "password:", plainPassword);
  process.exit(0);
})();
