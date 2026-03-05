import { PokemonListType } from "@/src/context/PokeListContext";
import useTheme from "@/src/context/ThemeContext";
import { PokemonExploreDetails } from "@/src/types/pokemon";
import { LinearGradient } from "expo-linear-gradient";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
    pokemon: PokemonListType;
    details?: PokemonExploreDetails;
};

const screenWidth = Dimensions.get("window").width;
const NUM_COLUMNS = 2;
const SPACING = 8;

const CARD_WIDTH =
    (screenWidth - SPACING * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

export default function PokemonCard({ pokemon, details }: Props) {
    const { colors, isDarkMode } = useTheme();

    // Fallback type until details load
    const primaryType = details?.types?.[0];

    const fallbackGradient: [string, string] = isDarkMode
        ? ["#27272A", "#09090B"]
        : colors.gradients.normal;

    const gradient =
        colors.gradients[primaryType as keyof typeof colors.gradients] || fallbackGradient;


    const glowColor =
        colors.types[primaryType as keyof typeof colors.types] ||
        colors.types.normal;


    const CARD_HEIGHT = pokemon.id % 3 === 0 ? 200 : pokemon.id % 2 === 0 ? 190 : 220;



    return (
        <TouchableOpacity
            style={{
                width: CARD_WIDTH,
                marginLeft: SPACING,
                marginBottom: SPACING,
            }}
            activeOpacity={0.85}
        >
            <LinearGradient
                colors={gradient}
                style={{
                    height: CARD_HEIGHT,
                    borderRadius: 18,
                    padding: 12,
                    overflow: "hidden",
                    shadowColor: glowColor,
                    shadowOpacity: 0.25,
                    shadowRadius: 14,
                    elevation: 6,
                    gap: 4
                }}
            >
                {/* Accent */}
                <View
                    style={{
                        position: "absolute",
                        width: 120,
                        height: 120,
                        borderRadius: 100,
                        backgroundColor: "rgba(255,255,255,0.15)",
                        top: -30,
                        right: -30,
                    }}
                />

                {/* ID */}
                <Text
                    style={{
                        position: "absolute",
                        top: 8,
                        right: 10,
                        fontSize: 12,
                        fontWeight: "700",
                        color: "rgba(0,0,0,0.25)",
                    }}
                >
                    #{pokemon.id}
                </Text>

                {/* Image (instant) */}
                <Image
                    source={{ uri: pokemon.image }}
                    style={{ width: 100, height: 100, alignSelf: "center" }}
                    resizeMode="contain"
                />

                {/* Name (instant) */}
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: "700",
                        textTransform: "capitalize",
                        textAlign: "center",
                        color: details ? "black" : colors.textPrimary
                    }}
                >
                    {pokemon.name}
                </Text>

                {/* DETAILS SECTION */}


                {/* Types */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 6,
                    }}
                >
                    {details ? (
                        details.types.map((type: string) => (
                            <View
                                key={type}
                                style={{
                                    paddingHorizontal: 8,
                                    paddingVertical: 2,
                                    borderRadius: 10,
                                    backgroundColor: "rgba(255,255,255,0.6)",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 10,
                                        fontWeight: "600",
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {type}
                                </Text>
                            </View>
                        ))
                    ) :
                        <>
                            {[1, 2, 3].map((_, i) => (
                                <Skeleton key={i} width={28}
                                    height={10}
                                    radius={10}
                                    colorMode={isDarkMode ? "dark" : "light"} />
                            ))}
                        </>
                    }


                </View>

                {/* Stats */}
                {details ? <Text
                    style={{
                        fontSize: 11,
                        fontWeight: "600",
                        textAlign: "center",
                        color: "#333",
                    }}
                >
                    Power {details.totalStats} • EXP {details.baseExperience}
                </Text> : <Skeleton
                    width={132}
                    height={13}
                    radius={10}
                    colorMode={isDarkMode ? "dark" : "light"}
                />}

                {details ? <Text
                    style={{
                        fontSize: 10,
                        textAlign: "center",
                        color: "#444",
                        textTransform: "capitalize",
                    }}
                    numberOfLines={1}
                >
                    Ability: {(details.abilities ?? []).join(", ")}
                </Text> : <Skeleton
                    width={140}
                    height={10}
                    radius={10}
                    colorMode={isDarkMode ? "dark" : "light"}
                />}


                {/* Abilities */}







            </LinearGradient>
        </TouchableOpacity>
    );
}