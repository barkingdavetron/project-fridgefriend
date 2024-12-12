import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
//image picker syntax source
export default function App() {
  const [image, setImage] = useState<string | null>(null);
  
  // Function to pick an image or take a photo
  const pickImage = async () => {
    // Request camera permissions
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera is required!');
      return;
    }

    // Let the user take a photp
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Check if the result was not canceled and assign the image URI
    if (!result.canceled) {
      setImage(result.assets[0].uri);  // result.assets[0].uri contains the image URI
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take a Picture" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});
