import React, { useEffect, useState } from "react";
import axios from 'axios';
import Categories from '../components/categories';
import Recipes from '../components/recipes';
import { View, TextInput, Text, ImageBackground, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, StyleSheet, SafeAreaView, ScrollView } from "react-native";

export default function Dashboard() {

  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(()=>{
    getCategories();
    getRecipes();
  },[])

  const handleChangeCategory = category=>{
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }
  
  const getCategories = async ()=>{
    try{
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      if(response && response.data){
        setCategories(response.data.categories);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }

  const getRecipes = async (category="Beef")=>{
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if(response && response.data){
        setMeals(response.data.meals);
      } 
    }catch(err){
      console.log('error: ',err.message);
    }
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {/* Tagline */}
          <Text style={styles.tagline}>Whip Up Magic with What's on Hand</Text>

          {/* Searchbar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#999"
            />
          </View>

          {/* Categories */}
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={handleChangeCategory}
            />
          )}

          {/* Recipes */}
          
          <Recipes meals={meals} categories={categories} />
          

          {/* Other components for your Dashboard */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  tagline: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchContainer: {
    width: "80%",
    alignItems: "center", // Center the search input horizontally
  },
  searchInput: {
    width: "100%", // Set width to 100% within the search container
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  // Add more styles as needed
});
