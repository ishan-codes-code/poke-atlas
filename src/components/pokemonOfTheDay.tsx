import { Skeleton } from "moti/skeleton";
import { useEffect, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import useTheme, { ColorScheme } from "../context/ThemeContext";
import { Pokemon } from "../types/pokemon";
import GradientText from "./ui/GradientText";



export default function PokemonOfTheDay(pokemon: Pokemon) {
    const { colors } = useTheme();

    const styles = useMemo(() => createStyles(colors, pokemon), [colors, pokemon]);


    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);
    const cardTranslate = useSharedValue(30);

    useEffect(() => {
        // Floating animation
        translateY.value = withRepeat(
            withSequence(
                withTiming(-10, { duration: 1500 }),
                withTiming(0, { duration: 1500 })
            ),
            -1,
            true
        );

        // Card entrance
        opacity.value = withDelay(200, withTiming(1, { duration: 600 }));
        cardTranslate.value = withDelay(200, withTiming(0, { duration: 600 }));
    }, []);




    // only move
    const imageStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    // move + scale
    const glowStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateY.value },
            { scale: 1.1 },
        ],
    }));

    const cardStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: cardTranslate.value }],
    }));


    return (
        <Animated.View style={[styles.card, cardStyle]}>
            {/* <Text style={styles.title}>Pokémon of the Day</Text> */}
            <View style={{ alignItems: "center", justifyContent: "center" }}>

                {/* Glow layer */}
                <Animated.Image
                    source={{ uri: pokemon.image }}
                    style={[
                        styles.image,
                        glowStyle,
                        styles.glowLayer
                    ]}
                    blurRadius={12}
                />

                {/* Original */}
                <Animated.Image
                    source={{ uri: pokemon.image }}
                    style={[styles.image, imageStyle]}
                />

            </View>

            <View style={styles.content}>
                <GradientText
                    text={pokemon.name.toUpperCase()}
                    style={styles.name}
                    gradient={colors.gradients[pokemon.types[0] as keyof typeof colors.gradients]}
                />

                <Text style={styles.hashtag}>#PokemonOfTheDay</Text>
                <View style={styles.badgeCon}>
                    {pokemon.types.map((type, i) => (
                        <Text key={type} style={[styles.badge, {
                            color: colors.types[pokemon.types[i] as keyof typeof colors.types],
                            borderColor: colors.types[pokemon.types[i] as keyof typeof colors.types]
                        }]}>
                            {type}
                        </Text>
                    ))}
                </View>
                <Text style={styles.desc}>{pokemon.description}</Text>



            </View>
        </Animated.View>
    );
}



const createStyles = (colors: ColorScheme, pokemon: Pokemon) => StyleSheet.create({
    card: {
        // margin: 16,
        // borderRadius: 24,
        paddingTop: 20,
        overflow: "hidden",
        backgroundColor: "transparent",
        width: "100%",
        alignItems: "center",

    },
    title: {
        color: colors.textPrimary,
        fontSize: 20,
        fontWeight: "600",
    },
    content: {
        padding: 20,
        alignItems: "center",
        // backgroundColor: colors.card,
        width: "100%",
        // height: "100%",
        borderRadius: 24,
        gap: 15,

    },
    name: {
        // color: colors.textPrimary,
        fontSize: 30,
        fontWeight: "bold",
    },
    hashtag: {
        color: colors.textSecondary
    },
    badgeCon: {
        flexDirection: "row",
        gap: 10,
    },
    badge: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 13,
    },
    desc: {
        color: colors.textPrimary,
        fontSize: 14,
        textAlign: "center",
        opacity: 0.9,

    },
    about: {
        backgroundColor: colors.card,
        borderRadius: 24,
        padding: 12,
        flexDirection: "row",
        gap: 25,
    },
    image: {
        width: 220,
        height: 220,
        resizeMode: "contain", // important for transparent PNG


    },
    glowLayer: {
        position: "absolute",
        // tintColor: colors.types[pokemon.types[0] as keyof typeof colors.types],
        // opacity: 0.6,
    },
})


export const PokeDaySkeleton = () => {
    const { isDarkMode } = useTheme();
    return (
        <View style={{ gap: 20, alignItems: "center" }}>
            <Skeleton
                width={220}
                height={280}
                radius={10}
                colorMode={isDarkMode ? "dark" : "light"}
            />
            <Skeleton
                width={220}
                height={40}
                radius={10}
                colorMode={isDarkMode ? "dark" : "light"}
            />
            <Skeleton
                width={140}
                height={10}
                radius={10}
                colorMode={isDarkMode ? "dark" : "light"}
            />
            <View style={{ flexDirection: "row", gap: 10 }}>
                <Skeleton
                    width={70}
                    height={10}
                    radius={10}
                    colorMode={isDarkMode ? "dark" : "light"}
                /><Skeleton
                    width={70}
                    height={10}
                    radius={10}
                    colorMode={isDarkMode ? "dark" : "light"}
                />

            </View>
            <Skeleton
                width={280}
                height={100}
                radius={10}
                colorMode={isDarkMode ? "dark" : "light"}
            />
        </View>
    )
}