import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export default function Categories({ categories, activeCategory, setActiveCategory }) {
  return (

      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {categories.map((cat, index) => {
            let isActive = cat.strCategory === activeCategory;
            let activeButtonStyle = isActive ? styles.activeButton : null;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveCategory(cat.strCategory)}
                style={[styles.categoryItem, activeButtonStyle]}
              >
                <View style={styles.imageContainer}>
                  <TouchableOpacity
                    style={styles.imageButton}
                    onPress={() => setActiveCategory(cat.name)}
                  >
                    <Image source={{ uri: cat.strCategoryThumb }} style={styles.image} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.categoryName}>{cat.strCategory}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 80,
    marginTop: 10,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
    
  },
  categoryItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 15,
  },
  imageContainer: {
    width: heightPercentageToDP(6),
    height: heightPercentageToDP(6),
    borderRadius: heightPercentageToDP(6) / 2,
    overflow: 'hidden',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryName: {
    fontSize: heightPercentageToDP(1.6),
    color: '#666',
  },
  activeButton: {
    // Define styles for active button (e.g., change background color)
    backgroundColor: 'lightgreen',
  },
});