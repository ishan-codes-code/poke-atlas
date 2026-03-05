import usePokemonList, { PokemonListType } from '@/src/context/PokeListContext'
import useTheme, { ColorScheme } from '@/src/context/ThemeContext'
import { useLocalSearchParams } from 'expo-router'
import React, { useMemo } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'

export default function Search() {
    const { colors } = useTheme()
    const params = useLocalSearchParams();
    const pokemonList = usePokemonList();

    const query = params.q?.toString().toLowerCase() || "";

    console.log("searching for", query);

    const filteredList = useMemo(() => {
        let list: PokemonListType[] = [];

        // Filter
        const q = query.toLowerCase();

        if (q) {
            list = pokemonList.filter(pokemon =>
                pokemon.name.toLowerCase().includes(q)
            );
        }

        // Optional: sort alphabetically
        list = [...list].sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        return list;
    }, [query, pokemonList]);

    const EmptyComponent = query ? NothingFound : Nothing;

    return (
        <FlatList
            data={filteredList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <PokemonListCard {...item} />}
            ListEmptyComponent={() => <EmptyComponent />}
            contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.background }}
        />
    )
}

const PokemonListCard = (pokemon: PokemonListType) => {
    const id = String(pokemon.id).padStart(3, "0");

    const { colors } = useTheme();

    const styles = useMemo(() => listStyles(colors), [colors])

    return (
        <View style={styles.card}>
            {/* Accent strip */}
            <View style={styles.accent} />

            <Image source={{ uri: pokemon.image }} style={styles.image} />

            <View style={{ flex: 1 }}>
                <Text style={styles.name}>
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </Text>
                <Text style={styles.id}>#{id}</Text>
            </View>
        </View>
    );
};

const Nothing = () => {
    return (
        <View style={emptyStyles.container}>
            <Text style={emptyStyles.icon}>🔍</Text>
            <Text style={emptyStyles.title}>Start Searching</Text>
            <Text style={emptyStyles.subtitle}>
                Search Pokémon by name
            </Text>
        </View>
    );
};
const NothingFound = () => {
    return (
        <View style={emptyStyles.container}>
            <Text style={emptyStyles.icon}>😕</Text>
            <Text style={emptyStyles.title}>Nothing Found</Text>
            <Text style={emptyStyles.subtitle}>
                Try a different name
            </Text>
        </View>
    );
};


const listStyles = (colors: ColorScheme) => StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        marginHorizontal: 12,
        marginVertical: 6,
        borderRadius: 14,
        backgroundColor: colors.card,

        // shadow
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },

    accent: {
        width: 4,
        height: "100%",
        borderRadius: 4,
        backgroundColor: colors.accent,
        marginRight: 10,
    },

    image: {
        width: 80,
        height: 80,
        marginRight: 12,
    },

    name: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.textPrimary,
    },

    id: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
    },
})

const emptyStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    icon: {
        fontSize: 40,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#444",
    },
    subtitle: {
        fontSize: 14,
        color: "#888",
        marginTop: 4,
    },
});
