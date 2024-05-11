import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from 'react'
import { StatusBar } from "expo-status-bar";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

export default function DetailedRecipe(props) {
  let item = props.route.params;
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    getMealData(item.idMeal);
  },[])

  const getMealData = async (id) => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setMeal(response.data.meals[0]);
    } catch (err) {
      console.log('Error:', err.message);
    }
  };

  const ingredientsIndexes = (meal)=>{
    if(!meal) return [];
    let indexes = [];
    for(let i = 1; i<=20; i++){
        if(meal['strIngredient'+i]){
            indexes.push(i);
        }
    }

    return indexes;
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Status bar */}
        <StatusBar style="light" />
        {/* Image */}
        <View>
          <Image
            source={{ uri: item.strMealThumb }}
            style={{ width: '95%', height: 200, borderRadius: 20, marginLeft: '2.5%' }}
          />
        </View>
        {/* Main content */}
        <View style={{ paddingHorizontal: 20, justifyContent: 'space-between', paddingTop: 32 }}>
          {/* Name and area */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>{item.strMeal}</Text>
            <Text style={{ fontSize: 18, color: '#666' }}>{item.strArea}</Text>
          </View>
          {/* Misc */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
            {/* Clock Icon */}
            <View style={{ alignItems: 'center' }}>
              <Image source={require('../../assets/clock.png')} style={{ height: 65, width: 65 }} />
              <View style={{ alignItems: 'center', paddingTop: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>35</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>Mins</Text>
              </View>
            </View>
            {/* Users Icon */}
            <View style={{ alignItems: 'center' }}>
              <Image source={require('../../assets/serving.png')} style={{ height: 65, width: 65 }} />
              <View style={{ alignItems: 'center', paddingTop: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>03</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>Servings</Text>
              </View>
            </View>
            {/* Fire Icon */}
            <View style={{ alignItems: 'center' }}>
              <Image source={require('../../assets/Calorie.png')} style={{ height: 65, width: 65 }} />
              <View style={{ alignItems: 'center', paddingTop: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>340</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>Cal</Text>
              </View>
            </View>
          </View>

          {/* Ingredients */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>Ingredients</Text>
            <View style={{ marginTop: 10 }}>
              {ingredientsIndexes(meal).map((i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <View style={{ height: 18, width: 18, backgroundColor: '#77AF54', borderRadius: 9 }} />
                  <View style={{ marginLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{meal['strMeasure'+i]}</Text>
                    <Text style={{ fontSize: 18, color: '#666' }}>{meal['strIngredient'+i]}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Instructions */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>Instructions</Text>
            {/* Split the instructions by newline characters and map over the resulting array */}
            {meal?.strInstructions.split('\n').filter(line => line.trim() !== '').map((line, index) => (
            // Render each line as a separate Text component with marginTop for spacing
            <Text key={index} style={{ fontSize: 18, color: '#666', marginTop: index === 0 ? 10 : 5 }}>
              {line}
            </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}