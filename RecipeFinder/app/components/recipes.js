import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function Recipes({ meals, categories }) {

  const navigation = useNavigation();

  return (
    <View style={{ marginHorizontal: 16, marginTop: 12, marginBottom: 24 }}>
      <Text style={{ fontSize: hp(3), fontWeight: 'bold', color: '#333' }}>Recipes</Text>
      <View style={{ width: '100%', marginTop: 12 }}>
        {meals ? (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => <RecipeCard item={item} index={index} navigation={navigation}/>}
            onEndReachedThreshold={0.1}
          />
        ) : (
          <Text>No recipes found</Text>
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index, navigation }) => {
  let isEven = index % 2 === 0;
  return (
    <Pressable
      style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0, marginBottom: 16 }}
      onPress={() => navigation.navigate('RecipeDetailScreen', {...item})}
    >
      <Image
        source={{ uri: item.strMealThumb }}
        style={{ width: '100%', height: index % 2 === 0 ? hp(25) : hp(35), borderRadius: 10 }}
      />
      <Text style={{ fontSize: hp(1.5), fontWeight: 'bold', marginTop: 8, color: '#333' }}>
        {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
      </Text>
    </Pressable>
  );
};