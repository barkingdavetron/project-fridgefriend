import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { sign_in } from './database'; // Import the sign_in function from the database file

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter(); // Use router for navigation

  const handleSubmit = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    try {
      const user = await sign_in(email, password);

      if (user) {
        // Navigate to the home screen upon successful login
        router.push('/home');
        Alert.alert("Success", "User logged in");
      } else {
        Alert.alert("Error", "Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "There was an issue logging in, check your credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Sign in" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#f0f0f0',
  },
});

export default SignIn;
