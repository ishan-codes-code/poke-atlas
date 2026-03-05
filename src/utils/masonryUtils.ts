import { PokemonExploreDetails } from "../components/Masonry";
import { PokemonListType } from "../context/PokeListContext";

export const getIdFromUrl = (url: string) => {
  const parts = url.split("/");
  return Number(parts[parts.length - 2]);
};

export const getImageUrl = (id: Number) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const fetchPokemonDetailsPage = async (
  ids: Number[],
): Promise<PokemonExploreDetails[]> => {
  const detailed = await Promise.all(
    ids.map(async (id) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const details = await res.json();

      return {
        id: details.id,
        types: details.types.map((t: any) => t.type.name),
        totalStats: details.stats.reduce(
          (sum: number, s: any) => sum + s.base_stat,
          0,
        ),
        baseExperience: details.base_experience,
        abilities: details.abilities.map((a: any) => a.ability.name),
      };
    }),
  );

  return detailed;
};

export const getPokemonByType = async (
  type: string,
): Promise<PokemonListType[]> => {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await res.json();

  return data.pokemon.map((p: any) => ({
    id: getIdFromUrl(p.pokemon.url),
    name: p.pokemon.name,
    image: getImageUrl(getIdFromUrl(p.pokemon.url)),
  }));
};
