// Import necessary React and React Native components and libraries
import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';  
import { useRouter } from 'expo-router';  // Import useRouter from expo-router for navigation
import { sign_in } from './database';  // Import the sign_in function from the local database file

// Main SignIn functional component
const SignIn = () => {
  // Initialize state variables for email and password inputs
  const [email, setEmail] = useState<string>('');  // useState hook to manage the email input
  const [password, setPassword] = useState<string>('');  // useState hook to manage the password input
  
  const router = useRouter();  // useRouter hook to handle navigation after successful sign-in

  // handleSubmit function to handle sign-in logic asynchronously
  const handleSubmit = async (): Promise<void> => {
    // Check if both email and password are provided if not show an alert
    if (!email || !password) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    try {
      // Call the sign_in function to authenticate the user
      const user = await sign_in(email, password);

      if (user) {
        // If the user is authenticated navigate to the home screen
        router.push('/home');
        Alert.alert("Success", "User logged in");
      } else {
        // If the authentication fails show an error message
        Alert.alert("Error", "Invalid username or password");
      }
    } catch (error) {
      // Log the error to console and show a generic error message
      console.error("Login error:", error);
      Alert.alert("Error", "There was an issue logging in, check your credentials");
    }
  };

  return (
    <View style={styles.container}>
      {/* Render the title */}
      <Text style={styles.title}>Sign in</Text>

      {/* Email input field */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"  // Ensures the correct keyboard type is used
      />
      
      {/* Password input field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry  // Ensures the password is hidden
      />

      {/* Sign-in button triggers handleSubmit function */}
      <Button title="Sign in" onPress={handleSubmit} />
    </View>
  );
};

// Styles for the component, defining layout and appearance
const styles = StyleSheet.create({
  container: {
    flex: 1,  // Fill the entire screen
    justifyContent: 'center',  // Center content vertically
    alignItems: 'center',  // Center content horizontally
    padding: 20,  // Padding around the content
    backgroundColor: '#fff',  // White background color
  },
  title: {
    fontSize: 24,  // Title font size
    fontWeight: 'bold',  // Bold font weight
    marginBottom: 20,  // Space below the title
  },
  input: {
    width: '100%',  // Full width for input fields
    height: 50,  // Height for input fields
    borderColor: '#ccc',  // Border color
    borderWidth: 1,  // Border width
    borderRadius: 5,  // Rounded corners
    paddingLeft: 10,  // Padding for text inside input
    marginBottom: 10,  // Space between input fields
    fontSize: 16,  // Text size inside the input fields
    backgroundColor: '#f0f0f0',  // Background color of the input fields
  },
});

export default SignIn;  // Export the SignIn component for use in other parts of the app
