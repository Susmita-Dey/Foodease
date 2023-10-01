import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { categoryData } from '../constants'
import { Image } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { TouchableOpacity } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

export default function Categories({ categories, activeCategory, setActiveCategory }) {
    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4" contentContainerStyle={{ paddingHorizontal: 15 }}>
                {
                    categories.map((category, index) => {
                        let isActive = activeCategory === category.strCategory;
                        let activeBgColor = isActive ? 'bg-amber-400' : 'bg-black/10';
                        return (
                            <TouchableOpacity key={index} className="flex items-center space-y-1" onPress={() => setActiveCategory(category.strCategory)}>
                                <View className={`rounded-full p-[6px] ${activeBgColor}`}>
                                    <Image source={{ uri: category.strCategoryThumb }} style={{ width: hp(6), height: hp(6) }} className='rounded-full' />
                                </View>
                                <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>{category.strCategory}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </Animated.View>
    )
}