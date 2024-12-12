import React, { useState } from 'react'; // Importing React and useState hook for managing state
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native'; // Importing components from React Native
import axios from 'axios'; // Importing Axios for making API requests


const API_KEY = '528ac505cbdc4e7bacbaafb772d4062e'; // Define Spoonacular API key 
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch'; // Base URL for Spoonacular's complex search API

const RecipeSearch = () => {
  // State hooks for handling the search term recipes loading state and errors
  const [searchTerm, setSearchTerm] = useState(''); // Stores the search query entered by the user
  const [recipes, setRecipes] = useState<any[]>([]); // Stores the list of recipes returned by the API
  const [isLoading, setIsLoading] = useState(false); // Tracks whether data is still loading
  const [error, setError] = useState<string | null>(null); // Stores any error message that occurs during the fetch

  // Function to search recipes using the Spoonacular API
  const searchRecipes = async () => {
    if (!searchTerm) { // Check if search term is empty
      alert('Please enter a search term!'); // Show alert if no search term is entered
      return;
    }

    setIsLoading(true); // Set loading to true when API request is about to begin
    setError(null); // Reset any previous error messages

    try {
      // Make the API request to Spoonacular
      const response = await axios.get(BASE_URL, {
        params: { // Set query parameters for the API request
          query: searchTerm, // Search term entered by the user
          apiKey: API_KEY, // API key for authentication
        },
      });

      setRecipes(response.data.results); // Save the fetched recipes to state
    } catch (error) {
      setError('Failed to fetch recipes. Please try again later.'); // Set error message if the API request fails
    } finally {
      setIsLoading(false); // Set loading to false when API request is complete
    }
  };

  return (
    <View style={styles.container}> {/* Container to hold the components */}
      {/* Search input field */}
      <TextInput
        style={styles.input}
        placeholder="Search for potato recipes" // Placeholder text for the input field
        value={searchTerm} // Controlled input: value comes from state
        onChangeText={setSearchTerm} // Updates search term on input change
      />
      
      {/* Button to trigger the search */}
      <Button title="Search Recipes" onPress={searchRecipes} /> {/* On press call searchRecipes */}

      {/* Loading state */}
      {isLoading && <Text>Loading...</Text>} {/* Display loading text while fetching */}

      {/* Error state */}
      {error && <Text style={styles.error}>{error}</Text>} {/* Display error message if there’s an issue */}

      {/* List of recipes */}
      <FlatList
        data={recipes} // Data passed to FlatList for rendering
        keyExtractor={(item) => item.id.toString()} // Unique key for each recipe (ID)
        renderItem={({ item }) => ( // Rendering each item in the list
          <View style={styles.recipeItem}> {/* Style for each recipe item */}
            <Text style={styles.recipeTitle}>{item.title}</Text> {/* Display recipe title */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { // Styles for the main container
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: { // Styles for the input field
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  recipeItem: { // Styles for each recipe item in the list
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  recipeTitle: { // Styles for the recipe title
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: { // Styles for error messages
    color: 'red',
    marginBottom: 20,
  },
});

export default RecipeSearch; // Export the component for use in other parts of the app
