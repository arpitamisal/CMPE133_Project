import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';

export default function Recipes({categories, meals}) {
    const navigation = useNavigation();

    return (
        <View style={{ marginHorizontal: 16, marginTop: 12, marginBottom: 24 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>Recipes</Text>
            <View style={{ width: '100%', marginTop: 12 }}>
                {categories.length > 0 && meals.length > 0 ? (
                    <MasonryList
                        data={meals}
                        keyExtractor={(item) => item.idMeal.toString()}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <RecipeCard item={item} index={index} navigation={navigation} />
                        )}
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
            style={{
                width: '100%',
                paddingLeft: isEven ? 0 : 8,
                paddingRight: isEven ? 8 : 0,
                marginBottom: 16,
            }}
            onPress={() => navigation.navigate('RecipeDetail', { ...item })}
        >
            <Image
                source={{ uri: item.strMealThumb }}
                style={{
                    width: '100%',
                    height: index % 2 === 0 ? 150 : 200,
                    borderRadius: 10,
                }}
            />
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginTop: 8,
                    color: '#333',
                    textAlign: 'center',
                }}
            >
                {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
            </Text>
        </Pressable>
    );
};
