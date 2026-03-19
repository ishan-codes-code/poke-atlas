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

    const types = Array.isArray(type) ? type : [type]

    return (
        <ScrollView horizontal style={{ flexGrow: 0, marginTop: 10 }}>
            {types.map((t) => (
                <View key={t} style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 24,
                    gap: 10,
                    padding: 10,
                    backgroundColor: colors.card,
                    marginHorizontal: 5
                }}>
                    <Text style={{ fontSize: 16, color: colors.textPrimary }}>Type: <Text style={{ fontSize: 16, textTransform: "capitalize", fontWeight: "700", color: colors.types[t as keyof typeof colors.types] }} >{t}</Text></Text>
                    <AnimatedPressable onPress={() => {
                        const newTypes = types.filter(existing => existing !== t)
                        router.setParams({ type: newTypes.length > 0 ? newTypes : "" })
                    }}>
                        <Ionicons name="close" size={20} color={colors.textPrimary} />
                    </AnimatedPressable>
                </View>
            ))}
        </ScrollView>
    )
}