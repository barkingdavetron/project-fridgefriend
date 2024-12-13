import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const CalorieTrackerPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calorie Tracker</Text>
      <Text style={styles.subtitle}>Today's Entries:</Text>
      
     
      <View>
        <Text>• Apple: 95 cal</Text>
        <Text>• Sandwich: 300 cal</Text>
        <Text>• Orange Juice: 110 cal</Text>
      </View>
      
      
      <Text>Total Calories: 505</Text>

    
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Food name" editable={false} />
        <TextInput style={styles.input} placeholder="Calories" editable={false} />
      </View>

     
      <Button title="Add Entry" onPress={() => {}} disabled />
    </View>
  );
};

// Simplified styles
const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 10, 
    backgroundColor: '#fff'
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 10
  },
  subtitle: { 
    fontSize: 16, 
    marginBottom: 10 
  },
  inputContainer: { 
    flexDirection: 'row', 
    marginBottom: 10 
  },
  input: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 8,
    marginHorizontal: 5
  }
});

export default CalorieTrackerPage;
