import FilterSheet from '@/src/components/FilterSheet'
import PokeMasonry from '@/src/components/Masonry'
import FilterBar from '@/src/components/ui/FilterBar'
import useTheme from '@/src/context/ThemeContext'
import React from 'react'
import { View } from 'react-native'

const Explore = () => {
    const { colors } = useTheme()



    return (
        <View style={{ height: "100%", backgroundColor: colors.background, }}>
            <FilterBar />
            <PokeMasonry />
            <FilterSheet />

        </View>

    )
}

export default Explore
