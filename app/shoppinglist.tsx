import React from 'react';
import { Text, View, StyleSheet  } from 'react-native';





export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
    </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  text: {
    fontSize: 24, // Text size
    fontWeight: 'bold', // Bold text
    color: '#333', // Text color
  },
});
