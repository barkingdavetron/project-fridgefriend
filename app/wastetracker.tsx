import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

const WasteTrackerPage = () => {
  // State to store the items and their expiration dates
  const [items] = useState([
    { name: 'Tomatoes', expirationDate: '2024-12-15' },
    { name: 'Lettuce', expirationDate: '2024-12-18' },
    { name: 'Cheese', expirationDate: '2024-12-20' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waste Tracker</Text>
      <Text style={styles.subtitle}>Items Nearing Expiration:</Text>
      
      
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.itemText}>• {item.name} - Expiry: {item.expirationDate}</Text>
        )}
      />
      
      <Button 
        title="Manage Expiration" 
        onPress={() => {}} // Button does nothing
        disabled={true} // Disabled button to simulate non-functionality
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

export default WasteTrackerPage;
