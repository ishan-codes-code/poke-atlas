import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
import { DimensionValue, Image, StyleSheet, Text, View } from 'react-native';

import { router } from 'expo-router';
import { pokeTypes, popularTypePokemon } from '../constants/pokeConstants';
import useTheme, { ColorScheme } from '../context/ThemeContext';
import AnimatedPressable from './ui/AnimatedPressable';


type ImagePosition = {
    width: number;
    height: number;
    left: DimensionValue;
    top?: DimensionValue;
    position?: "absolute";
};

const imageStylesByIndex: ImagePosition[] = [
    { width: 120, height: 120, left: "50%" },
    { width: 120, height: 120, left: "50%", top: "-30%" },
    { width: 120, height: 120, left: "50%", top: "-20%" },
    { width: 120, height: 120, left: "50%", top: "-20%" },
    { width: 150, height: 150, left: "30%", top: "-20%" },
    { width: 150, height: 150, left: "30%", top: "-30%" },
    { width: 150, height: 150, left: "40%", top: "-30%" },
    { width: 130, height: 130, left: "30%", top: "-30%" },
    { width: 200, height: 200, left: "20%", top: "-50%" },
    { width: 180, height: 180, left: "20%", top: "-50%" },
    { width: 150, height: 150, left: "40%", top: "-50%" },
    { width: 150, height: 150, left: "30%", top: "-20%" },
    { width: 150, height: 150, left: "40%", top: "-50%" },
    { width: 180, height: 180, left: "20%", top: "-50%" },
    { width: 120, height: 120, left: "40%", top: "-50%" },
    { width: 130, height: 130, left: "20%", top: "-50%" },
    { width: 130, height: 130, left: "40%", top: "-40%" },
];




export default function ExploreByPokeTypes() {
    const { colors } = useTheme();

    const styles = useMemo(() => createStyles(colors), [colors])




    return (
        <View style={styles.container}>
            <Text style={styles.heading} >Explore by Pokemon Types</Text>
            <View style={styles.contentCon}>





                {pokeTypes.map((type, index) => {
                    const imgStyle = imageStylesByIndex[index];

                    return (
                        <AnimatedPressable key={type}
                            onPress={() => router.push({
                                pathname: "/(tabs)/explore",
                                params: { type },
                            })}
                            pressableStyles={{ width: "48%" }}
                        >


                            <LinearGradient
                                key={type}
                                colors={colors.gradients[type as keyof typeof colors.gradients]}
                                style={styles.card}
                            >
                                <Text
                                    style={[
                                        styles.text,
                                        index === 7 && { color: colors.textPrimary },
                                    ]}
                                >
                                    {type.toUpperCase()}
                                </Text>

                                <Image
                                    source={{ uri: popularTypePokemon[type].image }}
                                    style={[
                                        {
                                            position: "absolute",
                                        },
                                        imgStyle,
                                    ]}
                                    resizeMode="contain"
                                />
                            </LinearGradient>
                        </AnimatedPressable>
                    );
                })}



            </View>

        </View >
    )
}

const createStyles = (colors: ColorScheme) => StyleSheet.create(({
    container: {
        paddingTop: 20,
        gap: 30
    },

    heading: {
        fontSize: 35,
        color: colors.textPrimary,
        fontWeight: "bold"

    },
    contentCon: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    text: {
        color: colors.background,
        fontSize: 16,
        fontWeight: "600"
    },
    card: {
        width: "100%",
        borderRadius: 18,
        overflow: "hidden",
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 70
    },
    shine: {
        position: "absolute",
        top: -40,
        left: -40,
        width: 120,
        height: 220,
        transform: [{ rotate: "25deg" }], // IMPORTANT
    },

}))




