import * as SQLite from 'expo-sqlite';  // Importing SQLite from Expo to work with local databases

// Open the database function (asynchronous)
const openDb = async () => {
  return await SQLite.openDatabaseSync('database.db');  // Open the SQLite database (synced version)
};

// Function to create the users table if it doesn't already exist
const createTable = async () => {
  try {
    const db = await openDb();  // Await the database connection
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,  // Auto-incrementing primary key for user ID
        username TEXT NOT NULL,  // User's username (must not be null)
        email TEXT NOT NULL,  // User's email (must not be null)
        password TEXT NOT NULL  // User's password (must not be null)
      );
    `);
  } catch (error) {
    console.error("Error creating table:", error);  // Log any errors that occur while creating the table
  }
};

// Function to register a new user by inserting data into the database
export const registerUser = async (username: string, email: string, password: string) => {
  try {
    const db = await openDb();  // Open the database asynchronously
    await createTable();  // Ensure that the users table is created before inserting data

    // Insert the new user's details into the database
    const result = await db.runAsync(
      'INSERT INTO users (username, email, password) VALUES ($username, $email, $password)',
      {
        $username: username,  // Using named parameters for safer SQL execution
        $email: email,
        $password: password
      }
    );

    console.log("User registered:", result);  // Log the result of the insertion
  } catch (error) {
    console.error("Error inserting user:", error);  // Log any errors that occur while inserting the user
    throw new Error("Error inserting user into the database");  // Throw an error for further handling
  }
};

// Function to handle user sign-in by verifying username and password
export const sign_in = async (username: string, password: string) => {
  try {
    const db = await openDb();  // Open the database asynchronously

    // Query the database to find a user that matches the provided username and password
    const result = await db.getAllSync(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]  // Passing the parameters for username and password safely
    );

    // If the user exists return their details otherwise return null
    if (result) {
      return result;  // Return the user details
    } else {
      return null;  // No user found with the given credentials
    }
  } catch (error) {
    console.error('Error querying the database:', error);  // Log any errors that occur during the query
    throw error;  // Rethrow the error for further handling
  }
};
