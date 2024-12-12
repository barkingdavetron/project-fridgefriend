import * as SQLite from 'expo-sqlite';

// Open the database
const openDb = async () => {
  return await SQLite.openDatabaseSync('database.db'); // Open the database asynchronously
};

// Function to create the table if it doesn't exist
const createTable = async () => {
  try {
    const db = await openDb(); // Await the db connection
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
      );
    `);
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

// Function to register a user
export const registerUser = async (username: string, email: string, password: string) => {
  try {
    const db = await openDb(); // Open the database asynchronously
    // Ensure the table is created before inserting a user
    await createTable();

    // Use named parameters (following the Expo SQLite documentation approach)
    const result = await db.runAsync(
      'INSERT INTO users (username, email, password) VALUES ($username, $email, $password)',
      {
        $username: username,
        $email: email,
        $password: password
      }
    );

    console.log("User registered:", result);
  } catch (error) {
    console.error("Error inserting user:", error);
    throw new Error("Error inserting user into the database");
  }
};

// Sign in function to verify user credentials
export const sign_in = async (username: string, password: string) => {
  try {
    const db = await openDb(); // Open the database asynchronously

    // Execute SQL query to find a user by username and password
    const result = await db.getAllSync(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    // Check if user exists
    if (result) {
      return result; // Return user details
    } else {
      return null; // No user found
    }
  } catch (error) {
    console.error('Error querying the database:', error);
    throw error; // Rethrow error for handling
  }
};
