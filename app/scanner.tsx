import React, { useState } from 'react';  // Importing React and the useState hook to manage state
import { View, Button, Image, StyleSheet } from 'react-native';  // Importing core components from React Native for UI
import * as ImagePicker from 'expo-image-picker';  // Importing ImagePicker from Expo to enable image selection

export default function App() {
  // State to store the URI of the image picked by the user, initialized to null
  const [image, setImage] = useState<string | null>(null);
  
  // Function to allow the user to pick an image or take a photo
  const pickImage = async () => {
    // Requesting camera permissions from the user
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      // If permission is denied, alert the user
      alert('Permission to access camera is required!');
      return;
    }

    // If permission is granted, open the camera to take a photo
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,  // Allow the user to edit the photo
      aspect: [4, 3],  // Define aspect ratio for the image
      quality: 1,  // Set photo quality to maximum
    });

    // If the user took a photo and didn't cancel, save the image URI in the state
    if (!result.canceled) {
      setImage(result.assets[0].uri);  // Set the URI of the first image asset (since the result might contain multiple)
    }
  };

  return (
    <View style={styles.container}>  // Main container for the layout
      {/* Button to trigger the image picker when pressed */}
      <Button title="Take a Picture" onPress={pickImage} />
      
      {/* Conditionally render the image if it's available */}
      {image && <Image source={{ uri: image }} style={styles.image} />}  // Display the picked image
    </View>
  );
}

// Styling for the components, centered layout with image size
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // Center content vertically
    alignItems: 'center',  // Center content horizontally
  },
  image: {
    width: 300,  // Set the width of the displayed image
    height: 300,  // Set the height of the displayed image
    marginTop: 20,  // Add some space above the image
  },
});
