import { PokemonListType } from "../context/PokeListContext";
import { PokemonExploreDetails } from "../types/pokemon";

export const getIdFromUrl = (url: string) => {
  const parts = url.split("/");
  return Number(parts[parts.length - 2]);
};

export const getImageUrl = (id: number) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const fetchPokemonDetailsPage = async (
  ids: number[],
): Promise<PokemonExploreDetails[]> => {
  // console.log(ids.length);

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


export function getCommonPoke(results: PokemonListType[][]): PokemonListType[] {
  if (!results?.length) return [];
  if (results.length === 1) return results[0];

  return results.reduce((acc, curr) =>
    acc.filter(a => curr.some(c => c.id === a.id))
  );
}