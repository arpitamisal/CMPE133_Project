// DetailedRecipe.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { ArrowLeftIcon, HeartIcon, ClockIcon, UserGroupIcon, FireIcon } from 'react-native-heroicons';
//import { YouTubePlayer } from '@react-native-youtube-player/core';

const DetailedRecipe = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async (id) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setMeal(data.meals[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <ArrowLeftIcon width={24} height={24} color="#2E8B57" />
            </TouchableOpacity>
            <Image source={{ uri: meal.strMealThumb }} style={styles.recipeImage} />
            <View style={styles.detailsContainer}>
              <Text style={styles.recipeTitle}>{meal.strMeal}</Text>
              <View style={styles.infoContainer}>
                <ClockIcon width={24} height={24} color="#2E8B57" />
                <Text style={styles.infoText}>35 mins</Text>
              </View>
              <View style={styles.infoContainer}>
                <UserGroupIcon width={24} height={24} color="#2E8B57" />
                <Text style={styles.infoText}>03 Servings</Text>
              </View>
              <View style={styles.infoContainer}>
                <FireIcon width={24} height={24} color="#2E8B57" />
                <Text style={styles.infoText}>103 Cal</Text>
              </View>
              <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} style={styles.favoriteButton}>
                <HeartIcon width={24} height={24} color={isFavourite ? '#FF0000' : '#2E8B57'} />
              </TouchableOpacity>
              <Text style={styles.ingredientsTitle}>Ingredients:</Text>
              <Text style={styles.ingredientsList}>{meal.strIngredient1} - {meal.strMeasure1}</Text>
              <Text style={styles.ingredientsList}>{meal.strIngredient2} - {meal.strMeasure2}</Text>
              {/* Add more ingredients here */}
              <Text style={styles.instructionsTitle}>Instructions:</Text>
              <Text style={styles.instructionsText}>{meal.strInstructions}</Text>
              {meal.strYoutube && (
                <View style={styles.videoContainer}>
                  <Text style={styles.videoTitle}>Recipe Video:</Text>
                  <YouTubePlayer
                    height={200}
                    videoId={getYoutubeVideoId(meal.strYoutube)}
                    play={false}
                    onChangeState={() => {}}
                  />
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    paddingBottom: 30,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#2E8B57',
    marginLeft: 5,
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  ingredientsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginTop: 20,
    marginBottom: 10,
  },
  ingredientsList: {
    fontSize: 16,
    color: '#2E8B57',
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginTop: 20,
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 16,
    color: '#2E8B57',
  },
  videoContainer: {
    marginTop: 20,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 10,
  },
});

export default DetailedRecipe;
