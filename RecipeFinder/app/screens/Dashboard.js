// HomeScreen.js
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
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
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
      setMeals(response.data.meals);
    } catch (err) {
      console.log('Error:', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topBar}>
          <Image source={require('../../assets/images/avatar.png')} style={styles.avatar} />
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.punchline}> Whip up Magic with whats on hand <Text style={styles.greenText}>home</Text></Text>
        </View>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor="gray"
            style={styles.input}
          />
        </View>
        <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={handleChangeCategory} />
        <Recipes meals={meals} categories={categories} />
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
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
});

export default HomeScreen;