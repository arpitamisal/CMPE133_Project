import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import Categories from '../components/categories';
import Recipes from '../components/recipes';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [defaultRecipes, setDefaultRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setSearchResults([]);
  };

  const handleChangeSearchQuery = (text) => {
    setSearchQuery(text);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      setCategories(response.data.categories);
    } catch (err) {
      console.log('Error:', err.message);
    }
  };

  const getRecipes = async (category = 'Beef') => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      setDefaultRecipes(response.data.meals);
    } catch (err) {
      console.log('Error:', err.message);
    }
  };

  const handleSearch = async () => {
    try {
      if (searchQuery.trim() === '') {
        // Empty search query, do nothing or show a message to the user
        return;
      }
      
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
      setSearchResults(response.data.meals || []);
    } catch (err) {
      console.log('Error:', err.message);
      // Handle error, show error message to the user, etc.
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topBar}>
          <Image source={require('../../assets/images/avatar.png')} style={styles.avatar} />
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.punchline}>Whip Up Magic with What's on Hand at <Text style={styles.greenText}>Home</Text></Text>
        </View>
          {/* Search bar */}
          <View style={styles.searchBar}>
            <TextInput
              placeholder="Search any recipe"
              placeholderTextColor="gray"
              style={styles.input}
              value={searchQuery}
              onChangeText={handleChangeSearchQuery}
            />
            {searchResults.length > 0 && (
              <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
                <Text>Clear</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text>Search</Text>
            </TouchableOpacity>
          </View>
          
          {/* Display search results if available, otherwise render default category recipes */}
          {searchResults.length > 0 ? (
            <View style={styles.searchResultsContainer}>
              <Text style={styles.searchResultsTitle}>Search Results:</Text>
              <Recipes meals={searchResults} />
            </View>
          ) : (
            <View>
              <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={handleChangeCategory} />
              <Recipes meals={defaultRecipes} categories={categories} />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  avatar: {
    height: 30,
    width: 30,
  },
  bellIcon: {
    padding: 5,
  },
  greetingContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#333',
  },
  punchline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  greenText: {
    color: '#77AF54',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    padding: 10,
  },
  searchResultsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  searchResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomeScreen;
