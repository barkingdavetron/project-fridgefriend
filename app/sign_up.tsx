// Import necessary React and React Native components and libraries
import React, { useState } from 'react'; // useState for state management
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'; 
import { registerUser } from './database'; // Import the registerUser function to interact with the database

// SignUp component definition
const SignUp = () => {
  // State hooks to manage the input values for username, email, and password
  const [username, setUsername] = useState<string>('');  // For storing username input
  const [email, setEmail] = useState<string>('');        // For storing email input
  const [password, setPassword] = useState<string>('');  // For storing password input

  // handleSubmit function to validate and submit the data
  const handleSubmit = async (): Promise<void> => {
    // Validation check to ensure all fields are filled
    if (!username || !email || !password) {
      // Show an alert if any field is empty
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    try {
      // Call the registerUser function to handle user registration 
      await registerUser(username, email, password);
      // If registration is successful show  alert
      Alert.alert("Success", "User registered successfully");
    } catch (error) {
      // Catch  log any errors then show  alert
      console.error("Registration error:", error);
      Alert.alert("Error", "There was an issue registering the user");
    }
  };

  return (
    // Main container for the SignUp screen
    <View style={styles.container}>
      {/* Title of the screen */}
      <Text style={styles.title}>Sign Up</Text>

      {/* Input fields for username, email, and password */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        // Update the state with the user's input
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        // Update the state with the email input
        onChangeText={setEmail}
        keyboardType="email-address"  // Ensures the email input uses the appropriate keyboard
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        // Update the state with the password input
        onChangeText={setPassword}
        secureTextEntry // Ensures password input is hidden
      />

      {/* Button to trigger the handleSubmit function on press */}
      <Button title="Sign Up" onPress={handleSubmit} />
    </View>
  );
};

// Styles for the components using StyleSheet.create
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up all available space
    justifyContent: 'center', // Vertically center content
    alignItems: 'center', // Horizontally center content
    padding: 20, // Padding around the content
    backgroundColor: '#fff', // White background for the sign-up page
  },
  title: {
    fontSize: 24, // Title font size
    fontWeight: 'bold', // Bold title
    marginBottom: 20, // Space between title and input fields
  },
  input: {
    width: '100%', // Input fields take up full width
    height: 50, // Height for each input field
    borderColor: '#ccc', // Light gray border color
    borderWidth: 1, // Border width for input fields
    borderRadius: 5, // Rounded corners for the input fields
    paddingLeft: 10, // Padding for text inside the input fields
    marginBottom: 10, // Space between each input field
    fontSize: 16, // Font size for text inside input fields
    backgroundColor: '#f0f0f0', // Light gray background for input fields
  },
});

// Export the SignUp component to be used in other parts of the app
export default SignUp;
