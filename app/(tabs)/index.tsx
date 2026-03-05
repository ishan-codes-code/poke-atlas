import ExploreByPokeTypes from "@/src/components/ExploreByPokeTypes";
import PokemonOfTheDay, { PokeDaySkeleton } from "@/src/components/pokemonOfTheDay";
import useTheme from "@/src/context/ThemeContext";
import { Pokemon } from "@/src/types/pokemon";
import { fetchPokemon, getPokemonOfTheDayId } from "@/src/utils/pokeOfTheDayUtils";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export default function Home() {
  const [pokemon, setPokemon] = useState<null | Pokemon>(null);
  const { colors } = useTheme()

  useEffect(() => {
    const setPokeDetails = async () => {
      const id = getPokemonOfTheDayId();
      const details = await fetchPokemon(id)
      setPokemon(details);
    }
    setPokeDetails();
  }, [])


  return (<ScrollView
    style={{ flex: 1, backgroundColor: colors.background }}
    contentContainerStyle={{
      padding: 16,
      paddingBottom: 40, // important
    }}
  >

    {pokemon ? <PokemonOfTheDay {...pokemon} /> : <PokeDaySkeleton />}

    <View
      style={{
        height: 1,
        backgroundColor: colors.textDisabled,
        marginVertical: 16,
      }}
    />

    <ExploreByPokeTypes />

  </ScrollView>

  );
}