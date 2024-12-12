import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

// Your Spoonacular API Key
const API_KEY = '528ac505cbdc4e7bacbaafb772d4062e';
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

const RecipeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to search recipes
  const searchRecipes = async () => {
    if (!searchTerm) {
      alert('Please enter a search term!');
      return;
    }

    setIsLoading(true);
    setError(null); // Reset error

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          query: searchTerm,
          apiKey: API_KEY,
        },
      });

      setRecipes(response.data.results); // Store recipes in the state
    } catch (error) {
      setError('Failed to fetch recipes. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search input field */}
      <TextInput
        style={styles.input}
        placeholder="Search for potato recipes"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      
      {/* Button to trigger the search */}
      <Button title="Search Recipes" onPress={searchRecipes} />
      
      {/* Loading state */}
      {isLoading && <Text>Loading...</Text>}

      {/* Error state */}
      {error && <Text style={styles.error}>{error}</Text>}

      {/* List of recipes */}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recipeItem}>
            <Text style={styles.recipeTitle}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  recipeItem: {
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default RecipeSearch;
