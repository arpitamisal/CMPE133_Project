import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import storage from '../helpers/storage.js';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PantryPage = () => {
    const navigation = useNavigation();
    const [ingredients, setIngredients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredIngredients, setFilteredIngredients] = useState([]);

    useEffect(() => {
        loadQuantityFromStorage();
        fetchIngredients();

        return () => {
            saveQuantityToStorage();
        };
    }, []);

    const fetchIngredients = async () => {
        try {
            const response = await axios.get('https://themealdb.com/api/json/v1/1/list.php?i=list');
            setIngredients(response.data.meals || []);
            setFilteredIngredients(response.data.meals || []);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
        }
    };

    const loadQuantityFromStorage = () => {
        storage.load({
            key: 'pantryIngredients',
            autoSync: true,
            syncInBackground: true,
        }).then(data => {
            setIngredients(data);
            setFilteredIngredients(data);
        }).catch(error => {
            console.error('Error loading ingredients from storage:', error);
        });
    };

    const saveQuantityToStorage = () => {
        storage.save({
            key: 'pantryIngredients',
            data: ingredients,
            expires: null,
        }).catch(error => {
            console.error('Error saving ingredients to storage:', error);
        });
    };

    const handleQuantityChange = (index, quantity) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index].quantity = quantity;
        setIngredients(updatedIngredients);
    };

    const handleIncrement = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index].quantity++;
        setIngredients(updatedIngredients);
    };

    const handleDecrement = (index) => {
        const updatedIngredients = [...ingredients];
        if (updatedIngredients[index].quantity > 0) {
            updatedIngredients[index].quantity--;
            setIngredients(updatedIngredients);
        }
    };

    const handleGoBack = () => {
        saveQuantityToStorage();
        navigation.goBack();
    };

    const handleSearch = () => {
        const filtered = ingredients.filter(ingredient =>
            ingredient.strIngredient.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredIngredients(filtered);
    };

    const handleClear = () => {
        setSearchQuery('');
        setFilteredIngredients(ingredients);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Pantry</Text>
                <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
                    <Text style={styles.goBackButtonText}>Back</Text>
                </TouchableOpacity>
            </View>    
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search ingredients..."
                    style={styles.input}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleClear}>
                    <Text>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text>Search</Text>
                </TouchableOpacity>
            </View>      
            <ScrollView>
                <View>
                    {filteredIngredients.map((ingredient, index) => (
                        <View key={ingredient.idIngredient} style={styles.ingredientContainer}>
                            <Image
                                style={styles.ingredientImage}
                                source={{ uri: `https://themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }}
                            />
                            <Text style={styles.ingredientName}>{ingredient.strIngredient}</Text>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity onPress={() => handleDecrement(index)}>
                                    <Text style={styles.quantityButton}>-</Text>
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.quantityInput}
                                    keyboardType="numeric"
                                    value={ingredient.quantity ? ingredient.quantity.toString() : '0'}
                                    onChangeText={(text) => handleQuantityChange(index, parseInt(text) || 0)}
                                />
                                <TouchableOpacity onPress={() => handleIncrement(index)}>
                                    <Text style={styles.quantityButton}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'lightblue',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    goBackButton: {
        padding: 10,
    },
    goBackButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'blue',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
      },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    searchButton: {
        padding: 10,
      },
      searchResultsContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
      },
      searchResultsTitle: {
        fontSize: hp(3),
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 16,
      },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#333',
      },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 18,
        marginRight: 10,
    },
    clearButton: {
        backgroundColor: 'lightcoral',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    ingredientContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    ingredientImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    ingredientName: {
        flex: 1,
        fontSize: 18,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        fontSize: 24,
        paddingHorizontal: 10,
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 18,
        width: 50,
        textAlign: 'center',
    },
});

export default PantryPage;
