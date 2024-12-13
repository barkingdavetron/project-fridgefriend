import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

const ShoppingListPage = () => {
 
  const [missingItems] = useState<string[]>([
    'Tomatoes', 'Lettuce', 'Cheese'
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <Text style={styles.subtitle}>Missing Items:</Text>
      
    
      <FlatList
        data={missingItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.itemText}>• {item}</Text>
        )}
      />
      
      <Button 
        title="Add Item" 
        onPress={() => {}} 
    
      />
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
  itemText: { 
    fontSize: 16,
    marginBottom: 5
  },
});

export default ShoppingListPage;
