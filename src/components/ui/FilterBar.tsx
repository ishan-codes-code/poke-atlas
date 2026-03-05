import useTheme from '@/src/context/ThemeContext'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import AnimatedPressable from './AnimatedPressable'

export default function FilterBar() {
    const { type } = useLocalSearchParams()
    const router = useRouter()

    const { colors } = useTheme()

    if (!type) return null

    return (
        <ScrollView horizontal style={{ flexGrow: 0, marginTop: 10 }}>
            {type && <View style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 24,
                gap: 10,
                padding: 10,
                backgroundColor: colors.card,
                marginHorizontal: 5
            }}>
                <Text style={{ fontSize: 16, color: colors.textPrimary }}>Type: <Text style={{ fontSize: 16, textTransform: "capitalize", fontWeight: "700", color: colors.types[type as keyof typeof colors.types] }} >{type}</Text></Text>
                <AnimatedPressable onPress={() => router.setParams({ type: undefined })}>
                    <Ionicons name="close" size={20} color={colors.textPrimary} />

                </AnimatedPressable>
            </View>}

        </ScrollView>
    )
}