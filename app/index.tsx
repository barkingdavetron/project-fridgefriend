// Import necessary React and React Native components and libraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// HomeScreen component definition
const HomeScreen = () => {
  // Initialize the router  for navigation
  const router = useRouter();

  return (
    // Main container of the screen, styled to center content
    <View style={styles.container}>
      
      {/* Touchable button for Sign In, triggers navigation to the /sign_in screen */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/sign_in')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Touchable button for Sign Up, triggers navigation to the /sign_up screen */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/sign_up')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

    </View>
  );
};

// Styles for the components using StyleSheet.create
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up all available space
    justifyContent: 'center', // Vertically centers the content
    alignItems: 'center', // Horizontally centers the content
    backgroundColor: '#f0f0f0', // Light gray background color
  },
  button: {
    backgroundColor: '#0072ff', // Blue background for the button
    paddingVertical: 12, // Vertical padding inside the button
    paddingHorizontal: 20, // Horizontal padding inside the button
    borderRadius: 8, // Rounded corners for the button
    marginVertical: 10, // Vertical margin between buttons
  },
  buttonText: {
    color: '#fff', // White text color for button labels
    fontSize: 16, // Font size for the button text
  },
});

// Export the HomeScreen component to be used in other parts of the app
export default HomeScreen;
