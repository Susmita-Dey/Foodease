import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ScrollView } from 'react-native'
import { Image } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { TextInput } from 'react-native'
import Categories from '../components/categories'
import axios from 'axios'
import Recipes from '../components/recipes'

export default function HomeScreen() {
    const [activeCategory, setActiveCategory] = useState('Beef')

    const [categoryData, setCategoryData] = useState([])

    useEffect(() => {
        getCategoryData()
    }, [])

    const getCategoryData = async () => {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log('Category data response: ', response.data);
            if (response && response.data) {
                setCategoryData(response.data.categories)
            }
        }
        catch (e) {
            console.log('Error: ', e.message)
        }
    }

    return (
        <View className="flex-1 bg-white">
            <StatusBar style='dark' />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }} className="space-y-6 pt-14">
                {/* avatar and bell icon */}
                <View className="mx-4 flex-row justify-between items-center mb-2">
                    <Image source={require('../../assets/avatar.png')} style={{ width: hp(5), height: hp(5.5) }} />
                    <BellIcon size={hp(4)} color='gray' />
                </View>

                {/* title and punchline text */}
                <View className="mx-4 mb-2 space-y-2">
                    <Text className="text-neutral-600" style={{ fontSize: hp(2.5) }}>Hello, Susmita!</Text>
                    <View>
                        <Text className="font-semibold text-neutral-600" style={{ fontSize: hp(3.5) }}>Make your own food,</Text>
                        <Text className="font-semibold text-neutral-600" style={{ fontSize: hp(3.8) }}>stay at
                            <Text className="text-amber-400"> home.</Text>
                        </Text>
                    </View>
                </View>

                {/* search bar */}
                <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
                    <TextInput placeholder='Search any recipe' placeholderTextColor='gray' style={{ fontSize: hp(1.7) }} className='flex-1 text-base mb-1 pl-3 tracking-wider' />
                    <View className="bg-amber-400 rounded-full p-3">
                        <MagnifyingGlassIcon size={hp(2.7)} strokeWidth={3} color='white' />
                    </View>
                </View>

                {/* categories */}
                <View>
                    {categoryData.length > 0 && <Categories categories={categoryData} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />}
                </View>

                {/* recipes */}
                <View>
                    <Recipes />
                </View>
            </ScrollView>
        </View>
    )
}