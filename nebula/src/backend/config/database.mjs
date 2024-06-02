import pgPromise from "pg-promise";
const pgp = pgPromise();
const db = pgp("postgres://postgres:postgres@localhost:5432/nebulaDB");

const setupDb = async () => {
  await db.none(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      token TEXT
    )
  `);
  await db.none(`
    CREATE TABLE IF NOT EXISTS bookings (
      id VARCHAR(36) PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      adults INT NOT NULL,
      children INT NOT NULL,
      baggages INT NOT NULL,
      selectedOption VARCHAR(255) NOT NULL,
      selectedDate DATE NOT NULL,
      totalPrice DECIMAL(10, 2) NOT NULL
    )
  `);
};
const database = {
  db,
  setupDb
};

export default database;
